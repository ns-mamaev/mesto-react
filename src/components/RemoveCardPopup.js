import PopupWithForm from './PopupWithForm';

const RemoveCardPopup = ({ isOpen, onClose, onConfirmRemove }) => {
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      defaultButtonText="Да"
      onSubmit={onConfirmRemove}
      isFormNotValid={false}
    />
  );
};

export default RemoveCardPopup;
