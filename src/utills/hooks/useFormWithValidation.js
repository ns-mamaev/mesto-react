import { useEffect, useState } from 'react';
import { transormToObject } from 'utills/ulils';

const useFormWithValidation = (inputNames) => {
  const [values, setValues] = useState(transormToObject(inputNames, ''));
  const [isErrors, setIsErrors] = useState(transormToObject(inputNames, false));
  const [errorMessages, setErrorMessages] = useState(transormToObject(inputNames, ''));
  const [isFormNotValid, setIsFormNotValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    const hasErrors = !isTouched || Object.values(isErrors).includes(true);
    setIsFormNotValid(hasErrors);
  }, [isErrors]);

  const onChange = (e) => {
    setIsTouched(true);
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    setIsErrors((isErrors) => ({ ...isErrors, [e.target.name]: !e.target.validity.valid }));
    if (!e.target.validity.valid) {
      setErrorMessages({ ...errorMessages, [e.target.name]: e.target.validationMessage });
    } else {
      setErrorMessages({ ...errorMessages, [e.target.name]: '' });
    }
  };

  const resetForm = () => {
    setValues(transormToObject(inputNames, ''));
    setIsErrors(transormToObject(inputNames, false));
    setErrorMessages(transormToObject(inputNames, ''));
    setIsFormNotValid(true);
    setIsTouched(false);
  };

  return {
    values,
    isErrors,
    setIsErrors,
    errorMessages,
    isFormNotValid,
    setValues,
    onChange,
    resetForm,
  };
};

export default useFormWithValidation;
