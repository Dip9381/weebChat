import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import app from "../firebase";
import { AuthContext } from "./context/Authcontext";
const Search = () => {
  const [user, setuser] = useState(null);
  const [username, setusername] = useState(null);
  const { curruser } = useContext(AuthContext);
  useEffect(() => {
    setuser(null);
  }, [username]);
  useEffect(() => {
    const handlesearch = async () => {
      if (username) {
        const db = getFirestore(app);
        const q = query(
          collection(db, "users"),
          where("displayName", ">=", username),
          where("displayName", "<=", username + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        setuser(querySnapshot);
      } else {
        setuser(null);
      }
    };
    handlesearch();
  }, [username]);
  const handleclick = async (e) => {
    setusername('')
    const combinedid =
      curruser.uid > e.uid.stringValue
        ? curruser.uid + e.uid.stringValue
        : e.uid.stringValue + curruser.uid;
    
    const db = getFirestore(app);
    const res = await getDocs(
      query(collection(db, "chats"), where("combinedid", "==", combinedid))
    );
    if (res.docs.length === 0) {
      console.log(curruser);
      try {
        await setDoc(doc(db, "chats", combinedid), { messages: [] });
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await updateDoc(doc(db, "userchats", curruser.uid), {
        [combinedid + ".userinfo"]: {
          uid: e.uid.stringValue,
          displayName: e.displayName.stringValue,
          photoURl: e.photoURl.stringValue,
        },
        [combinedid + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userchats", e.uid.stringValue), {
        [combinedid + ".userinfo"]: {
          uid: curruser.uid,
          displayName: curruser.displayName,
          photoURl: curruser.photoURL,
        },
        [combinedid + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    setusername('');
  };

  return (
    <>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Find a User"
        // onKeyUp={handlesearch}
        onChange={(e) => setusername(e.target.value)}
      />
      <div className="searchchats">
        {user &&
          username.length !== 0 &&
          user.docs.map((val, index) => {
            return (
              <>
                <div
                  key={index}
                  onClick={() =>
                    handleclick(val._document.data.value.mapValue.fields)
                  }
                >
                  <img
                    src={
                      val._document.data.value.mapValue.fields.photoURl
                        .stringValue
                    }
                    alt=""
                  />
                  <div>
                    <div className="chatName">
                      {
                        val._document.data.value.mapValue.fields.displayName
                          .stringValue
                      }
                    </div>
                    <p>hello</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Search;
