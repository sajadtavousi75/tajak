import { createContext } from "react";

const NotifContext = createContext({
    isShowNotif: false,
    handelNotif:()=>{}
})

export default NotifContext