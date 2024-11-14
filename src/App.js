import React,{useState,useEffect,useCallback} from 'react';
import {useRoutes , useLocation } from 'react-router-dom'
import routes from './routes'
import AuthContext from './Context/AuthContext/AuthContext';
import NotifContext from './Context/ShowNotif/ShowNotif';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
  const router=useRoutes(routes)
  const [isLogIn , setIsLogin] = useState(false)
  const [token , setToken] = useState(false)
  const [userInfos , setUserInfos] = useState(false)
  const [isShowNotif ,setIsShowNotif]= useState(false)

  const [pageLoade, setPageLoade] = useState(false)

  const locationPath= useLocation()


  useEffect(()=>{
    window.addEventListener('load', handelPageLoade)
    
    return ()=>{
      window.removeEventListener('load', handelPageLoade)
    }
  },[locationPath])

  useEffect(()=>{
    window.scrollTo(0,0)
  },[locationPath])


  const handelPageLoade= ()=>{
    setPageLoade(true)
  }

  const handelNotif=()=>{
    setIsShowNotif(true)
    setTimeout(()=>{
      setIsShowNotif(false)
    },2000)
  }

  const login =useCallback((userInfos , token)=>{
      setToken(token)
      setIsLogin(true)
      setUserInfos(userInfos)
      localStorage.setItem('user',JSON.stringify({token}))
    },[token]) 

  const logout =useCallback(
    ()=>{
      setToken(null)
      setUserInfos({})
      setIsLogin(false)
      localStorage.removeItem('user')
    },[]) 

  useEffect(()=>{
    const localData= JSON.parse(localStorage.getItem('user'))
    if(localData){
      fetch('https://tajak-project.liara.run/api/auth/me',{
        headers:{
          "Authorization":`Bearer ${localData.token}`
        }
      }).then((res)=> res.json())
      .then((data) =>{
        setIsLogin(true)
        setUserInfos(data)
      })
    }
  }, [login])



  return (
    <>
    {pageLoade ? (
    <NotifContext.Provider value={{
      isShowNotif,
      handelNotif
    }}>
      <AuthContext.Provider value={{
      isLogIn,
      token,
      userInfos,
      login,
      logout
    }}>
      {router}
    </AuthContext.Provider>
    </NotifContext.Provider>
    ) : (
      <Loader />
    )}
    </>
    
  );
}

export default App;
