import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, push, remove, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../plugins/firebase';
import './Kanban.css';
import { AiOutlineClose } from 'react-icons/ai';
import Logo from "../../images/vgofficialtickets-removebg-preview.png";


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const AddCardModal = ({ show, onClose, onSubmit }) => {
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [newCardAssign, setNewCardAssign] = useState('');
  const [newCardTags, setNewCardTags] = useState('');

  const handleAddCard = () => {
    onSubmit({
      title: newCardTitle,
      description: newCardDescription,
      assign: newCardAssign,
      tags: newCardTags
    });
    setNewCardTitle('');
    setNewCardDescription('');
    setNewCardAssign('');
    setNewCardTags('');
  };

  return (
    show &&
    <div className="modal-overlay-create">
    <div className="modal-create">
      <div className="modal-content">
        <div className="logo-close">
          <img src={Logo} alt="logo do sistema" />
           <span className="close" onClick={onClose}><AiOutlineClose /></span>
        </div>
        <div className="title">
        <input
          type="text"
          placeholder="Title"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
        /> 
        </div>
        <textarea
          placeholder="Description"
          value={newCardDescription}
          onChange={(e) => setNewCardDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assign"
          value={newCardAssign}
          onChange={(e) => setNewCardAssign(e.target.value)}
        />
        <input className='tags'
          type="text"
          placeholder="Tags"
          value={newCardTags}
          onChange={(e) => setNewCardTags(e.target.value)}
        />
        <div className="btn-create-task">
          <button onClick={handleAddCard}>Criar atividade</button>
        </div>
      </div>
    </div>
  </div>
  );
};

const EditCardModal = ({ show, onClose, onSubmit, cardData }) => {
  const [editedCardTitle, setEditedCardTitle] = useState(cardData.title);
  const [editedCardDescription, setEditedCardDescription] = useState(cardData.description);
  const [editedCardAssign, setEditedCardAssign] = useState(cardData.assign);
  const [editedCardTags, setEditedCardTags] = useState(cardData.tags);

  const handleEditCard = () => {
    onSubmit({
      title: editedCardTitle,
      description: editedCardDescription,
      assign: editedCardAssign,
      tags: editedCardTags
    });
  };

  return (
    show &&
    <div className="modal-create">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <input
          type="text"
          placeholder="Title"
          value={editedCardTitle}
          onChange={(e) => setEditedCardTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={editedCardDescription}
          onChange={(e) => setEditedCardDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assign"
          value={editedCardAssign}
          onChange={(e) => setEditedCardAssign(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags"
          value={editedCardTags}
          onChange={(e) => setEditedCardTags(e.target.value)}
        />
        <button onClick={handleEditCard}>Edit Card</button>
      </div>
    </div>
  );
};

const Kanban = () => {
  const [columns, setColumns] = useState({});
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCardId, setEditCardId] = useState(null);
  const [editCardData, setEditCardData] = useState(null);

  useEffect(() => {
    const columnsRef = ref(database, 'columns');

    const unsubscribe = onValue(columnsRef, (snapshot) => {
      const columnsData = snapshot.val() || {};
      setColumns(columnsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddColumn = () => {
    if (newColumnTitle.trim() !== '') {
      const newColumnRef = push(ref(database, 'columns'));
      set(newColumnRef, { title: newColumnTitle, cards: {} });
      setNewColumnTitle('');
    }
  };

  const handleAddCard = (cardData) => {
    const firstColumnId = Object.keys(columns)[0];
    if (firstColumnId) {
      const newCardRef = push(ref(database, `columns/${firstColumnId}/cards`));
      set(newCardRef, cardData);
      setShowAddModal(false);
    }
  };

  const handleEditCard = (cardData) => {
    if (editCardData) {
      const { columnId, cardId } = editCardData;
      const cardRef = ref(database, `columns/${columnId}/cards/${cardId}`);
      set(cardRef, cardData);
      setShowEditModal(false);
      setEditCardId(null);
      setEditCardData(null);
    }
  };

  return (
  <>
 
  <div className="kanban-header">
        <button onClick={() => setShowAddModal(true)}>Nova Atividade</button>
        <input
          type="text"
          placeholder="Nome da nova coluna"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
        />
        <button className="btn-column" onClick={handleAddColumn}>Nova Coluna</button>
      </div>
    <div className="kanban-container">
      
      <div className="kanban-columns">
        {Object.keys(columns).map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
            title={columns[columnId].title}
            cards={columns[columnId].cards || {}}
            database={database}
            setEditCardId={setEditCardId}
            setEditCardData={setEditCardData}
            setShowEditModal={setShowEditModal}
          />
        ))}
      </div>
      <AddCardModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCard}
      />
      <EditCardModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditCard}
        cardData={editCardData || {}}
      />
    </div> </>
  );
};

const Column = ({ title, cards, columnId, database, setEditCardId, setEditCardData, setShowEditModal }) => {
  const handleDropCard = (e) => {
    e.preventDefault();
    const cardData = JSON.parse(e.dataTransfer.getData('cardData'));
    const newCardRef = push(ref(database, `columns/${columnId}/cards`)); 
    set(newCardRef, cardData); 
    const cardId = cardData.cardId;
    remove(ref(database, `columns/${cardData.originColumnId}/cards/${cardId}`)); 
  };

  const handleEditClick = (cardId) => {
    setEditCardId(cardId);
    setEditCardData({ columnId, ...cards[cardId] });
    setShowEditModal(true);
  };

  return (
    <div
      className="column"
      onDrop={handleDropCard}
      onDragOver={(e) => e.preventDefault()}
    >
      <h3>{title}</h3>
      {Object.keys(cards).map((cardId) => (
        <Card
          key={cardId}
          id={cardId}
          columnId={columnId}
          {...cards[cardId]}
          database={database}
          handleEditClick={handleEditClick}
        />
      ))}
    </div>
  );
};

const Card = ({ id, title, description, assign, tags, columnId, database, handleEditClick }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('cardData', JSON.stringify({ 
      cardId: id,
      originColumnId: columnId,
      title,
      description,
      assign,
      tags
    }));
  };

  const handleDeleteCard = () => {
    remove(ref(database, `columns/${columnId}/cards/${id}`));
  };

  return (
    <div
      className="card"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <span className="delete-btn" onClick={handleDeleteCard}>&times;</span>
      <span className="edit-btn" onClick={() => handleEditClick(id)}>✎</span>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>Assign: {assign}</p>
      <p>Tags: {tags}</p>
    </div>
  );
};

export default Kanban;
