import styled from 'styled-components';
import SelectCategory from '../../common/SelectCategory';

export default function SelectDate({ year, month, setSelect, handleChange }) {
  return (
    <>
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
    </>
  );
}

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
