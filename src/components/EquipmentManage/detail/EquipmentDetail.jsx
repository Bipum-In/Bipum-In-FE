import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../../elements/Button';
import { getEquipmentDetail } from '../../../redux/modules/equipmentStatus';

export default function EquipmentDetail({ detailId }) {
  const dispatch = useDispatch();
  const { getDetail, isDetailError } = useSelector(
    state => state.equipmentStatus.equipmentDetail
  );

  useEffect(() => {
    dispatch(getEquipmentDetail(detailId));
  }, [detailId, dispatch]);

  return (
    <>
      {getDetail && (
        <DetailWrapper>
          <DetailHeader>
            <Button>폐기</Button>
            <Button>수정</Button>
            <Button>저장</Button>
          </DetailHeader>
          <DetailBodyTitle>
            <span>{getDetail.supplyDetail.modelName}</span>
            <span>
              <Status />
              {getDetail.supplyDetail.status}
            </span>
          </DetailBodyTitle>
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

  button {
    width: 3.9375rem;
    height: 2.0625rem;
    margin: 0;
  }

  button:nth-child(1) {
    color: #6d5517;
    background-color: #efecd9;
  }

  button:nth-child(2),
  button:nth-child(3) {
    color: white;
    background-color: ${props => props.theme.color.blue.brandColor6};
  }
`;

const DetailBodyTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4375rem;

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

const Status = styled.span`
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  background-color: #37d259;
  border-radius: 50%;
  margin-right: 0.25rem;
`;
