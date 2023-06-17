import Register from "./components/Register.jsx";
import './components/css/style.css';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import { HashRouter,Routes,Route,Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/context/Authcontext.jsx";
function App() {
  const {curruser}=useContext(AuthContext);
  const Securelogout =({children})=>{
    if(!curruser){
     return <Navigate to='/'/>
    }
    else{
    return  children;
    }
  }
  return (
    <>
    <HashRouter basename="/">
    <Routes>
      <Route path="/home" element={<Securelogout>
        <Home />
      </Securelogout>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </HashRouter>
    </>
  );
}

export default App;
