import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Axios from '../../api/axios';
import Button from '../../elements/Button';
import { ReactComponent as ArrowDown } from '../../styles/commonIcon/arrowDown.svg';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function RequestDetail({ isClose, detail }) {
  const {
    categoryId,
    requestId,
    isAdmin,
    requestType,
    requestStatus,
    acceptResult,
    categoryName,
    modelName,
    content,
    image,
    userImage,
    deptName,
    empName,
    username,
    comment,
    createdAt,
    modifiedAt,
  } = detail;

  const [stockList, setStockList] = useState(null);
  const [declineComment, setDeclineComment] = useState('');
  const data = useRef({
    requestId,
    acceptResult: '',
    supplyId: 0,
    comment: '',
  }).current;

  useEffect(() => {
    if (requestType === '비품 요청' && requestStatus === '처리전') {
      axios
        .get(`/api/supply/stock/${categoryId}`)
        .then(res => setStockList(res.data.data));
    }
  }, [categoryId, requestStatus, requestType]);

  const handleChangeSelect = e => {
    const { value } = e.target;
    data.supplyId = value;
    console.log(data);
  };

  const handleAccept = () => {
    if (data.supplyId === 0) {
      alert('비품을 선택해주세요.');
      return;
    }

    data.acceptResult = 'ACCEPT';
    putRequest(data);
  };

  const handleDecline = () => {
    if (!declineComment) {
      alert('거절 사유를 입력해주세요.');
      return;
    }

    data.acceptResult = 'DECLINE';
    data.comment = declineComment;
    putRequest(data);
  };

  const handleDispose = () => {
    data.acceptResult = 'DISPOSE';
    putRequest(data);
  };

  const putRequest = data => {
    axios.put(`/api/admin/requests`, data);
    isClose();
  };

  return (
    <DetailContainer>
      <TitleContainer>
        <Title>
          <Type>{requestType}서</Type>
          <Status>
            {requestStatus} {acceptResult}
          </Status>
        </Title>
        <Close>
          <Button onClick={isClose}>닫기</Button>
        </Close>
      </TitleContainer>
      <ContentContainer>
        <RequestContainer>
          <UserContentContainer>
            <div>
              <ContentName>신청비품</ContentName>
              <ContentType>{categoryName}</ContentType>
            </div>
            <div>
              <ContentName>사용처</ContentName>
              <ContentType>데이터 확인 필요</ContentType>
            </div>
            <div>
              <ContentName>요청 메세지</ContentName>
              <ContentType>{content}</ContentType>
            </div>
          </UserContentContainer>
          <UserInfoContainer>
            <p>신청자 정보</p>
            <UserInfo>
              <Img
                src="https://i.namu.wiki/i/0WIygWbcB6yfIAGylvJy_7ab6Wuak9LGcsXt31gHp0RI6onZjP6V0Riv39UIr81RReV5PbYIyBJsMnijZVg2L1pbWL9NU6RhzhSdzfzgnDjFWs085YBh8KGZME2HBz3BbZnGqd7OsY16TFagLJJ2TQ.webp"
                alt="userImage"
              />
              <UserInfoContent>
                <span>{deptName}팀</span>
                <span>{empName}</span>
                <span>{username}</span>
              </UserInfoContent>
            </UserInfo>
          </UserInfoContainer>
        </RequestContainer>
        <ProvideContainer>
          {stockList && (
            <ProvideEquipment>
              <span>제공 가능 비품 목록</span>
              <SelectWrapper>
                <Select onChange={handleChangeSelect}>
                  {stockList.lenght !== 0 ? (
                    <option>제품을 선택해주세요.</option>
                  ) : (
                    <option>재고가 없습니다.</option>
                  )}
                  {stockList.map(stock => (
                    <option key={stock.supplyId} value={stock.supplyId}>
                      {`modelName:${stock.modelName}
                    serialNum:${stock.serialNum}`}
                    </option>
                  ))}
                </Select>
                <SelectArrow>
                  <ArrowDown />
                </SelectArrow>
              </SelectWrapper>
            </ProvideEquipment>
          )}
          {requestStatus === '처리전' ? (
            <MessegeAndRefuse>
              <span>메세지 및 거절 사유</span>
              <TextArea
                value={declineComment}
                onChange={e => setDeclineComment(e.target.value)}
              />
            </MessegeAndRefuse>
          ) : (
            <MessegeAndRefuse>
              <span>메세지 및 거절 사유</span>
              <TextArea value={comment || '코멘트가 없습니다.'} />
            </MessegeAndRefuse>
          )}
        </ProvideContainer>
      </ContentContainer>
      <ApproveAndRefuse>
        {requestStatus !== '처리완료' && (
          <>
            <Button onClick={handleAccept}>승인</Button>
            <Button onClick={handleDecline}>거절</Button>
          </>
        )}
        {requestType === '수리 요청' && (
          <Button onClick={handleDispose}>폐기</Button>
        )}
      </ApproveAndRefuse>
    </DetailContainer>
  );
}

const DetailContainer = styled.main`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
`;

const TitleContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div``;

const Type = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Status = styled.div`
  color: ${props => props.theme.color.grey.brandColor7};
  font-size: 0.875rem;
  font-weight: 600;
`;

const Close = styled.div``;

const ContentContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  width: 70%;
  padding: 0 1rem;

  span {
    margin: 0 1rem;
  }
`;

const ContentName = styled.span`
  width: 5rem;
  font-size: 1rem;
`;

const ContentType = styled.span`
  color: ${props => props.theme.color.grey.brandColor7};
  font-size: 0.875rem;
`;

const RequestContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 600;
`;

const UserContentContainer = styled.div`
  div {
    ${props => props.theme.FlexRow};
    margin: 2rem 0;
    font-size: 0.875rem;
  }
`;

const UserInfoContainer = styled.div``;

const UserInfo = styled.div`
  ${props => props.theme.FlexRow};
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
`;

const UserInfoContent = styled.div`
  ${props => props.theme.FlexCol};

  gap: 1rem;
`;

const ProvideContainer = styled.div`
  ${props => props.theme.FlexCol};
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
  gap: 2rem;
`;

const ProvideEquipment = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
`;

const MessegeAndRefuse = styled.div`
  ${props => props.theme.FlexRow};
`;

const TextArea = styled.textarea`
  width: 28.125rem;
  height: 7.5rem;
  padding: 0.5rem;
  resize: none;
`;

const Select = styled.select`
  position: relative;
  width: 100%;
  height: 2.125rem;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  border: 0.0625rem solid ${props => props.theme.color.blue.brandColor3};
  border-radius: 0.375rem;
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
  appearance: none;
  padding: 0.3125rem 0.625rem;
  padding-right: 1.5625rem;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 20rem;
  height: 2.5rem;
  margin-right: 1.9375rem;
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 0.625rem;
  height: 0.9375rem;
  width: 0.9375rem;
  transform: translateY(-50%);
  pointer-events: none;
  svg {
    width: 0.9375rem;
    height: 0.9375rem;
    * {
      stroke: ${props => props.theme.color.blue.brandColor6};
    }
  }
`;

const ApproveAndRefuse = styled.div`
  position: absolute;
  bottom: 0;
  ${props => props.theme.FlexRow};
  gap: 1rem;
  transform: translateY(-3rem);

  Button {
    font-size: 1rem;
    font-weight: 600;
  }
`;
