import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { api } from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Criado pois a página estava quebrando por não conseguir carregar as informações do usuário antes da renderização

  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro", err); //  // Quando popup de erro estiver configurado, colocar aqui
        setIsLoading(false);
      });
  }

  // Enquanto estiver carregando, exibe essa mensagem na página
  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
          <div className="page">
            <Header />
            <Main />
            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
