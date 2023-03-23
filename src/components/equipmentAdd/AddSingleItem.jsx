import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import { v4 as uuidv4 } from 'uuid';
import { getCategoryList } from '../../redux/modules/equipmentStatus';
import { __partnersList } from '../../redux/modules/partnersList';
import SelectBoxs from '../common/SelectBoxs';
import { __deptList } from '../../redux/modules/deptList';
import { __deptUserList } from '../../redux/modules/deptUserList';
import Axios from '../../api/axios';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function AddSingleItem() {
  const dispatch = useDispatch();
  const [dept, setDept] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(__partnersList());
  }, [dispatch]);

  useEffect(() => {
    axios.get(`/api/dept`).then(response => setDept(response.data.data));
  }, []);

  const { getPartners, isPartnersLoading } = useSelector(
    state => state.partnersList.partnersList
  );
  const partnersData = getPartners?.data;
  const { getCategory, isCategoryLoading } = useSelector(
    state => state.equipmentStatus.category
  );

  const [formImage, setFormformImage] = useState(null);
  const [preview, setPreview] = useState('');
  function onChangeimge(e) {
    const img = e.target.files[0];
    const formImg = new FormData();
    formImg.append('image', img);
    const reader = new FileReader();
    setFormformImage(formImg);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    console.log(img);
    if (img) {
      reader.readAsDataURL(img);
    } else {
      setPreview('');
    }
  }

  const onValid = data => {
    const formData = new FormData();
    // formData.append('largeCategory');
    // formData.append('categoryName');
    // formData.append('modelName');
    // formData.append('serialNum');
    // formData.append('createdAt');
    // formData.append('partnersId');
    // formData.append('userId');
    for (const keyValue of formImage) {
      formData.append(keyValue[0], keyValue[1]);
    }
    console.log(data);
  };

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    return Array.from({ length: lastDay }, (_, i) => i + 1);
  };

  const [nameValue, setNameValue] = useState('');
  const [serialValue, setSerialValue] = useState('');
  const [selectedLargeCategory, setSelectedLargeCategory] = useState('대분류');
  const [isShowOptions, setShowOptions] = useState(false);
  const handleOnChangeMainTypeSelectValue = e => {
    const { innerText } = e.target;
    setSelectedLargeCategory(innerText);
  };

  const [subTypeSeleteValue, setSubTypeSeleteValue] = useState('소분류');

  const [isShowSubOptions, setShowSubOptions] = useState(false);
  const handleOnChangeSubTypeSelectValue = e => {
    const { innerText } = e.target;
    setSubTypeSeleteValue(innerText);
  };

  const categoryData =
    getCategory?.category &&
    getCategory.category.filter(
      item => item.largeCategory === selectedLargeCategory
    );

  const [yearSeleteValue, setYearSeleteValue] = useState('');

  const [isShowYearOptions, setShowYearOptions] = useState(false);
  const handleYearChange = e => {
    const { innerText } = e.target;
    setYearSeleteValue(innerText);
  };

  const yearOptions = [];
  for (let year = 2000; year <= 2023; year++) {
    yearOptions.push(
      <Option key={year} onClick={handleYearChange}>
        {year}
      </Option>
    );
  }

  const [monthSeleteValue, setMonthSeleteValue] = useState('');
  const [isShowMonthOptions, setShowMonthOptions] = useState(false);
  const handleMonthChange = e => {
    const { innerText } = e.target;
    setMonthSeleteValue(innerText);
  };
  const monthOptions = [];
  for (let month = 1; month <= 12; month++) {
    monthOptions.push(
      <Option key={month} onClick={handleMonthChange}>
        {month}
      </Option>
    );
  }
  const [daySeleteValue, setDaySeleteValue] = useState('');

  const [isShowDayOptions, setShowDayOptions] = useState(false);
  const handleDayChange = e => {
    const { innerText } = e.target;
    setDaySeleteValue(innerText);
  };
  const [partnerSeleteValue, setPartnerSeleteValue] = useState('회사명');

  const [partnerId, setPartnerId] = useState(null);
  const [isShowPartnerOptions, setShowPartnerOptions] = useState(false);

  const handleOnChangePartnerSelectValue = e => {
    const { innerText, value } = e.target;
    setPartnerId(value);
    setPartnerSeleteValue(innerText);
  };

  const [depSeleteValue, setDepSeleteValue] = useState('부서명');

  const [isShowDepOptions, setShowDepOptions] = useState(false);

  const handleOnChangeDepSelectValue = e => {
    const { innerText } = e.target;
    setDepSeleteValue(innerText);

    const deptId = e.target.value;
    axios
      .get(`/api/user/${deptId}`)
      .then(response => setUser(response.data.data));
  };
  const [userId, setUserId] = useState(null);
  const [nameSeleteValue, setNameSeleteValue] = useState('이름');
  console.log(userId);

  const [isShowNameOptions, setShowNameOptions] = useState(false);
  const handleOnChangeNameSelectValue = e => {
    const { innerText, value } = e.target;
    setUserId(value);
    setNameSeleteValue(innerText);
  };

  return (
    <>
      {getCategory && (
        <Container>
          <AddContainer onSubmit={onValid}>
            <EquipmentContainer>
              <TypeBox>
                <TypeTitle requiredinput="true">비품종류</TypeTitle>
                <SelectBoxs
                  onClick={() =>
                    setShowOptions(isShowOptions => !isShowOptions)
                  }
                  eqtype="true"
                  seleteValue={selectedLargeCategory}
                  show={isShowOptions}
                  height="true"
                  arrow="true"
                >
                  {getCategory.largeCategory.map(
                    item =>
                      item.name !== '전체' && (
                        <Option
                          key={uuidv4()}
                          onClick={handleOnChangeMainTypeSelectValue}
                        >
                          {item.name}
                        </Option>
                      )
                  )}
                </SelectBoxs>
                <SelectBoxs
                  onClick={() =>
                    setShowSubOptions(isShowSubOptions => !isShowSubOptions)
                  }
                  eqtype="true"
                  seleteValue={subTypeSeleteValue}
                  show={isShowSubOptions}
                  height="true"
                >
                  {categoryData.map(item => {
                    return (
                      <Option
                        key={uuidv4()}
                        onClick={handleOnChangeSubTypeSelectValue}
                      >
                        {item.categoryName}
                      </Option>
                    );
                  })}
                </SelectBoxs>
              </TypeBox>
              <TypeBox>
                <TypeTitle requiredinput="true">제품명</TypeTitle>
                <Input
                  type="text"
                  value={nameValue}
                  setState={event => setNameValue(event.target.value)}
                  placeholder="제품명을 기입해주세요"
                  required
                />
              </TypeBox>
              <TypeBox>
                <TypeTitle requiredinput="true">시리얼 넘버</TypeTitle>
                <Input
                  type="text"
                  value={serialValue}
                  setState={event => setSerialValue(event.target.value)}
                  placeholder="시리얼넘버를 기입해주세요"
                  required
                />
              </TypeBox>
              <AcquisitionContainer>
                <TypeBox>
                  <TypeTitle>취득일자</TypeTitle>
                  <AcquisitionYear>
                    <SelectBoxs
                      onClick={() =>
                        setShowYearOptions(
                          isShowYearOptions => !isShowYearOptions
                        )
                      }
                      seleteValue={yearSeleteValue}
                      text="년"
                      show={isShowYearOptions}
                    >
                      {yearOptions}
                    </SelectBoxs>
                  </AcquisitionYear>

                  <AcquisitionMonth>
                    <SelectBoxs
                      onClick={() =>
                        setShowMonthOptions(
                          isShowMonthOptions => !isShowMonthOptions
                        )
                      }
                      seleteValue={monthSeleteValue}
                      text="월"
                      show={isShowMonthOptions}
                    >
                      {monthOptions}
                    </SelectBoxs>
                  </AcquisitionMonth>
                  <AcquisitionDay>
                    <SelectBoxs
                      onClick={() =>
                        setShowDayOptions(isShowDayOptions => !isShowDayOptions)
                      }
                      seleteValue={daySeleteValue}
                      text="일"
                      show={isShowDayOptions}
                    >
                      <Option onClick={handleDayChange}>
                        {getDaysInMonth(
                          new Date().getFullYear(),
                          parseInt(monthSeleteValue) - 1
                        ).map(day => (
                          <Option key={uuidv4()}> {day}</Option>
                        ))}
                      </Option>
                    </SelectBoxs>
                  </AcquisitionDay>
                </TypeBox>
              </AcquisitionContainer>
              <TypeBox>
                <TypeTitle>협력업체</TypeTitle>
                <PartnerCompany>
                  <SelectBoxs
                    onClick={() =>
                      setShowPartnerOptions(
                        isShowPartnerOptions => !isShowPartnerOptions
                      )
                    }
                    seleteValue={partnerSeleteValue}
                    show={isShowPartnerOptions}
                    height="true"
                  >
                    {partnersData?.map(item => {
                      return (
                        <Option
                          key={uuidv4()}
                          value={item.partnersId}
                          onClick={handleOnChangePartnerSelectValue}
                        >
                          {item.partnersName}
                        </Option>
                      );
                    })}
                  </SelectBoxs>
                </PartnerCompany>
              </TypeBox>

              <TypeBox>
                <TypeTitle>사용자</TypeTitle>
                <DepName>
                  <SelectBoxs
                    onClick={() =>
                      setShowDepOptions(isShowDepOptions => !isShowDepOptions)
                    }
                    seleteValue={depSeleteValue}
                    show={isShowDepOptions}
                    height="true"
                  >
                    {dept?.map(item => {
                      return (
                        <Option
                          key={uuidv4()}
                          onClick={handleOnChangeDepSelectValue} //수정
                          value={item.deptId}
                        >
                          {item.deptName}
                        </Option>
                      );
                    })}
                  </SelectBoxs>
                </DepName>
                <UserName>
                  <SelectBoxs
                    onClick={() =>
                      setShowNameOptions(
                        isShowNameOptions => !isShowNameOptions
                      )
                    }
                    seleteValue={nameSeleteValue}
                    show={isShowNameOptions}
                    height="true"
                  >
                    {user?.map(user => (
                      <Option
                        key={uuidv4()}
                        value={user.userId}
                        onClick={handleOnChangeNameSelectValue}
                      >
                        {user.empName}
                      </Option>
                    ))}
                  </SelectBoxs>
                </UserName>
              </TypeBox>
            </EquipmentContainer>
            <ImageContainer>
              사진첨부
              {preview && <Image src={preview} alt="preview" />}
              <ImageinputFile
                as={'input'}
                type="file"
                accept="image/*"
                onChange={onChangeimge}
              />
            </ImageContainer>
            <ButtonBox>
              <Button type="submit">비품 등록 완료</Button>
            </ButtonBox>
          </AddContainer>
        </Container>
      )}
    </>
  );
}

const ImageinputFile = styled.div`
  ::file-selector-button {
    border: 0;
    border-radius: 6px;
    ${props => props.theme.FlexCol};
    ${props => props.theme.FlexCenter};
    color: ${props => props.theme.color.blue.brandColor6};
    width: 100%;
    height: 2.8125rem;
    font-weight: 700;
    font-size: 1.375rem;
    background-color: #e4f0ff;
    cursor: pointer;
  }
`;
const PartnerCompany = styled.div`
  width: 5.8125rem;
  height: 2.5rem;
`;
const DepName = styled.div`
  ${props => props.theme.FlexRow};
  width: 5.8125rem;
  height: 2.5rem;
`;
const UserName = styled.div`
  width: 5.8125rem;
  height: 2.5rem;
`;
const Option = styled.li`
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #d0e4ff;
  }
`;
const ButtonBox = styled.div`
  position: absolute;
  right: 0rem;
  bottom: 3.5rem;
  display: flex;
  justify-content: center;
  width: 100%;

  Button {
    border: 0;
    color: white;
    width: 21.9375rem;
    height: 3.875rem;
    font-weight: 700;
    font-size: 1.375rem;
    background-color: ${props => props.theme.color.blue.brandColor6};
  }
`;
const AcquisitionYear = styled.div`
  width: 6.5625rem;
  height: 2.5rem;
`;
const AcquisitionDay = styled.div`
  width: 5rem;
  height: 2.5rem;
`;
const AcquisitionMonth = styled.div`
  width: 5rem;
  height: 2.5rem;
`;
const AcquisitionContainer = styled.div`
  height: 2.5rem;
`;
const Image = styled.img`
  background-color: ${props => props.theme.color.grey.brandColor1};
  width: 23.75rem;
  height: 23.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1.375rem;
`;
const ImageContainer = styled.div`
  ${props => props.theme.FlexCol};
  width: 23.75rem;
  height: 30.625rem;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.3125rem;
`;
const TypeTitle = styled.span`
  font-size: 1.125rem;
  width: 8.75rem;
  ${props =>
    props.requiredinput === 'true' &&
    css`
      &::before {
        content: '*';
        color: red;
        padding-right: 0.3125rem;
      }
    `}
`;
const TypeBox = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 0.5rem;
  width: 37rem;
  height: 2.5rem;
  Input {
    width: 28.125rem;
    height: 2.5rem;
    background: ${props => props.theme.color.grey.brandColor1};
    border-radius: 0.5rem;
  }
`;
const EquipmentContainer = styled.div`
  ${props => props.theme.FlexCol};
  width: 37rem;
  height: 30.625rem;
  gap: 3.125rem;
`;
const AddContainer = styled.form`
  width: 100%;
  display: flex;
  margin: 7.25rem 11rem 12rem 11rem;
  justify-content: space-between;
`;
const Container = styled.div`
  ${props => props.theme.wh100};
  height: 73.9vh;
  display: flex;
  overflow: hidden;
  position: relative;
`;
