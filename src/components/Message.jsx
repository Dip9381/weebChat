import React, { useContext, useState } from "react";
import user from "./images/chat1.png";
import { AuthContext } from "./context/Authcontext";
import { ChatContext } from "./context/Chatcontext";
const Message = ({ message}) => {
  const { curruser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [imgload,setimgload]=useState(true);
  
  const handleload=()=>{
    setimgload(true);
  }
  return (
    <>
      {console.log(message.message)}
      {message.senderid === curruser.uid ? (
        <div className="message owner">
          <div>
            <img src={curruser.photoURL} alt="" />
            <p>{message.date.toDate().getHours()}:{message.date.toDate().getMinutes()<10?'0'+message.date.toDate().getMinutes():message.date.toDate().getMinutes()}{
                message.date.toDate().getHours()>=12?'PM':'AM'
            }</p>
          </div>
          <div>
            {message.text !== null && message.text}
            {message.img !== null && <img style={{width:'50%'}} src={message.img} onLoad={handleload}></img>}
          </div>
        </div>
      ) : (
        <div className="message">
          <div>
            <img src={data.user.photoURl} alt="" />
            <p>{message.date.toDate().getHours()}:{message.date.toDate().getMinutes()<10?'0'+message.date.toDate().getMinutes():message.date.toDate().getMinutes()}{
                message.date.toDate().getHours()>=12?'PM':'AM'
            }</p>
          </div>
          <div>
            {message.text !== null && message.text}
            {message.img !== null && <img style={{width:'50%'}} src={message.img} onLoad={handleload}></img>}
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
