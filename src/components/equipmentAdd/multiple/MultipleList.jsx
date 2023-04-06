import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import ARRAY from 'constants/array';

export default function MultipleList({ excel }) {
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
            excel.data[excel.sheetItem].map((column, index) => (
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
                    <img
                      src="https://i.namu.wiki/i/khk4X_G8rY31qrzfqTJykqahaagl_d9XpnkvTPKuyyBFlFiAKPT9wS-luaI0TsivwPm1eu3wJ0vGjyEj9V_Iwc2qYIl3ZdY7VmAOqLjFjWPKY2xled4Gh_Rwyq4ip5qEoSisRX7Tpaxazz7Mbh8KQw.webp"
                      alt="multipleImg"
                    />
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
  border-bottom: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
  font-size: 1.0625rem;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.color.blue.brandColor2};
  }
`;
