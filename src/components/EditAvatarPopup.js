import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose }) {
    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
        >
            <label className="form__field">
                <input type="url" className="form__item form__item_content_avatar-link" name="avatar" placeholder="Ссылка на аватар" required minLength="7" />
                <span className="form__error form__error_field_avatar-link"></span>
            </label>
        </PopupWithForm>)
}

export default EditAvatarPopup;