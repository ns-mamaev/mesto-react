import PopupWithForm from './PopupWithForm';

const RemoveCardPopup = ({ isOpen, onClose, onSubmit }) => {
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      defaultButtonText="Да"
      onSubmit={onSubmit}
      isFormNotValid={false}
    />
  );
};

export default RemoveCardPopup;
