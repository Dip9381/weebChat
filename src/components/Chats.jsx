import React, { useContext, useEffect, useState } from "react";
// import chat1 from "./images/chat1.png";
import {
  doc,
  getFirestore,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "./context/Authcontext";
import app from "../firebase";
import { ChatContext } from "./context/Chatcontext";
import e from "cors";
const Chats = () => {
  const { curruser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setchats] = useState({});
  const [live,setlive]=useState({});
  const db = getFirestore(app);
  useEffect(() => {
    if (curruser.uid) {
      const unsub = onSnapshot(doc(db, "userchats", curruser.uid), (doc) => {
        doc.exists() ? setchats(doc.data()) : setchats({});
      });
      return () => {
        unsub();
      };
    } else {
      setchats({});
      console.log(curruser.uid);
    }
    // eslint-disable-next-line
  }, [curruser.uid, db]);
  const handleselect = async (user, e) => {
    // e.target.style.backgroundColor = "black";
    setlive(user.uid);
    dispatch({ type: "CHANGE_USER", payload: user });
    const combinedid =
      curruser.uid > user.uid
        ? curruser.uid + user.uid
        : user.uid + curruser.uid;
    try {
      await updateDoc(doc(db, "userchats", curruser.uid), {
        [combinedid + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userchats", user.uid), {
        [combinedid + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("Current data: ", Object.entries(chats));
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date-a[1].date)
        .map((val, index) => {
          return (
            <div style={{backgroundColor:live===val[1].userinfo.uid &&'rgb(241, 238, 238)'}} key={val[0]} onClick={(e) => handleselect(val[1].userinfo, e)}>
              <img src={val[1].userinfo.photoURl} alt="" />
              <div>
                <div className="chatName">{val[1].userinfo.displayName}</div>
                <p>{val[1].userinfo.lastmessage}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
