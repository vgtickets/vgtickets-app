import "./styles.css";
import Logo from "../../images/vgofficialtickets-removebg-preview.png";
import { MdViewKanban } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FaCode } from "react-icons/fa";

function Dashboard() {
  return (
    <>
      <div className="top-context">
        <img src={Logo} alt="logo do sistema" style={{ width: "170px" }} />
      </div>
      <div className="aside-context">
        <div className="kanban">
          <MdViewKanban />
          <h3>Kanban</h3>
        </div>
        <div className="chat-dashboard">
          <BsFillChatLeftTextFill />
          <h3>Chat</h3>
        </div>
        <div className="integration">
          <FaCode />
          <h3>Integração</h3>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
