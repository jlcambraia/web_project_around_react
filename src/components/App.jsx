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

  // Hook useState para definição se a página foi carregada ou não
  const [isLoading, setIsLoading] = useState(true); // Criado pois a página estava quebrando por não conseguir carregar as informações do usuário antes da renderização

  // Hook useState para definição do estado atual dos popups, que estão fechados
  const [popup, setPopup] = useState(null);

  // Hook useEffect que chama a função getUserInfo
  useEffect(() => {
    getUserInfo();
  }, []);

  // Função getUserInfo, que retorna os dados do usuário solicitados na Api e atualiza setCurrentUser
  function getUserInfo() {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo); // Atualiza os dados do usuário
        setIsLoading(false); // Muda o useState do isLoading para false, para renderização da página
      })
      .catch((err) => {
        console.error("Erro", err); //  // Quando popup de erro estiver configurado, colocar aqui
        setIsLoading(false); // Muda o useStante do isLoading para false, mesmo se der erro
      });
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
        handleClosePopup(); // Fecha o popup após a atualização
      });
    })();
  };

  // Função para abrir os popups
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  // Função para fechar os popups
  function handleClosePopup() {
    setPopup(null);
  }

  // Enquanto estiver carregando, exibe essa mensagem na página (melhorar estilização do loading)
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
