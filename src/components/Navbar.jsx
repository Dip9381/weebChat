import React, { useContext } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from './context/Authcontext';

const Navbar = () => {
  const {curruser}=useContext(AuthContext);
  return (
    <div id='navbar'>
        <div>WeebChat</div>
        <div>{curruser.displayName}</div>
        <img src={curruser.photoURL} alt="" />
        <input type="button" value="Logout" onClick={()=>{
          const auth = getAuth();
          signOut(auth).then(() => {
            // Sign-out successful.
            console.log('logout successful');
          }).catch((error) => {
            console.log(error);
            // An error happened.
          });
        }}/>
    </div>
  )
}

export default Navbar