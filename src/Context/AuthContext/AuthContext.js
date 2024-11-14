import { createContext } from "react";

const AuthContext = createContext({
    isLogIn: false,
    token: null,
    userInfos: null,
    login:()=>{},
    logout:()=>{}
})

export default AuthContext