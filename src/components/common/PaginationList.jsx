import Pagination from 'react-js-pagination';
import styled from 'styled-components';

export default function PaginationList({
  page,
  pageSize,
  requestData,
  onPage,
}) {
  const { totalElements } = requestData.data;
  return (
    <PageContainer>
      <Pagination
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalElements}
        pageRangeDisplayed={5}
        onChange={onPage}
      />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  color: ${props => props.theme.color.blue.brandColor6};
  width: 24.3125rem;
  height: 3.125rem;
  transform: translate(-50%, -1.8125rem);

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 0.9375rem;
    gap: 1.75rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    ${props => props.theme.FlexRow}
    ${props => props.theme.FlexCenter}
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 0.25rem;
  }
  ul.pagination li a {
    text-decoration: none;
    color: black;
    font-size: 1.125rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: ${props => props.theme.color.blue.brandColor6};
  }
`;
