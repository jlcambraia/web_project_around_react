import profilePlaceholder from "../../images/profile__placeholder.png";
import profileIcon from "../../images/profile__icon.png";
import editIcon from "../../images/edit__icon.svg";
import addIcon from "../../images/add__icon.svg";

export default function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-container">
          <img
            src={profilePlaceholder}
            alt="Placeholder para Foto de Perfil do Usuário"
            className="profile__picture"
          />
          <img
            src={profileIcon}
            alt="Ícone de Editar para o Perfil do Usuário"
            className="profile__icon"
          />
        </div>

        <div className="profile__user-info">
          <div className="profile__user-container">
            <h1 className="profile__user-name">Jacques Cousteau</h1>
            <button className="profile__edit-button">
              <img
                src={editIcon}
                alt="Ícone de Editar Perfil"
                className="profile__edit-button-icon"
              />
            </button>
          </div>

          <p className="profile__user-about">Explorador</p>
        </div>
        <button className="profile__add-button">
          <img
            src={addIcon}
            alt="Ícone de Adicionar Foto"
            className="profile__add-button-icon"
          />
        </button>
      </section>
      <section className="grid">
        <div className="grid__without-cards">
          <p className="grid__without-cards-text">Ainda não há cartões</p>
        </div>

        <div className="grid__card-container"></div>
      </section>
    </main>
  );
}
