import { useEffect, useState } from 'react';
import { transormToObject } from 'utills/ulils';

const useFormWithValidation = (inputNames) => {
  const [values, setValues] = useState(transormToObject(inputNames, ''));
  const [isErrors, setIsErrors] = useState(transormToObject(inputNames, false));
  const [errorMessages, setErrorMessages] = useState(transormToObject(inputNames, ''));
  const [isFormNotValid, setIsFormNotValid] = useState(false);

  useEffect(() => {
    const hasErrors = Object.values(isErrors).includes(true);
    setIsFormNotValid(hasErrors);
  }, [isErrors]);

  const onChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    setIsErrors((isErrors) => ({ ...isErrors, [e.target.name]: !e.target.validity.valid }));
    if (!e.target.validity.valid) {
      setErrorMessages({ ...errorMessages, [e.target.name]: e.target.validationMessage });
    } else {
      setErrorMessages({ ...errorMessages, [e.target.name]: '' });
    }
  };

  return {
    values,
    isErrors,
    errorMessages,
    isFormNotValid,
    setValues,
    onChange,
  };
};

export default useFormWithValidation;
