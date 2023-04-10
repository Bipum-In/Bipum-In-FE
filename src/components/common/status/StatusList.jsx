import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import StatusItem from './StatusItem';
import { useLocation } from 'react-router-dom';

export default function StatusList({
  headerList,
  listHeaderRef,
  listRef,
  content,
  contentKeyArr,
  onDetail,
  isAdmin,
}) {
  const { pathname } = useLocation();
  return (
    <RequestShowBody pathname={pathname}>
      <table ref={listHeaderRef}>
        <RequestShowListTitle>
          <tr>
            {headerList.map(list => (
              <ThItem key={uuidv4()} width={list.width}>
                {list.name}
              </ThItem>
            ))}
          </tr>
        </RequestShowListTitle>
      </table>
      <table ref={listRef}>
        {content?.content?.length ? (
          content.content.map(list => (
            <RequestShowList
              key={uuidv4()}
              onClick={() => onDetail(list.requestId || list.supplyId)}
            >
              <StatusItem
                isAdmin={isAdmin}
                list={list}
                headerList={headerList}
                contentKeyArr={contentKeyArr}
              />
            </RequestShowList>
          ))
        ) : (
          <tbody>
            <tr>
              <td />
            </tr>
          </tbody>
        )}
      </table>
    </RequestShowBody>
  );
}

const RequestShowBody = styled.div`
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
    line-height: 3.3125rem;
    gap: 1.875rem;
    justify-content: center;

    ${props =>
      props.pathname === '/equipment-management' &&
      css`
        td:nth-child(2),
        th:nth-child(2) {
          @media (max-width: 100rem) {
            min-width: 8rem;
            width: 8rem;
          }
        }

        td:nth-child(5),
        th:nth-child(5) {
          @media (max-width: 91.875rem) {
            display: none;
          }
        }

        td:nth-child(4),
        th:nth-child(4) {
          @media (max-width: 68.125rem) {
            display: none;
          }
        }

        td:nth-child(7),
        th:nth-child(7) {
          @media (max-width: 60rem) {
            display: none;
          }
        }
      `}

    ${props =>
      props.pathname === '/request-status' &&
      css`
        td:nth-child(3),
        th:nth-child(3) {
          @media (max-width: 100rem) {
            min-width: 10rem;
            width: 10rem;
          }
        }

        td:nth-child(6),
        th:nth-child(6) {
          @media (max-width: 90.625rem) {
            display: none;
          }
        }

        td:nth-child(2),
        th:nth-child(2) {
          @media (max-width: 63.125rem) {
            display: none;
          }
        }

        td:nth-child(5),
        th:nth-child(5) {
          @media (max-width: 56.875rem) {
            display: none;
          }
        }
      `}

      ${props =>
      props.pathname === '/request-list' &&
      css`
        td:nth-child(3),
        th:nth-child(3) {
          @media (max-width: 91.25rem) {
            min-width: 14rem;
            width: 14rem;
          }
        }

        td:nth-child(4),
        th:nth-child(4) {
          @media (max-width: 83.75rem) {
            display: none;
          }
        }

        td:nth-child(5),
        th:nth-child(5) {
          @media (max-width: 57.5rem) {
            display: none;
          }
        }
      `}
  }

  td {
    text-align: left;
    text-overflow: ellipsis;
    font-size: 0.875rem;
    overflow: hidden;
    white-space: nowrap;
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

const ThItem = styled.th`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;
