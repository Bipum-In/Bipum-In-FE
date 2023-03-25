import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentDetail } from '../../../redux/modules/equipmentStatus';

import styled from 'styled-components';
import STRING from '../../../constants/string';
import Button from '../../../elements/Button';
import Input from '../../../elements/Input';

import SelectDate from '../../equipmentAdd/single/SelectDate';
import SelectCategoryList from '../../equipmentAdd/single/SelectCategoryList';

import useSetEquipmentAddDate from '../../../hooks/useSetEquipmentAddDate';
import SelectCategory from '../../common/SelectCategory';
import Axios from '../../../api/axios';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);
const equipmentData = {
  largeCategory: '',
  categoryName: '',
  modelName: '',
  serialNum: '',
  createdAt: '',
  partnersId: null,
  userId: null,
};

export default function EquipmentDetail({ category, largeCategory, detailId }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [day, setDay] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [dept, setDept] = useState(null);
  const [user, setUser] = useState(null);
  const [partners, setPartners] = useState(null);
  const [modelName, setModelName] = useState('');
  const [serialNum, setSerialNum] = useState('');
  const [smallCategory, setSmallCategory] = useState(null);
  const parseLargeCategory = useRef(largeCategory.filter((_, i) => i)).current;

  const [setSelectYear, setSelectMonth, setSelectDaysInMonth] =
    useSetEquipmentAddDate();

  const { getDetail, isDetailError } = useSelector(
    state => state.equipmentStatus.equipmentDetail
  );

  useEffect(() => {
    dispatch(getEquipmentDetail(detailId));
    axios.get(`/api/dept`).then(res => setDept(res.data.data));
    axios.get(`/api/partners`).then(res => setPartners(res.data.data));
  }, [detailId, dispatch]);

  const handleEdit = () => setEdit(true);

  const handleChangeLargeCategory = e => {
    const { ko, eng } = JSON.parse(e.target.value);
    equipmentData.largeCategory = eng;
    setSmallCategory(parseCategoryData(ko, category));
  };

  const handleChangeSmallCategory = e => {
    const { ko } = JSON.parse(e.target.value);
    equipmentData.categoryName = ko;
  };

  const handleChangeNameValue = e => setModelName(e.target.value);

  const handleChangeSerialValue = e => setSerialNum(e.target.value);

  const handleChangeYear = e => {
    const year = e.target.value;
    const parseYear = Number(year.split('년')[0]);
    setYear(parseYear);
  };

  const handleChangeMonth = e => {
    const month = e.target.value;
    const parseMonth = Number(month.split('월')[0]);
    setMonth(parseMonth);
  };

  const handleChangeDay = e => {
    const day = e.target.value;
    const parseDay = Number(day.split('일')[0]);
    setDay(parseDay);
  };

  const handleChangePartners = e => {
    const { ko: partners } = JSON.parse(e.target.value);
    equipmentData.partnersId = partners;
  };

  const handleChangeDept = e => {
    const { ko: dept } = JSON.parse(e.target.value);
    getUserData(dept);
  };

  const handleChangeUser = e => {
    const { ko: user } = JSON.parse(e.target.value);
    equipmentData.userId = user;
  };

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
  };

  const getUserData = deptId =>
    axios.get(`/api/user/${deptId}`).then(res => setUser(res.data.data));

  return (
    <>
      {getDetail && (
        <DetailWrapper>
          <DetailHeader>
            {edit ? (
              <SaveButton>저장</SaveButton>
            ) : (
              <>
                <DisposeButton>폐기</DisposeButton>
                <EditButton onClick={handleEdit}>수정</EditButton>
              </>
            )}
          </DetailHeader>
          <DetailBodyTitle>
            <span>{getDetail.supplyDetail.modelName}</span>
            <span>
              <Status status={getDetail.supplyDetail.status} />
              {STRING.EQUIPMENT_STATUS[getDetail.supplyDetail.status]}
            </span>
          </DetailBodyTitle>
          <DetailBodyContainer>
            <ImgContainer>
              <img
                src="https://images.samsung.com/kdp/goods/2023/02/10/e5b514a3-a820-4187-a440-f2af65de7f2c.png?$PD_GALLERY_L_PNG$"
                alt="detailImg"
              />
            </ImgContainer>
            <div>
              <DetailInfoContainer>
                <DetailInfo>
                  <DetailInfoContent>
                    <TextType>
                      <span>비품 종류</span>
                      {edit ? (
                        <SelectCategoryList
                          category={[parseLargeCategory, smallCategory]}
                          optionName={['name', 'categoryName']}
                          optionNullName={['대분류', '소분류']}
                          optionKey={['name', 'categoryName']}
                          optionValueKey={['name', 'categoryName']}
                          onChangeCategory={[
                            handleChangeLargeCategory,
                            handleChangeSmallCategory,
                          ]}
                        />
                      ) : (
                        <span>하드 코딩부분 수정해야함</span>
                      )}
                    </TextType>
                    <TextType>
                      <span>제품명</span>
                      {edit ? (
                        <Input
                          value={modelName}
                          setState={handleChangeNameValue}
                          placeholder="제품명을 기입해주세요"
                        />
                      ) : (
                        <span>{getDetail.supplyDetail.modelName}</span>
                      )}
                    </TextType>
                    <TextType>
                      <span>시리얼 넘버</span>
                      {edit ? (
                        <Input
                          value={serialNum}
                          setState={handleChangeSerialValue}
                          placeholder="시리얼넘버를 기입해주세요"
                        />
                      ) : (
                        <span>{getDetail.supplyDetail.serialNum}</span>
                      )}
                    </TextType>
                  </DetailInfoContent>
                  <DetailInfoContent>
                    <TextType>
                      <span>등록 일자</span>
                      {edit ? (
                        <>
                          <Date>
                            <SelectCategory
                              category={setSelectYear()}
                              optionNullName="년"
                              onChangeCategory={handleChangeYear}
                            />
                          </Date>
                          <Date>
                            <SelectCategory
                              category={setSelectMonth()}
                              optionNullName="월"
                              onChangeCategory={handleChangeMonth}
                            />
                          </Date>
                          <Date>
                            <SelectCategory
                              category={
                                year &&
                                month &&
                                setSelectDaysInMonth(year, month)
                              }
                              optionNullName="일"
                              onChangeCategory={handleChangeDay}
                            />
                          </Date>
                        </>
                      ) : (
                        <span>{getDetail.supplyDetail.createdAt}</span>
                      )}
                    </TextType>
                    <TextType>
                      <span>협력업체</span>
                      {edit ? (
                        <SelectCategory
                          category={partners}
                          optionNullName="회사명"
                          optionKey={'partnersName'}
                          optionValueKey={'partnersId'}
                          optionName={'partnersName'}
                          onChangeCategory={handleChangePartners}
                        />
                      ) : (
                        <span>{getDetail.supplyDetail.partnersName}</span>
                      )}
                    </TextType>
                    <TextType>
                      <span>사용자</span>
                      {edit ? (
                        <>
                          <SelectCategory
                            category={dept}
                            optionNullName={'부서명'}
                            optionKey={'deptName'}
                            optionValueKey={'deptId'}
                            optionName={'deptName'}
                            onChangeCategory={handleChangeDept}
                          />
                          <SelectCategory
                            category={user}
                            optionNullName={'사원명'}
                            optionKey={'empName'}
                            optionValueKey={'userId'}
                            optionName={'empName'}
                            onChangeCategory={handleChangeUser}
                          />
                        </>
                      ) : (
                        <span>
                          {`${getDetail.supplyDetail.deptName} / ${getDetail.supplyDetail.empName}`}
                        </span>
                      )}
                    </TextType>
                  </DetailInfoContent>
                </DetailInfo>
              </DetailInfoContainer>
              <History>
                <DetailUseHistory>
                  <p>사용 내역</p>
                  <DetailUseHistoryHeader>
                    <span>처리 완료일</span>
                    <span>사용자</span>
                    <span>내역</span>
                  </DetailUseHistoryHeader>
                  <InfiniteScroll>
                    <DetailUseHistoryContent>
                      <span>2023.02.03</span>
                      <span>개발팀 / 김선중</span>
                      <span>반납</span>
                    </DetailUseHistoryContent>
                    {/* <InfiniteScrollCheck /> */}
                  </InfiniteScroll>
                </DetailUseHistory>
                <DetailRepairHistory>
                  <p>수리 내역</p>
                  <DetailRepairHistoryHeader>
                    <span>수리 완료일</span>
                    <span>신청자</span>
                    <span>수리업체</span>
                  </DetailRepairHistoryHeader>
                  <InfiniteScroll>
                    <DetailRepairHistoryContent>
                      <span>2023.02.03</span>
                      <span>개발팀 / 김선중</span>
                      <span>os 모니터</span>
                    </DetailRepairHistoryContent>
                    {/* <InfiniteScrollCheck /> */}
                  </InfiniteScroll>
                </DetailRepairHistory>
              </History>
            </div>
          </DetailBodyContainer>
        </DetailWrapper>
      )}
    </>
  );
}

const DetailWrapper = styled.main`
  ${props => props.theme.flexCol}
  padding: 0 6.375rem;
`;

const DetailHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 2.25rem 0;
  gap: 0.5rem;
`;

const DisposeButton = styled(Button)`
  width: 3.9375rem;
  height: 2.0625rem;
  margin: 0;
  color: #6d5517;
  background-color: #efecd9;
`;

const SaveButton = styled(DisposeButton)`
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor6};
`;

const EditButton = styled(SaveButton)``;

const DetailBodyTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4375rem;
  margin-bottom: 1.25rem;

  span:first-child {
    font-weight: 600;
    font-size: 1.125rem;
  }

  span:last-child {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
  }
`;

const DetailBodyContainer = styled.section`
  display: flex;
`;

const Status = styled.span`
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  margin-right: 0.25rem;

  ${props => props.status === 'USING' && `background-color: #37d259;`}
  ${props => props.status === 'REPAIRING' && `background-color: #f7b500;`}
  ${props => props.status === 'STOCK' && `background-color: #027cff;`}
`;

const ImgContainer = styled.div`
  display: flex;
  margin-right: 5.9375rem;

  img {
    width: 23.25rem;
    height: 23.25rem;
    border: 1px solid ${props => props.theme.color.grey.brandColor2};
    border-radius: 0.375rem;
  }
`;

const DetailInfoContainer = styled.div`
  display: flex;
`;

const DetailInfo = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};
  gap: 2.875rem;
`;

const DetailInfoContent = styled.div`
  div:first-child {
    padding: 0;
    padding-bottom: 1.125rem;
  }

  div:last-child {
    border-bottom: none;
  }
`;

const TextType = styled.div`
  display: flex;
  align-items: center;
  min-width: 13rem;
  padding: 1.125rem 0;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};

  span {
    font-weight: 500;
    font-size: 0.8125rem;
  }

  span:first-child {
    min-width: 6rem;
    color: ${props => props.theme.color.blue.brandColor6};
  }

  select {
    min-width: 4.5rem;
    height: 2rem;
    color: black;
    padding: 0 0.5rem;
    background-color: ${props => props.theme.color.grey.brandColor1};
    font-weight: 500;
    font-size: 13px;
    margin-right: 0.5rem;
  }

  input {
    height: 2rem;
    color: black;
    margin: 0;
    background-color: ${props => props.theme.color.grey.brandColor1};
    font-weight: 500;
    font-size: 13px;
  }
`;

const Date = styled.div`
  display: flex;
  align-items: center;

  div {
    padding: 0;
    width: 4.5rem;
  }

  span {
    display: none;
  }
`;

const History = styled.div`
  display: flex;
  gap: 3.125rem;
`;

const InfiniteScroll = styled.div`
  height: 15rem;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 0 solid transparent;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.color.blue.brandColor6};
  }
  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.color.blue.brandColor1};
  }
`;

// const InfiniteScrollCheck = styled.div`
//   height: 2.5rem;
//   background-color: ${props => props.theme.color.blue.brandColor1};
//   border-radius: 0 0 0.5rem 0.5rem;
// `;

const DetailUseHistory = styled.div`
  width: 20.4375rem;
  height: 17.5rem;
  margin: 1.6875rem 0;
  border-radius: 0.5rem;

  p {
    color: ${props => props.theme.color.blue.brandColor6};
    margin: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 13px;
  }
`;

const DetailUseHistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor5};
  font-weight: 600;
  font-size: 13px;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0 2rem;
  gap: 2rem;

  span:nth-child(1) {
    min-width: 4.875rem;
  }

  span:nth-child(2) {
    min-width: 6.25rem;
  }

  span:nth-child(3) {
    min-width: 6.25rem;
  }
`;

const DetailUseHistoryContent = styled(DetailUseHistoryHeader)`
  color: black;
  background-color: ${props => props.theme.color.blue.brandColor1};
  border-radius: 0;
  font-weight: 500;
  font-size: 12px;
`;

const DetailRepairHistory = styled(DetailUseHistory)`
  width: 100%;
`;

const DetailRepairHistoryHeader = styled(DetailUseHistoryHeader)``;

const DetailRepairHistoryContent = styled(DetailUseHistoryContent)``;
