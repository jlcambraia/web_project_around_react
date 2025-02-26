import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { api } from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => console.error("Erro", err)); // Quando popup de erro estiver configurado, colocar aqui;
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
