import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FormatDateToDot, FormatKoreanTime } from 'utils/formatDate';

export default function StatusItem({
  isAdmin,
  list,
  headerList,
  contentKeyArr,
}) {
  return (
    <tr>
      {headerList.map((headerItem, index, headerArray) => {
        if (
          headerItem.name === '신청일' &&
          contentKeyArr[index] === 'createdAt'
        ) {
          return (
            <TdItem key={uuidv4()} width={headerItem.width}>
              {isAdmin && FormatKoreanTime(list[contentKeyArr[index]])}
              {!isAdmin && FormatDateToDot(list[contentKeyArr[index]])}
            </TdItem>
          );
        }

        if (
          headerItem.name === '등록일자' &&
          contentKeyArr[index] === 'createdAt'
        ) {
          return (
            <TdItem key={uuidv4()} width={headerItem.width}>
              {FormatDateToDot(list[contentKeyArr[index]]) || '-'}
            </TdItem>
          );
        }

        if (contentKeyArr[index] === 'acceptResult') {
          return (
            <TdItemAcceptResult
              key={uuidv4()}
              width={headerItem.width}
              status={list[contentKeyArr[index]]}
            >
              {isAdmin && list[contentKeyArr[index]]}
              {!isAdmin && list[contentKeyArr[index]]}
            </TdItemAcceptResult>
          );
        }

        if (
          contentKeyArr[index] === 'status' &&
          headerArray[index + 1]?.name !== '결과'
        ) {
          return (
            <TdItemStatus key={uuidv4()} width={headerItem.width}>
              <Status>
                <StatusColor status={list[contentKeyArr[index]]} />
                {list[contentKeyArr[index]] || '-'}
              </Status>
            </TdItemStatus>
          );
        }

        return (
          <TdItem key={uuidv4()} width={headerItem.width}>
            {list[contentKeyArr[index]] || '-'}
          </TdItem>
        );
      })}
    </tr>
  );
}

const TdItem = styled.td`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const TdItemAcceptResult = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  min-width: ${props => props.width};
  border-radius: 0.25rem;
  height: 1.8125rem;

  ${props =>
    props.status === '승인' &&
    css`
      color: ${props => props.theme.color.accpet};
      border: 1px solid ${props => props.theme.color.accpet};
    `}

  ${props =>
    props.status === '거절' &&
    css`
      color: ${props => props.theme.color.reject};
      border: 1px solid ${props => props.theme.color.reject};
    `}

    ${props =>
    props.status === '폐기' &&
    css`
      color: ${props => props.theme.color.remove};
      border: 1px solid ${props => props.theme.color.remove};
    `}
`;

const TdItemStatus = styled.td`
  display: flex;
  align-items: center;
  width: ${props => props.width};
  min-width: ${props => props.width};
  height: 100%;
`;

const Status = styled.div`
  ${props => props.theme.FlexRow}
  align-items: center;
  gap: 0.5rem;
`;

const StatusColor = styled.div`
  width: 0.9375rem;
  height: 0.9375rem;
  ${props =>
    props.status === '재고' &&
    css`
      background-color: #d23737;
    `};

  ${props =>
    props.status === '사용중' &&
    css`
      background-color: #37d259;
    `};

  ${props =>
    props.status === '수리중' &&
    css`
      background-color: #ff8502;
    `};
  border-radius: 50%;
`;
