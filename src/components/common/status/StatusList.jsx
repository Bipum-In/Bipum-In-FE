import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function StatusList({
  headerList,
  listHeaderRef,
  listRef,
  content,
  contentKeyArr,
  onDetail,
}) {
  return (
    <RequestShowBody>
      <table ref={listHeaderRef}>
        <RequestShowListTitle>
          <tr>
            <ZeroTh width={headerList[0].width}>{headerList[0].name}</ZeroTh>
            <OneTh width={headerList[1].width}>{headerList[1].name}</OneTh>
            <TwoTh width={headerList[2].width}>{headerList[2].name}</TwoTh>
            <ThreeTh width={headerList[3].width}>{headerList[3].name}</ThreeTh>
            <FourTh width={headerList[4].width}>{headerList[4].name}</FourTh>
            <FiveTh width={headerList[5].width}>{headerList[5].name}</FiveTh>
            <SixTh width={headerList[6].width}>{headerList[6].name}</SixTh>
            <SevenTh width={headerList[7].width}>{headerList[7].name}</SevenTh>
          </tr>
        </RequestShowListTitle>
      </table>
      <table ref={listRef}>
        {content ? (
          content.content.map(list => (
            <RequestShowList
              key={uuidv4()}
              onClick={() => onDetail(list.requestId || list.supplyId)}
            >
              <tr>
                <Zero width={headerList[0].width}>
                  {list[contentKeyArr[0]]}
                </Zero>
                <One width={headerList[1].width}>{list[contentKeyArr[1]]}</One>
                <Two width={headerList[2].width}>{list[contentKeyArr[2]]}</Two>
                <Three width={headerList[3].width}>
                  {list[contentKeyArr[3]] ? list[contentKeyArr[3]] : '-'}
                </Three>
                <Four width={headerList[4].width}>
                  {list[contentKeyArr[4]]}
                </Four>
                <Five width={headerList[5].width}>
                  {list[contentKeyArr[5]]}
                </Five>
                {headerList[7].name === '상태' ? (
                  <>
                    <Six width={headerList[6].width}>
                      {list[contentKeyArr[6]]}
                    </Six>
                    <Seven width={headerList[7].width}>
                      {list[contentKeyArr[7]]}
                    </Seven>
                  </>
                ) : (
                  <>
                    <Six width={headerList[6].width}>
                      <Status>
                        <StatusColor status={list[contentKeyArr[6]]} />
                        {list[contentKeyArr[6]]}
                      </Status>
                    </Six>
                    <RequsetSeven
                      width={headerList[7].width}
                      status={list[contentKeyArr[7]]}
                    >
                      {list[contentKeyArr[7]]}
                    </RequsetSeven>
                  </>
                )}
              </tr>
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
  }

  td {
    /* height: 100%; */
    text-align: left;
    text-overflow: ellipsis;
    font-size: 1.0625rem;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const RequestShowListTitle = styled.thead`
  height: 3.125rem;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  font-weight: 600;
  font-size: 1.1875rem;
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

const Status = styled.div`
  ${props => props.theme.FlexRow}
  align-items: center;
  gap: 0.5rem;
`;

const StatusColor = styled.div`
  width: 0.9375rem;
  height: 0.9375rem;
  ${props =>
    props.status === '처리전' &&
    css`
      background-color: #e12020;
    `};

  ${props =>
    props.status === '처리중' &&
    css`
      background-color: #ff9900;
    `};

  ${props =>
    props.status === '처리완료' &&
    css`
      background-color: #027cff;
    `};
  border-radius: 50%;
`;

const ZeroTh = styled.th`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const OneTh = styled.th`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const TwoTh = styled.th`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const ThreeTh = styled.th`
  min-width: ${props => props.width};
  width: ${props => props.width};
`;

const FourTh = styled.th`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const FiveTh = styled.th`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const SixTh = styled.th`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const SevenTh = styled.th`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const Zero = styled.td`
  width: ${props => props.width};
  min-width: ${props => props.width};
  font-weight: 600;
`;

const One = styled.td`
  width: ${props => props.width};
  min-width: ${props => props.width};
  font-weight: 600;
`;

const Two = styled.td`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const Three = styled.td`
  min-width: ${props => props.width};
  width: ${props => props.width};
`;

const Four = styled.td`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const Five = styled.td`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const Six = styled.td`
  width: ${props => props.width};
  min-width: ${props => props.width};
`;

const Seven = styled.td`
  display: flex;
  align-items: center;
  width: ${props => props.width};
  min-width: ${props => props.width};
  height: 100%;
`;

const RequsetSeven = styled.td`
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
      background-color: #e0ffd6;
    `}

  ${props =>
    props.status === '거절' &&
    css`
      background-color: #ffe8e8;
    `}

    ${props =>
    props.status === '폐기' &&
    css`
      background-color: #efecd9;
    `}
`;
