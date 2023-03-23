import styled, { css } from 'styled-components';
import SelectCategory from '../../common/SelectCategory';

export default function SelectDate({ year, month, setSelect, handleChange }) {
  return (
    <AcquisitionContainer>
      <TypeBox>
        <TypeTitle>취득일자</TypeTitle>
        <AcquisitionYear>
          <SelectCategory
            category={setSelect[0]()}
            optionNullName="년"
            onChangeCategory={handleChange[0]}
          />
        </AcquisitionYear>
        <AcquisitionMonth>
          <SelectCategory
            category={setSelect[1]()}
            optionNullName="월"
            onChangeCategory={handleChange[1]}
          />
        </AcquisitionMonth>
        <AcquisitionDay>
          <SelectCategory
            category={year && month && setSelect[2](year, month)}
            optionNullName="일"
            onChangeCategory={handleChange[2]}
          />
        </AcquisitionDay>
      </TypeBox>
    </AcquisitionContainer>
  );
}

const AcquisitionContainer = styled.div`
  height: 2.5rem;
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
