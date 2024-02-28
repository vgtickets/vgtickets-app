// LoginModal.js

import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import LogoLogin from "../images/vgofficialtickets-removebg-preview.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const auth = getAuth(); 
    try {
      await signInWithEmailAndPassword(auth, email, password); 
      onClose(); 
      navigate("/dashboard"); 
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="align">
          <div>
          <div className="logo">
            <img src={LogoLogin} alt="logo do sistema" />
          </div>
          <div className="texts">
            <span>
              Descubra como o VG Tickets pode transformar a forma como você
              gerencia o suporte e a comunicação da sua equipe!
            </span>
            {error && <div className="error">{error}</div>} {/* Renderiza o erro aqui */}
          </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
