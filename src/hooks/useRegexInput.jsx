import { useState, useCallback, useEffect } from 'react';

const useRegexInput = (reject, success, Reg, samePw = null) => {
  const [input, setInput] = useState('');
  const [alert, setAlert] = useState('');
  const [checkReg, setCheckReg] = useState(false);

  const checkSamePw = useCallback(
    e => {
      setInput(e.target.value);
      if (e.target.value === samePw && e.target.value !== '') {
        setAlert(success);
        setCheckReg(true);
      } else if (e.target.value === '' || samePw === '') {
        setAlert('');
        setCheckReg(false);
      } else {
        setAlert(reject);
        setCheckReg(false);
      }
    },
    [samePw, reject, success]
  );

  const setInputHandler = useCallback(
    e => {
      const { value } = e.target;
      setInput(value);
      if (!Reg.test(e.target.value)) {
        setAlert(e.target.value === '' ? '' : reject);
        setCheckReg(false);
      } else {
        setAlert(success);
        setCheckReg(true);
      }
    },
    [Reg, reject, success]
  );

  const reset = () => {
    setInput('');
  };

  useEffect(() => {
    if (samePw !== null) {
      checkSamePw({ target: { value: input } });
    }
  }, [samePw, input, checkSamePw]);

  return [input, setInputHandler, alert, checkReg, checkSamePw, reset];
};

export default useRegexInput;
