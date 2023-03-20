import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from '../../elements/Button';
// import SelectBoxs from '../common/SelectBoxs';
import Input from '../../elements/Input';
import { ReactComponent as ArrowDown } from '../../styles/commonIcon/arrowDown.svg';
export default function AddSingleItem() {
  const [formImage, setFormformImage] = useState(null);
  const [preview, setPreview] = useState('');

  const dispatch = useDispatch();

  function onChangeimge(e) {
    const img = e.target.files[0];
    const formImg = new FormData();
    formImg.append('imageFile', img);
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

  // const onValid = data => {
  //   console.log(data);
  // };

  //날짜 동적으로 표시
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    return Array.from({ length: lastDay }, (_, i) => i + 1);
  };
  //제품명, 시리얼넘버 인풋 스테이트
  const [nameValue, setNameValue] = useState('');
  const [serialValue, setSerialValue] = useState('');
  //비품종류 셀렉트
  const [typeSeleteValue, setTypeSeleteValue] =
    useState('비품 종류를 선택해주세요');
  const [isShowOptions, setShowOptions] = useState(false);
  const handleOnChangeTypeSelectValue = e => {
    const { innerText } = e.target;
    setTypeSeleteValue(innerText);
  };
  //년도 셀렉트
  const [yearSeleteValue, setYearSeleteValue] = useState('');
  const [isShowYearOptions, setShowYearOptions] = useState(false);
  const handleYearChange = e => {
    const { innerText } = e.target;
    setYearSeleteValue(innerText);
  };
  //2000~2023 반복문
  const yearOptions = [];
  for (let year = 2000; year <= 2023; year++) {
    yearOptions.push(
      <Option key={year} onClick={handleYearChange}>
        {year}
      </Option>
    );
  }
  //월 셀렉트
  const [monthSeleteValue, setMonthSeleteValue] = useState('');
  const [isShowMonthOptions, setShowMonthOptions] = useState(false);
  const handleMonthChange = e => {
    const { innerText } = e.target;
    setMonthSeleteValue(innerText);
  };
  //1월~12월 반복문
  const monthOptions = [];
  for (let month = 1; month <= 12; month++) {
    monthOptions.push(
      <Option key={month} onClick={handleMonthChange}>
        {month}
      </Option>
    );
  }
  //일 셀렉트
  const [daySeleteValue, setDaySeleteValue] = useState('');
  const [isShowDayOptions, setShowDayOptions] = useState(false);

  const handleDayChange = e => {
    const { innerText } = e.target;
    setDaySeleteValue(innerText);
  };
  //협력업체 셀렉트
  const [partnerSeleteValue, setPartnerSeleteValue] = useState('회사명');
  const [isShowPartnerOptions, setShowPartnerOptions] = useState(false);

  const handleOnChangePartnerSelectValue = e => {
    const { innerText } = e.target;
    setPartnerSeleteValue(innerText);
  };
  //부서명 셀렉트
  const [depSeleteValue, setDepSeleteValue] = useState('부서명');
  const [isShowDepOptions, setShowDepOptions] = useState(false);

  const handleOnChangeDepSelectValue = e => {
    const { innerText } = e.target;
    setDepSeleteValue(innerText);
  };
  //사우 명 셀렉트
  const [nameSeleteValue, setNameSeleteValue] = useState('이름');
  const [isShowNameOptions, setShowNameOptions] = useState(false);

  const handleOnChangeNameSelectValue = e => {
    const { innerText } = e.target;
    setNameSeleteValue(innerText);
  };

  return (
    <Container>
      <AddContainer>
        <EquipmentContainer>
          <TypeBox>
            <TypeTitle requiredinput="true">비품종류</TypeTitle>
            <SelectBox
              onClick={() => setShowOptions(isShowOptions => !isShowOptions)}
              eqtype="true"
            >
              <CurrentState>{typeSeleteValue}</CurrentState>
              <SelectOptions show={isShowOptions} height="true">
                <Option onClick={handleOnChangeTypeSelectValue}>비품</Option>
                <Option onClick={handleOnChangeTypeSelectValue}>종류</Option>
                <Option onClick={handleOnChangeTypeSelectValue}>선택</Option>
              </SelectOptions>
            </SelectBox>
          </TypeBox>
          <TypeBox>
            <TypeTitle requiredinput="true">제품명</TypeTitle>
            <Input
              type="text"
              value={nameValue}
              onChange={event => setNameValue(event.target.value)}
              placeholder="제품명을 기입해주세요"
              required
            />
          </TypeBox>
          <TypeBox>
            <TypeTitle requiredinput="true">시리얼 넘버</TypeTitle>
            <Input
              type="text"
              value={serialValue}
              onChange={event => setSerialValue(event.target.value)}
              placeholder="시리얼넘버를 기입해주세요"
              required
            />
          </TypeBox>
          <AcquisitionContainer>
            <TypeBox>
              <TypeTitle>취득일자</TypeTitle>
              <AcquisitionYear>
                <SelectBox
                  onClick={() =>
                    setShowYearOptions(isShowYearOptions => !isShowYearOptions)
                  }
                >
                  <CurrentState>{yearSeleteValue}년</CurrentState>
                  <SelectOptions show={isShowYearOptions}>
                    {yearOptions}
                  </SelectOptions>
                </SelectBox>
              </AcquisitionYear>

              <AcquisitionMonth>
                <SelectBox
                  onClick={() =>
                    setShowMonthOptions(
                      isShowMonthOptions => !isShowMonthOptions
                    )
                  }
                >
                  <ArrowDown />
                  <CurrentState>{monthSeleteValue}월</CurrentState>
                  <SelectOptions show={isShowMonthOptions}>
                    {monthOptions}
                  </SelectOptions>
                </SelectBox>
              </AcquisitionMonth>
              <AcquisitionDay>
                <SelectBox
                  onClick={() =>
                    setShowDayOptions(isShowDayOptions => !isShowDayOptions)
                  }
                >
                  <CurrentState>{daySeleteValue}일</CurrentState>
                  <SelectOptions show={isShowDayOptions}>
                    <Option onClick={handleDayChange}>
                      {getDaysInMonth(
                        new Date().getFullYear(),
                        parseInt(monthSeleteValue) - 1
                      ).map(day => (
                        <Option key={day} value={day}>
                          {day}
                        </Option>
                      ))}
                    </Option>
                  </SelectOptions>
                </SelectBox>
              </AcquisitionDay>
            </TypeBox>
          </AcquisitionContainer>
          <TypeBox>
            <TypeTitle>협력업체</TypeTitle>
            <PartnerCompany>
              <SelectBox
                onClick={() =>
                  setShowPartnerOptions(
                    isShowPartnerOptions => !isShowPartnerOptions
                  )
                }
              >
                <CurrentState>{partnerSeleteValue}</CurrentState>

                <SelectOptions show={isShowPartnerOptions} height="true">
                  <Option onClick={handleOnChangePartnerSelectValue}>
                    협력
                  </Option>
                  <Option onClick={handleOnChangePartnerSelectValue}>
                    업체
                  </Option>
                  <Option onClick={handleOnChangePartnerSelectValue}>
                    등록
                  </Option>
                </SelectOptions>
              </SelectBox>
            </PartnerCompany>
          </TypeBox>

          <TypeBox>
            <TypeTitle>사용자</TypeTitle>
            <DepName>
              <SelectBox
                onClick={() =>
                  setShowDepOptions(isShowDepOptions => !isShowDepOptions)
                }
              >
                <CurrentState>{depSeleteValue}</CurrentState>
                <SelectOptions show={isShowDepOptions} height="true">
                  <Option onClick={handleOnChangeDepSelectValue}>비품</Option>
                  <Option onClick={handleOnChangeDepSelectValue}>종류</Option>
                  <Option onClick={handleOnChangeDepSelectValue}>선택</Option>
                </SelectOptions>
              </SelectBox>
            </DepName>
            <UserName>
              <SelectBox
                onClick={() =>
                  setShowNameOptions(isShowNameOptions => !isShowNameOptions)
                }
              >
                <CurrentState>{nameSeleteValue}</CurrentState>
                <SelectOptions show={isShowNameOptions} height="true">
                  <Option onClick={handleOnChangeNameSelectValue}>
                    부서에
                  </Option>
                  <Option onClick={handleOnChangeNameSelectValue}>있는</Option>
                  <Option onClick={handleOnChangeNameSelectValue}>
                    사우명?
                  </Option>
                </SelectOptions>
              </SelectBox>
            </UserName>
          </TypeBox>
        </EquipmentContainer>

        <ImageContainer>
          <ImageBox>사진 첨부</ImageBox>
          {preview && <Image src={preview} alt="preview" />}
          <RegiinputFile
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
  );
}

const RegiinputFile = styled.div`
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
  width: 4.875rem;
  height: 2.5rem;
`;
const Option = styled.ul`
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #d0e4ff;
  }
`;

const SelectOptions = styled.ul`
  position: absolute;
  top: 2.1875rem;
  left: 0;
  width: 100%;
  overflow-y: auto;

  ${props =>
    props.height === 'true'
      ? css`
           max-height: ${props => (props.show ? 'none' : '0')};
          height: 6.1819rem;
          }
        `
      : css`
          max-height: ${props => (props.show ? 'none' : '0')};
          height: 8.2425rem;
        `}
  padding: 0;
  border-radius: 0.5rem;
  background-color: #f6faff;
  z-index: 30;
`;

const CurrentState = styled.label`
  margin-left: 0.25rem;
  text-align: center;
`;

const SelectBox = styled.div`
  position: relative;
  border-radius: 0.375rem;
  border: 0.0625rem solid;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  padding: 8px;
  svg {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
  ${props => props.theme.FlexCenter};
  ${props =>
    props.eqtype === 'true'
      ? css`
          width: 14.125rem;
          color: ${props => props.theme.color.blue.brandColor6};
          background-color: ${props.theme.color.blue.brandColor1};
          border-color: ${props => props.theme.color.blue.brandColor6};
          &::before {
            color: ${props => props.theme.color.blue.brandColor6};
          }
        `
      : css`
          width: 100%;
          color: ${props => props.theme.color.grey.brandColor7};
          background-color: ${props.theme.color.grey.brandColor1};
          border-color: ${props => props.theme.color.grey.brandColor3};
        `}

  height: 2.5rem;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 3.5rem;
  display: flex;
  justify-content: center;
  width: 77.5%;

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

const ImageBox = styled.p`
  margin-top: 0;
  width: 4.1875rem;
  height: 1.3125rem;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.3125rem;
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
  margin: 7.25rem 11rem 12rem 176px;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  ${props => props.theme.wh100};
  display: flex;
  overflow: hidden;
  position: relative;
`;
