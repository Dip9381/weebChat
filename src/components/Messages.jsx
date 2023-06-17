import React, { useContext, useEffect, useState } from 'react'
import Message from './Message.jsx'
import { ChatContext } from './context/Chatcontext.jsx';
import { getFirestore, onSnapshot,doc } from 'firebase/firestore';
import app from '../firebase.js';
const Messages = () => {
const [messages,setmessages]=useState([]);
const {data}=useContext(ChatContext);
const db=getFirestore(app);
const [date,setdate]=useState(new Date());
useEffect(()=>{
  if(data.chatid!==null){
    console.log('enterin')
    const unsub=onSnapshot(doc(db,'chats',data.chatid),(doc)=>{
      doc.exists() && setmessages(doc.data().messages);
    }
    )
    return ()=>{
      unsub();
    }
  }
  else{
    setmessages([]);
  }
},[data.chatid])
// messages?.map((val)=>{
//   console.log(val)
// })
  return (
    <div id='messages'>
        {
        messages.length!==0 &&  messages?.map((val)=>{
            return(<>
            <Message key={val.id} message={val}/>
            {console.log(val)}
            </>)
          })
        }
    </div>
  )
}

export default Messages