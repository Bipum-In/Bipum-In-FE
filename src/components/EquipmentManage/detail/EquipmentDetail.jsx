import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentDetail } from '../../../redux/modules/equipmentStatus';
import styled from 'styled-components';
import Axios from '../../../api/axios';
import STRING from '../../../constants/string';

import DetailHeader from './DetailHeader';
import DetailBodyTitle from './DetailBodyTitle';
import DetailInfoProduct from './DetailInfoProduct';
import DetailInfoRequester from './DetailInfoRequester';
import DetailUseHistory from './DetailUseHistory';
import DetailRepairHistory from './DetailRepairHistory';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function EquipmentDetail({
  category,
  largeCategory,
  detailId,
  isClose,
}) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editRequester, setEditRequester] = useState({
    category: false,
    partners: false,
    deptUser: false,
  });
  const [dept, setDept] = useState(null);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [partners, setPartners] = useState(null);
  const [modelName, setModelName] = useState('');
  const [serialNum, setSerialNum] = useState('');
  const [smallCategory, setSmallCategory] = useState(null);
  const parseLargeCategory = useRef(largeCategory.filter((_, i) => i)).current;

  const { getDetail, isDetailError } = useSelector(
    state => state.equipmentStatus.equipmentDetail
  );

  const detailData = {
    largeCategory: '',
    categoryName: '',
    modelName: '',
    serialNum: '',
    partnersId: '',
    userId: '',
  };

  useEffect(() => {
    dispatch(getEquipmentDetail(detailId));
    axios.get(`/api/dept`).then(res => setDept(res.data.data));
    axios.get(`/api/partners`).then(res => setPartners(res.data.data));
  }, [detailId, dispatch]);

  useEffect(() => {
    if (edit) {
      const { modelName, serialNum } = getDetail.supplyDetail;
      setModelName(modelName);
      setSerialNum(serialNum);
    }
  }, [edit]);

  const handleEdit = () => setEdit(true);

  const handleEditRequester = e => {
    const value = e.target.value;
    setEditRequester({ ...editRequester, [value]: !editRequester[value] });
  };
  // console.log(getDetail.supplyDetail);
  const handleSave = supplyId => {
    const {
      largeCategory,
      category,
      modelName,
      serialNum,
      partnersId,
      userId,
    } = getDetail.supplyDetail;

    const constLargeCategory = STRING.CATEGORY[largeCategory];

    detailData.largeCategory || (detailData.largeCategory = constLargeCategory);
    detailData.categoryName || (detailData.categoryName = category);

    detailData.modelName || (detailData.modelName = modelName);
    detailData.serialNum || (detailData.serialNum = serialNum);
    detailData.partnersId || (detailData.partnersId = partnersId);
    detailData.userId || (detailData.userId = userId);

    console.log(detailData, supplyId);
    // axios
    //   .delete(`/api/supply/${supplyId}`, detailData)
    //   .then(() => isClose());
  };

  const handleDispose = supplyId => {
    axios.delete(`/api/supply/${supplyId}`).then(() => isClose());
  };

  const handleChangeLargeCategory = e => {
    const { ko, eng } = JSON.parse(e.target.value);
    detailData.largeCategory = eng;
    setSmallCategory(parseCategoryData(ko, category));
  };

  const handleChangeSmallCategory = e => {
    const { ko } = JSON.parse(e.target.value);
    detailData.categoryName = ko;
  };

  const handleChangeNameValue = e => setModelName(e.target.value);

  const handleChangeSerialValue = e => setSerialNum(e.target.value);

  const handleChangePartners = e => {
    const { ko: partners } = JSON.parse(e.target.value);
    detailData.partnersId = partners;
  };

  const handleChangeDept = e => {
    const { ko: dept } = JSON.parse(e.target.value);
    getUserData(dept);
  };

  const handleChangeUser = e => {
    const { ko: user } = JSON.parse(e.target.value);
    console.log(user);
    detailData.userId = user;
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
            onSave={handleSave}
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
                    onChangeValue={[
                      handleChangeNameValue,
                      handleChangeSerialValue,
                    ]}
                  />
                  <DetailInfoRequester
                    edit={edit}
                    editRequester={editRequester}
                    deptValue={[dept, user]}
                    detail={getDetail}
                    partners={partners}
                    category={[parseLargeCategory, smallCategory]}
                    onChangeCategory={[
                      handleChangeLargeCategory,
                      handleChangeSmallCategory,
                    ]}
                    onChangeDept={[handleChangeDept, handleChangeUser]}
                    onChangePartners={handleChangePartners}
                    onEditRequester={handleEditRequester}
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
