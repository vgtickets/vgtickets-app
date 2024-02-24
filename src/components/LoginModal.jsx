import { AiOutlineClose } from "react-icons/ai";
import LogoLogin from "../images/vgofficialtickets-removebg-preview.png";

function LoginModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="align">
          <div className="texts">
            <div className="logo">
              <img src={LogoLogin} alt="logo do sistema" />
            </div>
            <span>
              Descubra como o VG Tickets pode transformar a forma como você
              gerencia o suporte e a comunicação da sua equipe!
            </span>
          </div>
          <button className="close-button" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
        <form>
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Digite seu E-mail ou nome de usuario"
          />

          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <div className="button-group">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
