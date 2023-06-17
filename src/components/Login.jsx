import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate();
  const register=(e)=>{
    e.preventDefault();
    navigate('/register');
  }
  const handleclick = (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    console.log(email,password)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/home');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('wrong email or password');
      });
  };
  return (
    <div className="bg">
      <div className="box">
        <form action="" onSubmit={handleclick}>
          <h3>WeebChat</h3>
          <h4>Login</h4>
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
            placeholder="Enter a your password"
          />
          <button type="submit">Login</button>
          <p>
            Dont' Have a account?
            <a
              onClick={register}
            >
              Sign-up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
