// App.jsx (modificado)
import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Loading from "./Loading/Loading";
import { api } from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  // Hook useState para definição do usuário atual
  const [currentUser, setCurrentUser] = useState(null);

  // Hook useState para definição dos cards que serão carregados da api (movido do Main)
  const [cards, setCards] = useState([]);

  // Hook useState para definição se a página foi carregada ou não
  const [isLoading, setIsLoading] = useState(true);

  // Hook useState para definição do estado atual dos popups, que estão fechados
  const [popup, setPopup] = useState(null);

  // Hook useEffect que chama a função getUserInfo
  useEffect(() => {
    getUserInfo();
  }, []);

  // Hook useEffect que chama a função getCardsFromApi (movido do Main)
  useEffect(() => {
    getCardsFromApi();
  }, []);

  // Função getUserInfo, que retorna os dados do usuário solicitados na Api e atualiza setCurrentUser
  function getUserInfo() {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro", err);
        setIsLoading(false);
      });
  }

  // Função getCardsFromApi, que retorna os Cards solicitados na Api e atualiza setCards (movido do Main)
  function getCardsFromApi() {
    api
      .getCardsInfo()
      .then((cards) => setCards(cards))
      .catch((err) => console.error("Erro:", err));
  }

  // Atualiza os dados do usuário
  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data.name, data.about).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  // Atualiza o avatar do usuário
  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.changeProfileImage(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  // Função que atualiza o estado de curtida do card ao clicar no botão like (movido do Main)
  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.isLiked;

    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    await api
      .updateLikeState(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  // Função que remove o card ao clicar no botão excluir (movido do Main)
  async function handleDeleteCard(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        // Atualiza setCard removendo o cartão excluído
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  // Função para adicionar um novo card
  async function handleAddPlaceSubmit(cardData) {
    await api
      .addNewCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  // Função para abrir os popups
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  // Função para fechar os popups
  function handleClosePopup() {
    setPopup(null);
  }

  // Enquanto estiver carregando, exibe essa mensagem na página
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <div className="body">
          <div className="page">
            <Header />
            <Main
              cards={cards}
              onCardLike={handleCardLike}
              onDeleteCard={handleDeleteCard}
              onAddPlace={handleAddPlaceSubmit}
              onOpenPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
              popup={popup}
            />
            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
