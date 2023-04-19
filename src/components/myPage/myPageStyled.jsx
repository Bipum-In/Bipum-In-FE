import styled from 'styled-components';
import { styles } from 'components/common/commonStyled';
import Input from 'elements/Input';
import { ReactComponent as ClearIcon } from 'styles/commonIcon/cancelInput.svg';

const MypageInput = styled(Input)`
  width: fit-content;
  height: 2.5rem;
  background: ${props => props.theme.color.grey.brandColor1};
  border-radius: 0.5rem;
`;
const ClearInputBtn = styled(ClearIcon)`
  position: absolute;
  right: 1rem;
  cursor: pointer;
  transition: opacity 0.1s ease-in;
  opacity: 0;
`;

const MyTypeTitle = styled(styles.TypeTitle)`
  width: 4.375rem;
  margin-right: 2rem;
  font-weight: 600;
  color: ${props => props.theme.color.blue.brandColor6};
`;

const MyinfoSpan = styled.span`
  width: 11rem;
`;

const myPageStyled = {
  MypageInput,
  ClearInputBtn,
  MyTypeTitle,
  MyinfoSpan,
};

export default myPageStyled;
