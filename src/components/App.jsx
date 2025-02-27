import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Loading from "./Loading/Loading";
import { api } from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import DeleteConfirmationPopup from "./Main/components/Popup/componentes/DeleteConfirmationPopup/DeleteConfirmationPopup";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  // Hook useEffect que chama a função getUserInfo
  useEffect(() => {
    getUserInfo();
  }, []);

  // Hook useEffect que chama a função getCardsFromApi
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
        setError(err); // Define o erro
        setIsLoading(false);
      });
  }

  // Função getCardsFromApi, que retorna os Cards solicitados na Api e atualiza setCards
  function getCardsFromApi() {
    api
      .getCardsInfo()
      .then((cards) => setCards(cards))
      .catch((err) => {
        setError(err); // Define o erro
      });
  }

  // Atualiza os dados do usuário
  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserInfo(data.name, data.about)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((err) => {
          setError(err); // Define o erro
        });
    })();
  };

  // Atualiza o avatar do usuário
  const handleUpdateAvatar = (data) => {
    (async () => {
      await api
        .changeProfileImage(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((err) => {
          setError(err); // Define o erro
        });
    })();
  };

  // Função que atualiza o estado de curtida do card ao clicar no botão like
  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .updateLikeState(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        setError(err); // Define o erro
      });
  }

  // Função para abrir o popup de confirmação de exclusão
  const handleOpenDeletePopup = (card) => {
    setCardToDelete(card); // Armazena o card selecionado para exclusão
    setIsDeletePopupOpen(true);
  };

  // Função para fechar o popup de confirmação de exclusão
  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setCardToDelete(null); // Limpa o card selecionado
  };

  // Função que remove o card ao clicar no botão excluir
  async function handleConfirmDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((err) => {
        setError(err); // Define o erro
      })
      .finally(() => handleCloseDeletePopup());
  }

  // Função para adicionar um novo card
  async function handleAddPlaceSubmit(cardData) {
    await api
      .addNewCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => {
        setError(err); // Define o erro
      });
  }

  // Função para abrir os popups
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  // Função para fechar os popups
  function handleClosePopup() {
    setPopup(null);
    setError(null);
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
              onDeleteCard={handleOpenDeletePopup}
              onAddPlace={handleAddPlaceSubmit}
              onOpenPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
              popup={popup}
              err={error} // Passa o erro para o Main
            />
            <Footer />
          </div>
        </div>
        {isDeletePopupOpen && (
          <DeleteConfirmationPopup
            onClose={handleCloseDeletePopup}
            onConfirm={() => handleConfirmDelete(cardToDelete)}
          />
        )}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
