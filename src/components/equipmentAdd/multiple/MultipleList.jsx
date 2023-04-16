import { v4 as uuidv4 } from 'uuid';
import Button from 'elements/Button';

import MultipleTableList from './MultipleTableList';
import MultipleCardList from './MultipleCardList';

import { ImgDetailModal } from 'elements/ImgModal';
import styled, { css } from 'styled-components';
import DragAndDrop from 'components/common/DragAndDrop';
import DragAndDropFile from 'components/common/DragAndDropFile';

export default function MultipleList({
  excel,
  inputRef,
  sheetList,
  showImageModal,
  onReadExcel,
  onChangeSheet,
  onDeleteRow,
  onAddImage,
  onDeleteImage,
  onImageDetail,
}) {
  const dropType = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  return (
    <MultipleBodyWrapper>
      <SheetList>
        {sheetList?.map((sheetItem, index) => (
          <ButtonStyle key={uuidv4()} btnStyle={sheetItem.status}>
            <Button
              multipleStyle={sheetItem.status}
              value={index}
              onClick={onChangeSheet}
            >{`${sheetItem.sheetName} 시트`}</Button>
          </ButtonStyle>
        ))}
      </SheetList>
      <MultipleTableList
        excel={excel}
        sheetList={sheetList}
        onChangeSheet={onChangeSheet}
        onDeleteRow={onDeleteRow}
        onAddImage={onAddImage}
        onDeleteImage={onDeleteImage}
        onImageDetail={onImageDetail}
      />
      <MultipleCardList
        excel={excel}
        sheetList={sheetList}
        onChangeSheet={onChangeSheet}
        onDeleteRow={onDeleteRow}
        onAddImage={onAddImage}
        onDeleteImage={onDeleteImage}
        onImageDetail={onImageDetail}
      />
      {sheetList.length === 0 && (
        <>
          <DragAndDrop
            inputRef={inputRef}
            data={sheetList || []}
            type={dropType}
            onChangeData={onReadExcel}
          >
            <DragAndDropFile />
          </DragAndDrop>
          <ImgDetailModal
            src={showImageModal.image}
            isOpen={showImageModal.show}
            onClose={onImageDetail}
          />
        </>
      )}
    </MultipleBodyWrapper>
  );
}

const MultipleBodyWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  & > label {
    position: absolute;
    width: 100%;
    height: calc(100vh - 16.6875rem - 6.2925rem - 2.93rem);
    background-color: white;
  }

  table {
    width: 100%;
    table-layout: auto;
  }

  tbody {
    height: 3.3125rem;
  }

  tr {
    display: flex;
    align-items: center;
    margin: 0px auto;
    padding: 0.8125rem 0;
    justify-content: center;

    img {
      width: 4.75rem;
      height: 4.75rem;
      border-radius: 0.375rem;
    }

    th {
      font-size: 1rem;
      font-weight: 600;
      margin-right: 0.625rem;
    }

    td {
      text-align: left;
      text-overflow: ellipsis;
      font-size: 0.8125rem;
      overflow: hidden;
      white-space: nowrap;
    }

    td,
    th {
      :nth-child(1) {
        width: 2rem;
        margin-right: 3rem;
        font-weight: 600;

        @media (max-width: 1790px) {
          display: none;
        }
      }

      :nth-child(2) {
        width: 5.5rem;
        margin-right: 1.4375rem;
        font-weight: 600;
      }

      :nth-child(3) {
        width: 9.5rem;
        margin-right: 3rem;
        font-weight: 600;
      }

      :nth-child(4) {
        width: 7.5rem;
        margin-right: 3rem;
      }

      :nth-child(5) {
        width: 5.75rem;
        margin-right: 3rem;
      }

      :nth-child(6) {
        width: 5rem;
        margin-right: 3rem;
      }

      :nth-child(7) {
        width: 3.8125rem;
        margin-right: 3rem;
      }

      :nth-child(8) {
        width: 8.25rem;
        margin-right: 3rem;
      }

      :nth-child(9) {
        width: 4.75rem;
        margin-right: 3rem;
      }

      :nth-child(10) {
        width: 1.5rem;
      }
    }
  }

  @media (max-width: 1920px) {
    section:nth-child(2) {
      display: none;
    }

    section:nth-child(3) {
      display: flex;
    }
  }

  @media (min-width: 1920px) {
    section:nth-child(2) {
      display: block;
    }

    section:nth-child(3) {
      display: none;
    }
  }
`;

const SheetList = styled.div`
  button {
    justify-content: flex-start;
    width: 12.75rem;
    height: 4.5rem;
    border: 0;
    border-radius: 0;
    margin: 0;
    padding-left: 2.4375rem;
    font-weight: 600;
    font-size: 0.875rem;

    :hover {
      opacity: 1;
    }
  }
`;

const ButtonStyle = styled.div`
  button {
    ${props =>
      !props.btnStyle &&
      css`
        color: ${props.theme.color.grey.brandColor7};
        :hover {
          background-color: ${props.theme.color.blue.brandColor2};
        }
      `}
  }
`;
