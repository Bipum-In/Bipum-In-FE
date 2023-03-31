import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentDetail } from '../../../redux/modules/equipmentStatus';
import styled from 'styled-components';
import Axios from '../../../api/axios';
import STRING from '../../../constants/string';

import DetailImage from './DetailImage';
import DetailHeader from './DetailHeader';
import DetailBodyTitle from './DetailBodyTitle';
import DetailUseHistory from './DetailUseHistory';
import DetailInfoProduct from './DetailInfoProduct';
import DetailRepairHistory from './DetailRepairHistory';
import DetailInfoRequester from './DetailInfoRequester';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

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
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
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
    image,
  };

  useEffect(() => {
    const path = isAdmin ? '/admin' : '';
    dispatch(getEquipmentDetail({ path, supplyId: detailId }));

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

  const handleSave = supplyId => {
    const { largeCategory, category, partnersId, userId, image } =
      getDetail.supplyDetail;

    const constLargeCategory = STRING.CATEGORY[largeCategory];
    detailData.largeCategory || (detailData.largeCategory = constLargeCategory);
    detailData.categoryName || (detailData.categoryName = category);

    detailData.modelName = modelName;
    detailData.serialNum = serialNum;
    detailData.partnersId || (detailData.partnersId = partnersId);
    detailData.userId || (detailData.userId = userId);
    detailData.image || (detailData.image = image);

    sendFormData(supplyId);
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
    detailData.userId = user;
  };

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
  };

  const getUserData = deptId =>
    axios.get(`/api/user/${deptId}`).then(res => setUser(res.data.data));

  const sendFormData = supplyId => {
    const formData = new FormData();
    formData.append('largeCategory', detailData.largeCategory);
    formData.append('categoryName', detailData.categoryName);
    formData.append('modelName', detailData.modelName);
    formData.append('serialNum', detailData.serialNum);
    formData.append('partnersId', detailData.partnersId);
    formData.append('userId', detailData.userId);

    if (image) {
      formData.append('multipartFile', image);
    }
    sendEditData(supplyId, formData);
  };

  const sendEditData = (supplyId, formData) =>
    axios.put(`/api/supply/${supplyId}`, formData);

  const handleChangeimge = e => {
    const img = e.target.files[0];
    setImage(img);
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
