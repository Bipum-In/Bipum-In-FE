import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Button from 'elements/Button';

import { ReactComponent as DefaultImageIcon } from 'styles/commonIcon/addImgIcon2.svg';
import { ReactComponent as DeleteImg } from 'styles/commonIcon/deleteImg.svg';

export default function MultipleImage({
  excel,
  index,
  column,
  onAddImage,
  onDeleteImage,
  onImageDetail,
}) {
  return (
    <>
      {column['이미지'] ? (
        <ImageContainer>
          <Button
            onClick={() => {
              onDeleteImage(excel.sheetItem, index, column['이미지']);
            }}
          >
            <DeleteImg />
          </Button>
          <div
            onClick={() => {
              onImageDetail(column['이미지']);
            }}
          >
            <img src={column['이미지']} alt="multipleImg" />
          </div>
        </ImageContainer>
      ) : (
        <>
          <ImageinputFile>
            <DefaultImage />
            <input
              key={uuidv4()}
              type="file"
              accept=".png,.jpg,.jpeg,.gif"
              onChange={e => {
                onAddImage(e, excel.sheetItem, index);
              }}
            />
          </ImageinputFile>
        </>
      )}
    </>
  );
}

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:hover > button {
    opacity: 1;
  }

  img {
    border-radius: 0.5rem;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    transform: translate(0.5rem, -0.5rem);

    svg {
      width: 1.125rem;
      height: 1.125rem;

      :hover {
        transform: scale(1.2);
      }
    }
  }
`;

const DefaultImage = styled(DefaultImageIcon)`
  width: 4.5rem;
  height: 4.5rem;

  :hover {
    transform: scale(1.05);

    path {
      fill: ${props => props.theme.color.blue.brandColor5};
    }
  }
`;

const ImageinputFile = styled.label`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  width: 4.75rem;
  height: 4.75rem;
  cursor: pointer;

  input {
    display: none;
  }
`;
