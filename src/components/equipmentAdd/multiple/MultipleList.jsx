import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import ARRAY from 'constants/array';
import Button from 'elements/Button';
import { ReactComponent as DefaultImageIcon } from 'styles/commonIcon/addImgIcon2.svg';
import { ReactComponent as MinusRound } from 'styles/commonIcon/minusRound.svg';
import { ReactComponent as DeleteImg } from 'styles/commonIcon/deleteImg.svg';

export default function MultipleList({
  excel,
  onDeleteRow,
  onAddImage,
  onDeleteImage,
}) {
  return (
    <MultipleBodyWrapper>
      <table>
        <RequestShowListTitle>
          <tr>
            <th>순번</th>
            {ARRAY.MULTIPLE_HEADER.map(header => (
              <th key={uuidv4()}>{header}</th>
            ))}
            <th>이미지</th>
          </tr>
        </RequestShowListTitle>
      </table>
      <MultipleBodyContainer>
        <table>
          {excel.data &&
            excel.data[excel.sheetItem]?.map((column, index) => (
              <RequestShowList
                key={uuidv4()}
                // onClick={() => onDetail(list.requestId || list.supplyId)}
              >
                <tr>
                  <td>{index + 1}</td>
                  {ARRAY.MULTIPLE_HEADER.map(header => (
                    <td key={uuidv4()}>{column[header] || '-'}</td>
                  ))}
                  <td>
                    {column['이미지'] ? (
                      <ImageContainer>
                        <Button
                          onClick={() => {
                            onDeleteImage(
                              excel.sheetItem,
                              index,
                              column['이미지']
                            );
                          }}
                        >
                          <DeleteImg />
                        </Button>
                        <img src={column['이미지']} alt="multipleImg" />
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
                  </td>
                  <td>
                    <DeleteCoulmnBtn
                      onClick={() => {
                        onDeleteRow(index);
                      }}
                    >
                      <MinusRound />
                    </DeleteCoulmnBtn>
                  </td>
                </tr>
              </RequestShowList>
            ))}
        </table>
      </MultipleBodyContainer>
    </MultipleBodyWrapper>
  );
}

const MultipleBodyWrapper = styled.div`
  width: 100%;

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
      heigth: 6.625rem;
      text-align: left;
      text-overflow: ellipsis;
      font-size: 0.875rem;
      overflow: hidden;
      white-space: nowrap;
    }

    td,
    th {
      :nth-child(1) {
        width: 1.875rem;
        margin-right: 2.625rem;
        font-weight: 600;
      }

      :nth-child(2) {
        width: 4.9375rem;
        margin-right: 2.75rem;
        font-weight: 600;
      }

      :nth-child(3) {
        width: 10rem;
        margin-right: 3.6875rem;
        font-weight: 600;
      }

      :nth-child(4) {
        width: 8.75rem;
        margin-right: 1.75rem;
      }

      :nth-child(5) {
        width: 5.75rem;
        margin-right: 3.9375rem;
      }

      :nth-child(6) {
        width: 7.5rem;
        margin-right: 1.3125rem;
      }

      :nth-child(7) {
        width: 3.1875rem;
        margin-right: 4.9375rem;
      }

      :nth-child(8) {
        width: 7rem;
        margin-right: 3.5rem;
      }

      :nth-child(9) {
        width: 4.75rem;
      }
    }
  }
`;

const MultipleBodyContainer = styled.section`
  height: 57.55vh;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.color.grey.brandColor2};
  }
`;

const RequestShowListTitle = styled.thead`
  height: 3.125rem;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  border-top: 1px solid ${props => props.theme.color.grey.brandColor3};
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor3};
  font-weight: 600;
  font-size: 1rem;
  text-align: left;
  padding: 0 2rem;
  display: flex;
`;

const RequestShowList = styled.tbody`
  position: relative;
  border-bottom: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
  font-size: 1.0625rem;

  &:hover {
    background-color: ${props => props.theme.color.blue.brandColor2};
  }

  &:hover td > button {
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  position: relative;

  &:hover > button {
    opacity: 1;
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

const DeleteCoulmnBtn = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transform: translate(-50%, calc(50% + 0.75rem));

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const DefaultImage = styled(DefaultImageIcon)`
  width: 4.5rem;
  height: 4.5rem;

  :hover {
    transform: scale(1.05);
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
