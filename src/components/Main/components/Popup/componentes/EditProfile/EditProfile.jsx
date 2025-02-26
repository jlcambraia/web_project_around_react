import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  // Cria a constante currentUser, que faz o useContext do usuário
  const userContext = useContext(CurrentUserContext); // Obtém o objeto de usuário atual
  const { currentUser, handleUpdateUser } = userContext;

  // Hook useState para definição do nome do usuário atual
  const [name, setName] = useState(currentUser.name);
  // Hook useState para definição do about do usuário atual
  const [description, setDescription] = useState(currentUser.about);

  // Função que atualiza o name quando o input for utilizado
  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  // Função que atualiza o about quando o input for utilizado
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  // Função que atualiza os dados do usuário ao clicar no botão Salvar
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    handleUpdateUser({ name, about: description }); // Atualiza as informações do usuário
  };

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
          minlenght="2"
          maxlenght="40"
          required
        />
        <span
          id="popup__input-name-error"
          className="popup__input-error popup__input-error_hidden"
        ></span>
      </div>
      <div className="popup__input-wrapper">
        <input
          value={description}
          onChange={handleDescriptionChange}
          name="about"
          id="popup__input-about"
          className="popup__input popup__input_margin-large"
          type="text"
          placeholder="Sobre mim"
          minlenght="2"
          maxlenght="200"
          required
        />
        <span
          id="popup__input-about-error"
          className="popup__input-error popup__input-error_positioned-top popup__input-error_hidden"
        ></span>
      </div>
      <button
        id="popup__save-edit-button"
        type="submit"
        className="popup__save-button"
      >
        Salvar
      </button>
    </form>
  );
}
