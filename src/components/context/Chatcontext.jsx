import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./Authcontext";

export const ChatContext=createContext();

export const ChatContextProvider =({children})=>{
    const {curruser}=useContext(AuthContext);
    const INITIAL_STATE={
        chatid:null,
        user:{}
    }
    const chatreducer=(state,action)=>{
        if(action.type==='CHANGE_USER'){
            return{
                user:action.payload,
            chatid:curruser.uid>action.payload.uid?curruser.uid+action.payload.uid:action.payload.uid+curruser.uid
            }
        }
    }
    const [state,dispatch]=useReducer(chatreducer,INITIAL_STATE);
    return(
        <ChatContext.Provider value={{data:state,dispatch}}>
        {children}
        </ChatContext.Provider>
    );
};
// export  AuthContextProvider;