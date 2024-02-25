import React, { useState } from 'react';
import "./styles.css";
import Logo from "../../images/vgofficialtickets-removebg-preview.png";
import { MdViewKanban } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import Kanban from "../Kanban/Kanban";
import Chat from "../Chat/index";
// import Integration from "../Integration/Integration";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = (component) => {
    switch(component) {
      case 'kanban':
        return <Kanban />;
      case 'chat':
        return <Chat />;
      // case 'integration':
      //   return <Integration />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="top-context">
        <img src={Logo} alt="logo do sistema" style={{ width: "170px" }} />
      </div>
      <div className="all">
        <div className="aside-context">
          <div className="kanban" onClick={() => setActiveComponent('kanban')}>
            <MdViewKanban />
            <h3>Kanban</h3>
          </div>
          <div className="chat-dashboard" onClick={() => setActiveComponent('chat')}>
            <BsFillChatLeftTextFill />
            <h3>Chat</h3>
          </div>
          <div className="integration" onClick={() => setActiveComponent('integration')}>
            <FaCode />
            <h3>Integração</h3>
          </div>
        </div>
        <div className="content-component">
          {renderComponent(activeComponent)}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
