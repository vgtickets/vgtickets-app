/* eslint-disable jsx-a11y/alt-text */
import Logo from "../../images/vgofficialtickets-removebg-preview.png";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import "./Chat.css";
import { firebaseConfig } from "../../plugins/firebase";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [nameInput, setNameInput] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, "chats"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setChats(Object.entries(data));
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      push(ref(db, `chats/${selectedChat}/messages`), {
        name: name,
        message: message,
        date: new Date().toISOString(),
      });
      setMessage("");
    }
  };

  const saveName = () => {
    if (nameInput.trim() !== "") {
      setName(nameInput);
      localStorage.setItem("name", nameInput);
      setNameInput("");
    }
  };

  const disconnect = () => {
    const confirmDisconnect = window.confirm("Você tem certeza que quer sair?");
    if (confirmDisconnect) {
      localStorage.removeItem("name");
      setName("");
    }
  };

  const selectChat = (chatId, chatName) => {
    setSelectedChat(chatId);
    loadMessages(chatId);
  };

  const loadMessages = (chatId) => {
    onValue(ref(db, `chats/${chatId}/messages`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
        setTimeout(() => {
          // Scroll to bottom
          window.scrollTo(0, document.body.scrollHeight);
        }, 0);
      }
    });
  };

  const unreadMessagesCount = (chatId) => {
    return messages.filter((message) => message.name !== name && !message.read)
      .length;
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="menu-header">
          <img src={Logo} className="logo-chat" />
          <div className="menu-actions">
            {/* Remove o ícone de anexo */}
          </div>
        </div>
        <div className="menu-title">Conversas</div>
        <ul className="chat-list">
          {chats.map(([chatId, chatData], index) => (
            <li
              key={index}
              className="chat-item"
              onClick={() => selectChat(chatId, chatData.name)}
            >
              <div className="chat-name">{chatData.name}</div>
              {unreadMessagesCount(chatId) > 0 && (
                <div className="chat-counter">{unreadMessagesCount(chatId)}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>VGTickets</h1>
          <button onClick={disconnect}>Sair</button>
        </div>
        <div className="chat-container">
          {selectedChat ? (
            <div className="chat">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.name === name ? 'sent' : 'received'}`}
                >
                  <div className="message-bubble">
                    <p>{message.message}</p>
                    <p className="message-date">{message.date}</p>
                  </div>
                  <p className="message-sender">{message.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-chat-selected">
              <p>Selecione ou crie um chat para começar.</p>
            </div>
          )}
        </div>
        <div className="message-input">
          {!selectedChat ? (
            <div className="name-input">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                type="text"
                placeholder="Digite seu nome..."
              />
              <button onClick={saveName}>Salvar</button>
            </div>
          ) : (
            <div className="chat-input">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                type="text"
                placeholder="Digite uma mensagem..."
              />
              <button onClick={sendMessage}>Enviar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
