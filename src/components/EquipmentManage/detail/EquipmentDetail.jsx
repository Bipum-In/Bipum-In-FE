import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getEquipmentDetail,
  initEquipmentDetail,
  initHistory,
} from 'redux/modules/equipmentStatus';
import { setRequestData } from 'redux/modules/requestStatus';
import { useModalState } from 'hooks/useModalState';

import styled from 'styled-components';
import Axios from 'api/axios';
import STRING, { REQUEST_PAGES } from 'constants/string';
import ROUTER from 'constants/routerConst';

import DetailImage from './DetailImage';
import DetailHeader from './DetailHeader';
import DetailBodyTitle from './DetailBodyTitle';
import DetailUseHistory from './DetailUseHistory';
import DetailInfoProduct from './DetailInfoProduct';
import DetailRepairHistory from './DetailRepairHistory';
import DetailInfoRequester from './DetailInfoRequester';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function EquipmentDetail({ isAdmin, detailId, isClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [disposeModal, setDisposeModal] = useModalState();
  const [editRequester, setEditRequester] = useState({
    category: false,
    partners: false,
    deptUser: false,
  });
  const [dept, setDept] = useState(null);
  const [user, setUser] = useState('');
  const [deptId, setDeptId] = useState('');
  const [userId, setUserId] = useState('');
  const [useType, setUseType] = useState('');
  const [partnersId, setPartnersId] = useState('');
  const [imageForm, setImageForm] = useState(null);
  const [preview, setPreview] = useState('');
  const [partners, setPartners] = useState('');
  const [optionNullList, setOptionNullList] = useState({
    partners: '회사명',
    dept: '부서명',
    user: '공용',
  });

  const { getDetail, isDetailError } = useSelector(
    state => state.equipmentStatus.equipmentDetail
  );

  useEffect(() => {
    const path = isAdmin ? '/admin' : '';
    dispatch(initHistory());
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
          { partnersId: '', partnersName: '선택 안함' },
          ...res.data.data,
        ])
      );
  }, [dispatch]);

  const handleEdit = () => {
    const { partnersId, userId, deptId } = getDetail.supplyDetail;
    setEdit(true);

    if (partnersId) {
      setPartnersId(partnersId);
    }

    if (userId) {
      setUserId(userId);
      setUseType(STRING.USE_TYPE['개인']);
      return;
    }

    if (deptId && !userId) {
      setDeptId(deptId);
      setUseType(STRING.USE_TYPE['공용']);
      return;
    }
  };

  const handleEditRequester = e => {
    const value = e.target.value;
    setEditRequester({ ...editRequester, [value]: !editRequester[value] });
  };

  const handleSave = supplyId => sendFormData(supplyId);

  const handleDispose = supplyId => {
    axios.delete(`/api/supply/${supplyId}`).then(() => isClose());
    setDisposeModal(false);
  };

  const handleFromRequest = (e, supplyId, supplyName) => {
    const { value } = e.target;
    dispatch(setRequestData({ ...REQUEST_PAGES[value], supplyId, supplyName }));
    navigate(ROUTER.PATH.USER.REQUEST);
  };

  const handleChangePartners = e => {
    const { ko: partners } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;

    setOptionNullList(state => ({ ...state, partners: text }));
    setPartnersId(partners);
  };

  const handleChangeDept = e => {
    const { ko: dept } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, dept: text, user: '공용' }));

    if (!dept) {
      setUseType('');
      return;
    }

    getUserData(dept);
    setDeptId(dept);
    setUserId('');
    setUseType(STRING.USE_TYPE['공용']);
  };

  const handleChangeUser = e => {
    const { ko: user } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, user: text }));

    setDeptId('');
    setUserId(user);
    setUseType(STRING.USE_TYPE['개인']);
  };

  const getUserData = deptId =>
    axios.get(`/api/user/${deptId}`).then(res => setUser(res.data.data));

  const sendFormData = supplyId => {
    const formData = new FormData();
    const { largeCategory, category, image, modelName, serialNum } =
      getDetail.supplyDetail;

    formData.append('largeCategory', STRING.CATEGORY[largeCategory]);
    formData.append('categoryName', category);
    formData.append('modelName', modelName);
    formData.append('serialNum', serialNum);
    formData.append('partnersId', partnersId);
    formData.append('userId', userId);
    formData.append('deptId', deptId);
    formData.append('useType', useType);

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

  const handleModalOpen = () => setDisposeModal();
  const handleModalClose = () => setDisposeModal(false);

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
            onDispose={handleModalOpen}
            disposeModal={disposeModal}
            onFromRequest={handleFromRequest}
            handleModalClose={handleModalClose}
            handleDispose={handleDispose}
          />
          <DetailBodyTitle detail={getDetail} />
          <DetailBodyContainer>
            <DetailImage
              detail={getDetail}
              preview={preview}
              onChangeImage={handleChangeimge}
            />
            <DetailContentContainer>
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
            </DetailContentContainer>
          </DetailBodyContainer>
        </DetailWrapper>
      )}
    </>
  );
}

const DetailWrapper = styled.main`
  padding: 0 6.375rem;
`;

const DetailBodyContainer = styled.section`
  display: flex;
  height: 40rem;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 86.25rem) {
    flex-direction: column;
    align-items: center;

    div:first-child {
      margin: 0;
    }
  }
`;

const DetailInfoContainer = styled.div`
  display: flex;
`;

const DetailContentContainer = styled.article`
  width: 100%;

  @media (max-width: 86.25rem) {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 3rem 0;
  }
`;

const DetailInfo = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};
  gap: 2.875rem;

  @media (max-width: 106.25rem) {
    flex-direction: column;
  }
`;

const History = styled.div`
  display: flex;
  gap: 3.125rem;

  @media (max-width: 106.25rem) {
    flex-direction: column;
    margin-top: 2rem;
  }
`;
