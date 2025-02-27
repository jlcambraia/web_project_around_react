import { useState } from "react";

export default function NewCard({ onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // Função para lidar com mudanças no campo de título
  function handleNameChange(e) {
    setName(e.target.value);
    // Validação do nome
  }

  // Função para lidar com mudanças no campo de link
  function handleLinkChange(e) {
    setLink(e.target.value);
    // Validação do link
  }

  // Função para lidar com o envio do formulário
  function handleSubmit(e) {
    e.preventDefault();

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
        <span id="popup__input-title-error"></span>
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
        <span id="popup__input-link-error"></span>
      </div>
      <button
        id="popup__save-add-button"
        type="submit"
        className="popup__save-button"
      >
        Criar
      </button>
    </form>
  );
}
