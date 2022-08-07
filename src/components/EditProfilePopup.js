import { CurrentUserContext } from "contexts/CurrentUserContext";
import React, { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [values, setValues] = useState({ name: '', about: '' });
    React.useEffect(() => {
        setValues({
            name: currentUser.name,
            about: currentUser.about
        })
    }, [currentUser]);

    const onChange = (e) => {
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(values)
    };

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input
                    type="text"
                    className="form__item form__item_content_profile-name"
                    name="name"
                    placeholder="Введите ваше имя"
                    required
                    minLength="2"
                    maxLength="40"
                    value={values.name}
                    onChange={onChange}
                />
                <span className="form__error form__error_field_profile-name"></span>
            </label>
            <label className="form__field">
                <input
                    type="text"
                    className="form__item form__item_content_profile-about"
                    name="about"
                    placeholder="Ваш род деятельности?"
                    required
                    minLength="2"
                    maxLength="200"
                    value={values.about}
                    onChange={onChange}
                />
                <span className="form__error form__error_field_profile-about"></span>
            </label>
        </PopupWithForm>)
}

export default EditProfilePopup;