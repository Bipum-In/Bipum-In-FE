import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

export default function DragAndDrop({
  inputRef,
  data,
  type,
  onChangeData,
  children,
}) {
  const [isCurrent, setIsCurrent] = useState('');
  const [invalidFile, setInvalidFile] = useState(false);

  const handlerInputFile = () => inputRef.current.click();
  const handleDragOver = useCallback(e => e.preventDefault(), []);
  const handleDragLeave = useCallback(() => setIsCurrent(''), []);
  const handleDragEnterOrDrop = useCallback(
    e => {
      e.preventDefault();
      const files = Array.from(
        e.type === 'drop' ? e.dataTransfer.files : e.dataTransfer.items
      );

      const filteredFiles = Array.from(files).filter(file =>
        type.includes(file.type)
      );

      if (e.type === 'drop') {
        if (filteredFiles.length) {
          const event = { target: { files: filteredFiles } };
          onChangeData(event);
          setInvalidFile(false);
        } else {
          setInvalidFile(true);
        }
        setIsCurrent('');
      } else {
        setIsCurrent(filteredFiles.length === files.length);
      }
    },
    [onChangeData]
  );

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      isCurrent,
      invalidFile,
      data,
      onChangeInputFile: handlerInputFile,
    })
  );

  return (
    <DragAndDropContainer
      data={`${data.length > 0}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnterOrDrop}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnterOrDrop}
      isCurrent={isCurrent}
    >
      {childrenWithProps}
    </DragAndDropContainer>
  );
}

const DragAndDropContainer = styled.label`
  position: relative;
  display: flex;
  ${props => props.theme.FlexCenter};
  width: 100%;
  height: 23.75rem;
  border-radius: 0.5rem;
  margin: 1.375rem 0;
  background-color: ${props =>
    props.data === 'true' ? 'transperant' : props.theme.color.grey.brandColor1};
`;
