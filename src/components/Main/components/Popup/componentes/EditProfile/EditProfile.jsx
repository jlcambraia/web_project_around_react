import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");

  // Função que atualiza o name quando o input for utilizado
  function handleNameChange(evt) {
    setName(evt.target.value);
    // Validação do input do nome
    if (evt.target.validity.valid) {
      setNameError("");
    } else {
      setNameError(evt.target.validationMessage);
    }
  }

  // Função que atualiza o about quando o input for utilizado
  function handleAboutChange(evt) {
    setAbout(evt.target.value);
    // Validação do input do about
    if (evt.target.validity.valid) {
      setAboutError("");
    } else {
      setAboutError(evt.target.validationMessage);
    }
  }

  // Verificação se o formulário é válido
  const isFormValid = name && about && !nameError && !aboutError;

  // Função para gerenciar o estado de submissão
  function handleSubmitState(isSubmitting) {
    setIsSubmitting(isSubmitting);
  }

  // Função que atualiza os dados do usuário ao clicar no botão Salvar
  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Atualiza o estado para "salvando"
    handleSubmitState(true);

    handleUpdateUser({ name, about }); // Atualiza as informações do usuário
  };

  // Função para resetar o formulário após o fechamento do popup
  function resetForm() {
    setNameError("");
    setAboutError("");
    setIsSubmitting(false);
  }

  // Cria uma função personalizada de fechamento que chama o resetForm
  function handleClose() {
    resetForm();
    onClose();
  }

  // Detecta quando o popup é fechado para resetar o formulário
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  return (
    <form
      className="popup__form"
      name="edit-popup"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          value={name}
          onChange={handleNameChange}
          name="name"
          id="popup__input-name"
          className="popup__input"
          type="text"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          required
        />
        <span
          id="popup__input-name-error"
          className={`popup__input-error ${
            !nameError ? "popup__input-error_hidden" : ""
          }`}
        >
          {nameError}
        </span>
      </div>
      <div className="popup__input-wrapper">
        <input
          value={about}
          onChange={handleAboutChange}
          name="about"
          id="popup__input-about"
          className="popup__input popup__input_margin-large"
          type="text"
          placeholder="Sobre mim"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          id="popup__input-about-error"
          className={`popup__input-error popup__input-error_positioned-top ${
            !aboutError ? "popup__input-error_hidden" : ""
          }`}
        >
          {aboutError}
        </span>
      </div>
      <button
        id="popup__save-edit-button"
        type="submit"
        className={`popup__save-button ${
          isSubmitting || !isFormValid ? "popup__save-button_disabled" : ""
        }`}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
