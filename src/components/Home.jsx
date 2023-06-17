import React, { useContext } from "react";
import Sidebar from "./sidebar";
import Chat from "./chat";
const Home = () => {
  return (
    <>
      <div className="home-bg">
        <div className="chat-window-bg">
          <div id="sidebar">
            <Sidebar />
          </div>
          <div id="chat">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
