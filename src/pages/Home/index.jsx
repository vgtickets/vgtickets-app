import React, { useState } from "react";
import Logo from "../../images/vgofficialtickets-removebg-preview.png";
import ImageContent from "../../images/undraw_futuristic_interface_re_0cm6.svg";
import LoginModal from "../../components/LoginModal";
import HamburgerMenu from "../../components/HamburgerMenu";

function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <header>
        <HamburgerMenu onLoginClick={openLoginModal} />
        <div className="logo">
          <img src={Logo} alt="logo do sistema" />
        </div>
        <div className="actions">
          <ul>
            <li>Sobre nós</li>
            <li>Porque nossa solução é melhor?</li>
            <li className="button" onClick={openLoginModal}>
              Login
            </li>
          </ul>
        </div>
      </header>
      <main>
        <div className="container">
          <img src={ImageContent} alt="image content" />
        </div>
        <div className="content">
          <h1>
            O <span className="best">melhor</span> gerenciamento de tickets do
            mercado
          </h1>
          <div className="buttons">
            <button className="lead-more">Saiba mais</button>
            <button className="login" onClick={openLoginModal}>
              Entre
            </button>
          </div>
        </div>
        <div className="clip-path"></div>
      </main>
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </>
  );
}

export default HomePage;
