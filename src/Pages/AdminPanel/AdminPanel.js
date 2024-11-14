import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/AdminPanel/Sidebar/Sidebar";
import AuthContext from "../../Context/AuthContext/AuthContext";
import Loader from "../../components/Loader/Loader";
export default function AdminPanel() {
  const navigate= useNavigate()
  const context= useContext(AuthContext)
  console.log(context.userInfos.role)
  return (
    <>
    {context.userInfos.role === undefined ?(
      <Loader />
    ):(
      <>
      {context.userInfos.role === 'ADMIN'? (
      <div className="panelcontent bg-bg font-roya   w-full ">
      <div className="container ">
        <Sidebar />
        <div className="main pr-[330px] pt-5 pb-3">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
        <div>
          <img className="w-full" src="/images/Frame 178.png" alt="" />
        </div>
    </div>
      ) : (
        <Navigate to='/'/>
      )}
      </>
    )}
    </>
  );
}
