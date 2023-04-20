import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {} from 'redux/modules/requestStatus';
import EquipmentListContainer from 'components/EquipmentManage/EquipmentListContainer';
import { getCategoryList, initEquipment } from 'redux/modules/equipmentStatus';
import STRING from 'constants/string';
import EquipmentModal from 'components/EquipmentManage/EquipmentModal';
import { getEncryptionStorage } from 'utils/encryptionStorage';

export default function EquipmentManagement() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({
    detailShow: false,
    singleShow: false,
    multipleShow: false,
    id: null,
  });
  const { isAdmin } = getEncryptionStorage();

  const { getCategory, isCategoryError } = useSelector(
    state => state.equipmentStatus.category
  );

  const singleAddLargeCategory = Object.values(STRING.CATEGORY_ENG).map(
    value => {
      return { name: value };
    }
  );

  useEffect(() => {
    dispatch(getCategoryList());
    return () => {
      dispatch(initEquipment());
    };
  }, [dispatch, showModal]);

  const handleDetailModal = id => {
    setShowModal(state => ({
      ...state,
      detailShow: !state.detailShow,
      id: id,
    }));
  };

  const handleSingleModal = () => {
    setShowModal(state => ({
      ...state,
      singleShow: !state.singleShow,
    }));
  };

  const handleMultipleModal = () => {
    setShowModal(state => ({ ...state, multipleShow: !state.multipleShow }));
  };

  if (isCategoryError) return <div>에러 발생</div>;
  return (
    <>
      {getCategory && (
        <>
          <EquipmentListContainer
            isAdmin={isAdmin}
            showModal={showModal}
            category={getCategory}
            singleAddLargeCategory={singleAddLargeCategory}
            onClickDetail={handleDetailModal}
            onClickSingleModal={handleSingleModal}
            onClickMultiModal={handleMultipleModal}
          />
          <EquipmentModal
            isAdmin={isAdmin}
            showModal={showModal}
            handleDetailModal={handleDetailModal}
            handleSingleModal={handleSingleModal}
            handleMultipleModal={handleMultipleModal}
            category={getCategory.category}
            largeCategory={singleAddLargeCategory}
          />
        </>
      )}
    </>
  );
}
