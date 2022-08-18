import { useEffect, useState } from 'react';
import { transormToObject } from 'utills/ulils';

const useFormWithValidation = (inputNames) => {
  const [values, setValues] = useState(transormToObject(inputNames, ''));
  const [isErrors, setIsErrors] = useState(transormToObject(inputNames, false));
  const [errorMessages, setErrorMessages] = useState(transormToObject(inputNames, ''));
  const [isFormNotValid, setIsFormNotValid] = useState(true);
  const [isTouched, setIsTouched] = useState(transormToObject(inputNames, false));

  useEffect(() => {
    const hasErrors = Object.values(isTouched).includes(false) || Object.values(isErrors).includes(true);
    setIsFormNotValid(hasErrors);
  }, [isErrors]);

  const onChange = (e) => {
    setIsTouched((isTouched) => ({ ...isTouched, [e.target.name]: true }));
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    setIsErrors((isErrors) => ({ ...isErrors, [e.target.name]: !e.target.validity.valid }));
    if (!e.target.validity.valid) {
      setErrorMessages({ ...errorMessages, [e.target.name]: e.target.validationMessage });
    } else {
      setErrorMessages({ ...errorMessages, [e.target.name]: '' });
    }
  };

  const resetValidation = () => {
    setIsErrors(transormToObject(inputNames, false));
    setErrorMessages(transormToObject(inputNames, ''));
    setIsFormNotValid(true);
    setIsTouched(transormToObject(inputNames, false));
  };

  return {
    values,
    isErrors,
    setIsErrors,
    errorMessages,
    isFormNotValid,
    setValues,
    onChange,
    resetValidation,
  };
};

export default useFormWithValidation;
