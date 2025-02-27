import { useState, useEffect } from "react";

export default function NewCard({ onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  // Função para lidar com mudanças no campo de título
  function handleNameChange(evt) {
    setName(evt.target.value);
    // Validação do input do nome do local
    if (evt.target.validity.valid) {
      setNameError("");
    } else {
      setNameError(evt.target.validationMessage);
    }
  }

  // Função para lidar com mudanças no campo de link
  function handleLinkChange(evt) {
    setLink(evt.target.value);
    // Validação do input do link do local
    if (evt.target.validity.valid) {
      setLinkError("");
    } else {
      setLinkError(evt.target.validationMessage);
    }
  }

  // Verificação se o formulário é válido
  const isFormValid = name && link && !nameError && !linkError;

  // Função para gerenciar o estado de submissão
  function handleSubmitState(isSubmitting) {
    setIsSubmitting(isSubmitting);
  }

  // Função para lidar com o envio do formulário
  function handleSubmit(evt) {
    evt.preventDefault();

    // Atualiza o estado para "salvando"
    handleSubmitState(true);

    // Chama a função passada via props para adicionar o novo local
    onAddPlace({
      name,
      link,
    });
  }

  // Função para resetar o formulário após o fechamento do popup
  function resetForm() {
    setName("");
    setLink("");
    setNameError("");
    setLinkError("");
    setIsSubmitting(false);
  }

  // Reseta o form
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  return (
    <form
      className="popup__form"
      name="add-popup"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          name="name"
          id="popup__input-title"
          className="popup__input"
          type="text"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span
          id="popup__input-title-error"
          className={`popup__input-error ${
            !nameError ? "popup__input-error_hidden" : ""
          }`}
        >
          {nameError}
        </span>
      </div>
      <div className="popup__input-wrapper">
        <input
          name="link"
          id="popup__input-link"
          className="popup__input popup__input_margin-large"
          type="url"
          placeholder="Link da imagem"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span
          id="popup__input-link-error"
          className={`popup__input-error popup__input-error_positioned-top ${
            !linkError ? "popup__input-error_hidden" : ""
          }`}
        >
          {linkError}
        </span>
      </div>
      <button
        id="popup__save-add-button"
        type="submit"
        className={`popup__save-button ${
          isSubmitting || !isFormValid ? "popup__save-button_disabled" : ""
        }`}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Criar"}
      </button>
    </form>
  );
}
