import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyABamgwXR0bk1sfaMfE15jqffTRMZO9JOo",
  authDomain: "chat-a6262.firebaseapp.com",
  projectId: "chat-a6262",
  storageBucket: "chat-a6262.appspot.com",
  messagingSenderId: "917701251714",
  appId: "1:917701251714:web:799399c64498f5eb9f5a9b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [nameInput, setNameInput] = useState('');
  const [selectedChat, setSelectedChat] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, 'chats'), snapshot => {
      const data = snapshot.val();
      if (data) {
        setChats(Object.keys(data));
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      push(ref(db, `chats/${selectedChat}/messages`), {
        name: name,
        message: message,
        date: new Date().toISOString()
      });
      setMessage('');
    }
  };

  const saveName = () => {
    if (nameInput.trim() !== '') {
      setName(nameInput);
      localStorage.setItem('name', nameInput);
      setNameInput('');
    }
  };

  const disconnect = () => {
    const confirmDisconnect = window.confirm('Você tem certeza que quer sair?');
    if (confirmDisconnect) {
      localStorage.removeItem('name');
      setName('');
    }
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
    loadMessages(chat);
  };

  const loadMessages = (chat) => {
    onValue(ref(db, `chats/${chat}/messages`), snapshot => {
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

  const messageClass = (message) => {
    return message.name === name ? 'sent' : 'received';
  };

  const unreadMessagesCount = (chat) => {
    return messages.filter(message => message.name !== name && !message.read).length;
  };

  return (
    <div className="h-screen flex">
      {/* Barra lateral */}
      <div className="bg-gray-900 w-64 px-4 py-6 flex flex-col">
        <h2 className="text-white text-lg font-bold mb-4">VGTickets</h2>
        <ul className="space-y-2">
          {chats.map((chat, index) => (
            <li key={index}>
              <button onClick={() => selectChat(chat)} className="text-gray-200 flex items-center relative">
                <span className="mr-2">{chat}</span>
                {unreadMessagesCount(chat) > 0 &&
                  <span className="bg-red-500 text-white text-xs py-1 px-2 rounded-full absolute -top-1 right-0">{unreadMessagesCount(chat)}</span>
                }
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Conteúdo principal */}
      <div className="flex-1 bg-gray-100 flex flex-col">
        {/* Cabeçalho */}
        <div className="bg-gray-800 px-6 py-3 flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">VGTickets</h1>
          <button onClick={disconnect} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Conteúdo do chat */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedChat ? (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`message ${messageClass(message)}`}>
                  <div className="bg-white rounded-lg p-3 shadow-md">
                    <p className="text-gray-800">{message.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.date}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{message.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              <p>Selecione ou crie um chat para começar.</p>
            </div>
          )}
        </div>
        {/* Campo de mensagem */}
        <div className="bg-gray-200 px-6 py-4">
          {!selectedChat ? (
            <div className="flex items-center">
              <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} type="text" placeholder="Digite seu nome..." className="border-gray-400 border w-full py-2 px-3 rounded-lg mr-4" />
              <button onClick={saveName} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Salvar</button>
            </div>
          ) : (
            <div className="flex items-center">
              <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyUp={(e) => e.key === 'Enter' && sendMessage()} type="text" placeholder="Digite uma mensagem..." className="border-gray-400 border w-full py-2 px-3 rounded-lg mr-4" />
              <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Enviar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

