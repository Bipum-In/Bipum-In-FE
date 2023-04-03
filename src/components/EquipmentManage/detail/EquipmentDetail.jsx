import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEquipmentDetail,
  initEquipmentDetail,
} from 'redux/modules/equipmentStatus';
import styled from 'styled-components';
import Axios from 'api/axios';
import STRING from 'constants/string';

import DetailImage from './DetailImage';
import DetailHeader from './DetailHeader';
import DetailBodyTitle from './DetailBodyTitle';
import DetailUseHistory from './DetailUseHistory';
import DetailInfoProduct from './DetailInfoProduct';
import DetailRepairHistory from './DetailRepairHistory';
import DetailInfoRequester from './DetailInfoRequester';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

const detailData = {
  largeCategory: '',
  categoryName: '',
  modelName: '',
  serialNum: '',
  partnersId: '',
  userId: '',
  image: '',
};

export default function EquipmentDetail({
  isAdmin,
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
  const [user, setUser] = useState('');
  const [imageForm, setImageForm] = useState(null);
  const [preview, setPreview] = useState('');
  const [partners, setPartners] = useState('');
  const [smallCategory, setSmallCategory] = useState(null);
  const parseLargeCategory = useRef(largeCategory.filter((_, i) => i)).current;
  const [optionNullList, setOptionNullList] = useState({
    partners: '회사명',
    dept: '부서명',
    user: '사원명',
  });

  const { getDetail, isDetailError } = useSelector(
    state => state.equipmentStatus.equipmentDetail
  );

  useEffect(() => {
    const path = isAdmin ? '/admin' : '';
    dispatch(initEquipmentDetail());
    dispatch(getEquipmentDetail({ path, supplyId: detailId }));

    axios
      .get(`/api/dept`)
      .then(res =>
        setDept([{ deptId: '', deptName: '선택 안함' }, ...res.data.data])
      );
    axios
      .get(`/api/partners`)
      .then(res =>
        setPartners([
          { partnersId: 'null', partnersName: '선택 안함' },
          ...res.data.data,
        ])
      );
  }, [detailId, dispatch]);

  const handleEdit = () => setEdit(true);

  const handleEditRequester = e => {
    const value = e.target.value;
    setEditRequester({ ...editRequester, [value]: !editRequester[value] });
  };

  const handleSave = supplyId => {
    const {
      largeCategory,
      category,
      partnersId,
      userId,
      image,
      modelName,
      serialNum,
    } = getDetail.supplyDetail;

    detailData.largeCategory = STRING.CATEGORY[largeCategory];
    detailData.categoryName = category;
    detailData.modelName = modelName;
    detailData.serialNum = serialNum;

    if (detailData.partnersId === 'null') {
      detailData.partnersId = '';
    } else {
      detailData.partnersId || (detailData.partnersId = partnersId || '');
    }

    if (detailData.userId) {
      detailData.userId === '선택 안함' && (detailData.userId = '');
    } else {
      detailData.userId = userId || '';
    }

    detailData.image || (detailData.image = image);
    console.log(detailData);
    sendFormData(supplyId, image);
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

  const handleChangePartners = e => {
    const { ko: partners } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;

    setOptionNullList(state => ({ ...state, partners: text }));
    detailData.partnersId = partners;
  };

  const handleChangeDept = e => {
    const { ko: dept } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, dept: text, user: '사원명' }));

    dept && getUserData(dept);
    detailData.userId = text;
  };

  const handleChangeUser = e => {
    const { ko: user } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, user: text }));

    detailData.userId = user;
    console.log(detailData, user);
  };

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
  };

  const getUserData = deptId =>
    axios.get(`/api/user/${deptId}`).then(res => setUser(res.data.data));

  const sendFormData = (supplyId, image) => {
    const formData = new FormData();
    formData.append('largeCategory', detailData.largeCategory);
    formData.append('categoryName', detailData.categoryName);
    formData.append('modelName', detailData.modelName);
    formData.append('serialNum', detailData.serialNum);
    formData.append('partnersId', detailData.partnersId);
    formData.append('userId', detailData.userId);

    if (imageForm) {
      formData.append('multipartFile', imageForm);
    } else {
      formData.append('image', image);
    }
    sendEditData(supplyId, formData);
  };

  const sendEditData = (supplyId, formData) =>
    axios.put(`/api/supply/${supplyId}`, formData).then(() => isClose());

  const handleChangeimge = e => {
    const img = e.target.files[0];
    setImageForm(img);
    setPreviewImage(img);
  };

  const setPreviewImage = img => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(img);
  };

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
            <DetailImage
              detail={getDetail}
              preview={preview}
              onChangeImage={handleChangeimge}
            />
            <div>
              <DetailInfoContainer>
                <DetailInfo>
                  <DetailInfoProduct edit={edit} detail={getDetail} />
                  <DetailInfoRequester
                    edit={edit}
                    optionNullList={optionNullList}
                    editRequester={editRequester}
                    deptValue={[dept, user]}
                    detail={getDetail}
                    partners={partners}
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
