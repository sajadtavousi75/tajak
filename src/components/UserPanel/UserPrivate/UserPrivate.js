import React,{useContext} from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext from '../../../Context/AuthContext/AuthContext'
import { Navigate } from 'react-router-dom'
import Loader from '../../Loader/Loader'


export default function UserPrivate() {
    const context=useContext(AuthContext)
  return (
    <>
    {context.userInfos.role === undefined ? (
      <>
      <Loader />
      </>
    ) : (
      <>
    {context.isLogIn ? (
        <Outlet />
    ) : (
        <Navigate to='/login'/>
    )}
    </>
    )}
    </>
    
  )
}
