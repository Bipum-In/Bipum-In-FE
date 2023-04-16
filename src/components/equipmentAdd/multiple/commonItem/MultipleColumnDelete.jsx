import styled from 'styled-components';
import Button from 'elements/Button';

import { ReactComponent as MinusRound } from 'styles/commonIcon/minusRound.svg';

export default function MultipleColumnDelete({ index, onDeleteRow }) {
  return (
    <>
      <DeleteCoulmnBtn
        onClick={() => {
          onDeleteRow(index);
        }}
      >
        <MinusRound />
      </DeleteCoulmnBtn>
    </>
  );
}

const DeleteCoulmnBtn = styled(Button)`
  margin: 0;
  padding: 0;
  opacity: 1;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
