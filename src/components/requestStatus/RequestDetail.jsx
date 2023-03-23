import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Axios from '../../api/axios';
import Button from '../../elements/Button';
import { ReactComponent as ArrowDown } from '../../styles/commonIcon/arrowDown.svg';
import { ReactComponent as XClose } from '../../styles/commonIcon/close.svg';
import { FormatKoreanTime } from '../../utils/formatDate';

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
    serialNum,
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
  console.log(image);
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
    if (data.supplyId === 0 && requestType === '비품 요청') {
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

  const handleRepairComplete = () => {
    data.acceptResult = 'ACCEPT';
    putRequest(data);
  };

  const putRequest = data => {
    axios.put(`/api/admin/requests`, data).then(() => isClose());
  };

  return (
    <DetailContainer>
      <TitleContainer>
        <Title>
          <Type>{requestType}서</Type>
        </Title>
        <Close>
          <Button onClick={isClose}>
            <XClose />
          </Button>
        </Close>
      </TitleContainer>
      <ContentContainer>
        <RequestContainer>
          <UserInfoContainer>
            <UserInfoTitle>신청자 정보</UserInfoTitle>
            <UserInfo>
              <Img src={userImage} alt="userImage" />
              <UserInfoContent>
                <UserInfoDeptAndName>
                  <DeptName>
                    <span>부서</span>
                    {deptName}
                  </DeptName>
                  <EmpName>
                    <span>이름</span>
                    {empName}
                  </EmpName>
                </UserInfoDeptAndName>
                <UserName>
                  <span>이메일</span>
                  {username}
                </UserName>
              </UserInfoContent>
            </UserInfo>
          </UserInfoContainer>
          <UserContentContainer>
            <CategoryNameAndList>
              <UserContent>
                <ContentName>종류</ContentName>
                <ContentType>{categoryName}</ContentType>
              </UserContent>
              <UserContent>
                <ContentName>사용처</ContentName>
                <ContentType>개인</ContentType>
              </UserContent>
              {requestType !== '비품 요청' && requestStatus === '처리전' && (
                <UserContent>
                  <ContentName>시리얼넘버</ContentName>
                  <ContentType>{serialNum}</ContentType>
                </UserContent>
              )}
            </CategoryNameAndList>
            <UserContent>
              <ContentName>메세지</ContentName>
              <ContentType>{content}</ContentType>
            </UserContent>
          </UserContentContainer>
        </RequestContainer>
        <ProvideContainer>
          {stockList && requestType === '비품 요청' ? (
            <ProvideEquipment>
              <span>제공할 비품</span>
              <SelectWrapper>
                <Select onChange={handleChangeSelect}>
                  {stockList.lenght !== 0 ? (
                    <option>선택</option>
                  ) : (
                    <option>재고가 없습니다</option>
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
          ) : (
            <EquipmentImageContainer>
              <span>비품 사진</span>
              <ImageContainer>
                <img
                  src="https://cdn.autopostkorea.com/autopost/2021/12/24144910/2-34.jpg"
                  alt="equipmentImg"
                />
              </ImageContainer>
            </EquipmentImageContainer>
          )}
          {requestStatus === '처리전' ? (
            <MessegeAndRefuse>
              <span>남길 메시지</span>
              <TextArea
                value={declineComment}
                onChange={e => setDeclineComment(e.target.value)}
              />
            </MessegeAndRefuse>
          ) : (
            <SendMessegeContainer>
              <span>남긴 메시지</span>
              <SendMessege>{comment}</SendMessege>
            </SendMessegeContainer>
          )}
        </ProvideContainer>
      </ContentContainer>
      <ApproveAndRefuse>
        {requestStatus === '처리전' && (
          <>
            <AcceptBtn onClick={handleAccept}>승인</AcceptBtn>
            <DeclineBtn onClick={handleDecline}>거절</DeclineBtn>
          </>
        )}
        {requestStatus === '처리전' && requestType === '수리 요청' && (
          <DisposeBtn onClick={handleDispose}>폐기</DisposeBtn>
        )}
        {requestStatus === '처리중' && (
          <>
            <RepairBtn onClick={handleRepairComplete}>수리완료</RepairBtn>
            <DisposeBtn onClick={handleDispose}>폐기</DisposeBtn>
          </>
        )}
      </ApproveAndRefuse>
      {requestStatus === '처리전' ? (
        <CreatedAt>요청일: {FormatKoreanTime(createdAt)}</CreatedAt>
      ) : (
        <>
          <CreatedAt>요청일: {FormatKoreanTime(createdAt)}</CreatedAt>
          <CreatedAt>처리일: {FormatKoreanTime(modifiedAt)}</CreatedAt>
        </>
      )}
    </DetailContainer>
  );
}

const DetailContainer = styled.main`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  margin-bottom: 1.875rem;
`;

const TitleContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.875rem;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor7};
  padding: 0 3.9375rem;
  border-radius: 1rem 1rem 0 0;
`;

const Title = styled.div``;

const Type = styled.div`
  font-size: 1.0625rem;
  font-weight: 700;
`;

const Status = styled.div`
  color: ${props => props.theme.color.grey.brandColor7};
  font-size: 0.875rem;
  font-weight: 600;
`;

const Close = styled.div`
  button {
    font-size: 1.0625rem;
    font-weight: 700;
  }
`;

const ContentContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  width: 100%;
  padding: 1.875rem 3.9375rem;
`;

const CategoryNameAndList = styled.div`
  display: flex;
  margin-bottom: 1.375rem;
`;

const RequestContainer = styled.div`
  ${props => props.theme.FlexCow};
  align-items: center;
  width: 100%;
  font-weight: 600;
`;

const UserContentContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};
`;

const UserInfoContainer = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};
`;

const UserInfoTitle = styled.div`
  margin-bottom: 1.25rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8.25rem;
`;

const UserInfoContent = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: flex-start;
  width: 100%;
  height: 6rem;
  gap: 1rem;

  span {
    color: ${props => props.theme.color.grey.brandColor5};
    font-size: 13px;
  }
`;

const UserContent = styled.div`
  ${props => props.theme.FlexCol};
  gap: 0.375rem;
  margin-right: 2.625rem;
`;

const ContentName = styled.span`
  color: ${props => props.theme.color.grey.brandColor5};
  font-size: 0.8125rem;
  font-weight: 500;
`;

const ContentType = styled.span`
  font-size: 0.9375rem;
  font-weight: 500;
  word-wrap: break-word;
`;

const UserInfoDeptAndName = styled.div`
  ${props => props.theme.FlexRow};
  gap: 2rem;
`;

const DeptName = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 15px;
  font-weight: 500;
  gap: 0.375rem;
`;

const EmpName = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 15px;
  font-weight: 500;
  gap: 0.375rem;
`;

const UserName = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 15px;
  font-weight: 500;
  gap: 0.375rem;
`;

const Img = styled.img`
  width: 8.25rem;
  height: 8.25rem;
  border-radius: 50%;
  margin-right: 2.25rem;
`;

const ProvideContainer = styled.div`
  ${props => props.theme.FlexCol};
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
`;

const EquipmentImageContainer = styled.div`
  ${props => props.theme.FlexCol};
  color: ${props => props.theme.color.blue.brandColor6};
  padding: 1.5rem 0;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};

  img {
    width: 8.25rem;
    height: 8.25rem;
    border-radius: 0.375rem;
    margin-top: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: flex-start;
`;

const ProvideEquipment = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  color: ${props => props.theme.color.blue.brandColor6};
  padding: 1.5rem 0;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};
  font-size: 0.9375rem;
  font-weight: 600;
`;

const MessegeAndRefuse = styled.div`
  ${props => props.theme.FlexRow};
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${props => props.theme.color.blue.brandColor6};
  margin-top: 1.5rem;
  span {
    margin-right: 1.375rem;
  }
`;

const SendMessegeContainer = styled.div`
  ${props => props.theme.FlexCol};
  color: ${props => props.theme.color.blue.brandColor6};
  margin-top: 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  gap: 0.375rem;
`;

const SendMessege = styled.div`
  color: black;
  font-size: 0.9375rem;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 22.0625rem;
  height: 5rem;
  background-color: ${props => props.theme.color.grey.brandColor1};
  border: none;
  padding: 0.5rem;
  resize: none;
`;

const Select = styled.select`
  position: relative;
  width: 100%;
  height: 2.125rem;
  color: ${props => props.theme.color.grey.brandColor7};
  background-color: ${props => props.theme.color.grey.brandColor1};
  border: 1px solid ${props => props.theme.color.grey.brandColor3};
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
  width: 8rem;
  height: 1.875rem;
  margin-left: 1.375rem;
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
      stroke: ${props => props.theme.color.grey.brandColor7};
    }
  }
`;

const ApproveAndRefuse = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 0 3.9375rem;
  gap: 1rem;

  button {
    font-size: 1.0625rem;
    font-weight: 600;
  }
`;

const AcceptBtn = styled.button`
  max-width: 12.625rem;
  width: 100%;
  height: 2.5rem;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor6};
  border: 1px solid ${props => props.theme.color.blue.brandColor6};
  border-radius: 0.25rem;
  outline: none;
`;

const DeclineBtn = styled(AcceptBtn)`
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: white;
  border: 1px solid ${props => props.theme.color.blue.brandColor6};
`;

const DisposeBtn = styled(AcceptBtn)`
  color: #b6897b;
  background-color: white;
  border: 1px solid #b6897b;
`;

const RepairBtn = styled(DeclineBtn)``;

const CreatedAt = styled.span`
  width: 100%;
  color: ${props => props.theme.color.grey.brandColor4};
  padding: 0 3.9375rem;
  margin-bottom: 0.3125rem;
  font-weight: 500;
  font-size: 11px;
`;
