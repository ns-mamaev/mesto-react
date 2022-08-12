import { useEffect, useState } from 'react';

const useFormWithValidation = () => {
  const [values, setValues] = useState({ name: '', about: '' });
  const [isErrors, setIsErrors] = useState({ name: false, about: false });
  const [errorMessages, setErrorMessages] = useState({ name: '', about: '' });
  const [isFormNotValid, setIsFormNotValid] = useState(false);

  useEffect(() => {
    setIsFormNotValid(isErrors.name || isErrors.about);
  }, [isErrors.name, isErrors.about]);

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
