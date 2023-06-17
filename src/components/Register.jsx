import React from "react";
import app from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage,ref} from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate=useNavigate();
  const login=(e)=>{
    e.preventDefault();
    navigate('/');
  }
  const handleclick = async (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let file = e.target[3].files[0];
    // console.log(name, email, password, file);
    const auth = getAuth();
    const res= await createUserWithEmailAndPassword(auth, email, password);

    const storage = getStorage();
    const storageRef = ref(storage, 'userImages/'+name);

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on(
  'state_changed',
        (snapshot) => {
          // Progress monitoring if needed
        },
        (error) => {
          console.log(error);
        },
 async () => {
  try{
     const downloadURL= await  getDownloadURL(uploadTask.snapshot.ref) 
      console.log('File available at', downloadURL);

      updateProfile(res.user, {
        displayName: name,
        photoURL: downloadURL,
      }).then( async() => {
        // Profile updated!
        console.log(res.user);
        const db = getFirestore(app);
        await setDoc(doc(db, "users",res.user.uid), {
          uid: res.user.uid,
          displayName: name,
          email: email,
          photoURl: downloadURL,
        });
        await setDoc(doc(db, "userchats",res.user.uid), {
          
        });
        navigate('/home');
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error);
        // ...
      });


    }
    catch(err){
      console.log(err)};
  }
);
      
  };
  return (
    <>
      <div className="bg">
        <div className="box">
          <form onSubmit={handleclick}>
            <h1>WeebChat</h1>
            <h3>Register</h3>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Give a username ex:Jim"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a new password min 8 length"
            />
            <input type="file" name="file" id="file" />
            <label htmlFor="file">Upload a avatar</label>
            <button type="submit">sign-up</button>
            <p>
              Have a account already?<a onClick={login}>Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
