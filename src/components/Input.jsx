import React, { useContext, useState } from "react";
import { AuthContext } from "./context/Authcontext";
import { ChatContext } from "./context/Chatcontext";
import {doc,updateDoc,arrayUnion, Timestamp} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getFirestore} from "firebase/firestore";
import { uploadBytesResumable,getDownloadURL,getStorage,ref } from "firebase/storage";
import app from "../firebase";
const Input = () => {
  const {curruser} =useContext(AuthContext)
  const {data}=useContext(ChatContext);
  const [text,settext]=useState('');
  const [img,setimage]=useState(null);
  const db=getFirestore(app);
  const handlesend=async(e)=>{
    e.preventDefault();
    if (img) {
      const storage = getStorage();
      const storageRef = ref(storage, `chatImages/${uuid()}`); // Generate dynamic storage reference path
  
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress monitoring if needed
        },
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // Get the download URL directly
            console.log(downloadURL);
  
            await updateDoc(doc(db, 'chats', data.chatid), {
              messages: arrayUnion({
                id: uuid(),
                senderid: curruser.uid,
                img: downloadURL,
                date: Timestamp.now(),
              }),
            });
          } catch (error) {
            console.log(error);
          }
        }
      );
      setimage(null);
    }
     else if(text.length>0){
       document.getElementById('chatText').value='';
      await updateDoc(doc(db,'chats',data.chatid),{
        messages:arrayUnion({
          id:uuid(),
          senderid:curruser.uid,
          text,
          date:Timestamp.now(),
        })
      })
      await updateDoc(doc(db,'userchats',curruser.uid),{
        [data.chatid+'.userinfo.lastmessage']:text
      })
      settext('');
     }
  }
  return (
    <div id="input">
      <input   
        type="text"
        name="chatText"
        id="chatText"
        placeholder="write something"
        onChange={e=>settext(e.target.value)}
      />
      <button onClick={handlesend}>send</button>
      <input type="file" name="attach" id="attach" onChange={e=>setimage(e.target.files[0])}/>
      <label  htmlFor="attach" className="attach-logo">
        <i title="attach image" class="fa-solid fa-paperclip fa-lg" style={{ color: "black" }}></i>
      </label>
      
    </div>
  );
};

export default Input;
