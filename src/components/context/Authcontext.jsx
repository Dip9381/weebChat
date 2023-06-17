import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
export const AuthContext= createContext();

export const AuthContextProvider =({children})=>{
    const[curruser,setcurruser]=useState({});
    useEffect(()=>{
        const auth=getAuth();
        onAuthStateChanged(auth,(user)=>{
            setcurruser(user);
            // console.log(user);
        })
    },[]);
    return(
        <AuthContext.Provider value={{curruser}}>
        {children}
        </AuthContext.Provider>
    );
};
// export  AuthContextProvider;