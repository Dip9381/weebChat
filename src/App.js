import Register from "./components/Register.jsx";
import './components/css/style.css';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/context/Authcontext.jsx";
function App() {
  const {curruser}=useContext(AuthContext);
  const Securelogout =({children})=>{
    if(!curruser){
     return <Navigate to='/weebChat'/>
    }
    else{
    return  children;
    }
  }
  return (
    <>
    <BrowserRouter basename="/weebChat">
    <Routes>
      <Route path="/home" element={<Securelogout>
        <Home />
      </Securelogout>}></Route>
      <Route exact path="/weebChat" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
