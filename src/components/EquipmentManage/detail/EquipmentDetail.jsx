import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentDetail } from '../../../redux/modules/equipmentStatus';

import styled from 'styled-components';
import Axios from '../../../api/axios';
import useSetEquipmentAddDate from '../../../hooks/useSetEquipmentAddDate';

import DetailHeader from './DetailHeader';
import DetailBodyTitle from './DetailBodyTitle';
import DetailInfoProduct from './DetailInfoProduct';
import DetailInfoRequester from './DetailInfoRequester';
import DetailUseHistory from './DetailUseHistory';
import DetailRepairHistory from './DetailRepairHistory';

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

export default function EquipmentDetail({
  category,
  largeCategory,
  detailId,
  isClose,
}) {
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

  const handleDispose = supplyId => {
    axios.delete(`/api/supply/${supplyId}`).then(() => isClose());
  };

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
      {isDetailError && <div>에러가 발생했습니다.</div>}
      {getDetail && (
        <DetailWrapper>
          <DetailHeader
            edit={edit}
            detail={getDetail}
            onEdit={handleEdit}
            onDispose={handleDispose}
          />
          <DetailBodyTitle detail={getDetail} />
          <DetailBodyContainer>
            <ImgContainer>
              <img src={getDetail.supplyDetail.image} alt="detailImg" />
            </ImgContainer>
            <div>
              <DetailInfoContainer>
                <DetailInfo>
                  <DetailInfoProduct
                    edit={edit}
                    value={[modelName, serialNum]}
                    detail={getDetail}
                    category={[parseLargeCategory, smallCategory]}
                    onChangeCategory={[
                      handleChangeLargeCategory,
                      handleChangeSmallCategory,
                    ]}
                    onChangeValue={[
                      handleChangeNameValue,
                      handleChangeSerialValue,
                    ]}
                  />
                  <DetailInfoRequester
                    edit={edit}
                    dateValue={[year, month]}
                    deptValue={[dept, user]}
                    detail={getDetail}
                    partners={partners}
                    setDateState={[
                      setSelectYear,
                      setSelectMonth,
                      setSelectDaysInMonth,
                    ]}
                    onChangeDept={[handleChangeDept, handleChangeUser]}
                    onChangeDate={[
                      handleChangeYear,
                      handleChangeMonth,
                      handleChangeDay,
                    ]}
                    onChangePartners={handleChangePartners}
                  />
                </DetailInfo>
              </DetailInfoContainer>
              <History>
                <DetailUseHistory detail={getDetail} />
                <DetailRepairHistory detail={getDetail} />
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

const DetailBodyContainer = styled.section`
  display: flex;
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

const History = styled.div`
  display: flex;
  gap: 3.125rem;
`;

// const InfiniteScrollCheck = styled.div`
//   height: 2.5rem;
//   background-color: ${props => props.theme.color.blue.brandColor1};
//   border-radius: 0 0 0.5rem 0.5rem;
// `;
