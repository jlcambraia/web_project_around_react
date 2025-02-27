import { useState, useEffect } from "react";

export default function NewCard({ onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para lidar com mudanças no campo de título
  function handleNameChange(e) {
    setName(e.target.value);
  }

  // Função para lidar com mudanças no campo de link
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  // Função para gerenciar o estado de submissão
  function handleSubmitState(isSubmitting) {
    setIsSubmitting(isSubmitting);
  }

  // Função para lidar com o envio do formulário
  function handleSubmit(e) {
    e.preventDefault();

    // Atualiza o estado para "salvando"
    handleSubmitState(true);

    // Chama a função passada via props para adicionar o novo local
    onAddPlace({
      name,
      link,
    });
  }

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
          className="popup__input-error"
        ></span>
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
          className="popup__input-error popup__input-error_positioned-top"
        ></span>
      </div>
      <button
        id="popup__save-add-button"
        type="submit"
        className={`popup__save-button ${
          isSubmitting ? "popup__save-button_disabled" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Criar"}
      </button>
    </form>
  );
}
