import { useEffect, useState } from "react";

function HamburgerMenu({ onLoginClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsVisible(window.innerWidth <= 1350);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    isVisible && (
      <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>

        <ul className="menu__box">
          <li>Sobre nós</li>
          <li>Porque nossa solução é melhor?</li>
          <li onClick={onLoginClick}>Login</li>
        </ul>
      </div>
    )
  );
}

export default HamburgerMenu;
