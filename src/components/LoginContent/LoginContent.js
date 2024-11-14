import React,{useContext} from "react";
import { Link,useNavigate } from "react-router-dom";
import Input from "../Input/Input";

import { useForm } from "react-hook-form";
import * as yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup'

import AuthContext from '../../Context/AuthContext/AuthContext'
import swal from 'sweetalert'

export default function LoginContent() {
const navigate= useNavigate()
const authContext = useContext(AuthContext)
  const schema = yup.object().shape({
    password :yup.string().required('رمز ورود الزامی است').min(4 , 'رمز ورود حداقل 4 کاراکتر باشد').max(10 , 'رمز ورود حداکثر 10 کاراکتر باشد'),
    identifier : yup.string().required('شماره موبایل الزامی است'),
  });

  const {register , handleSubmit , formState:{errors}} = useForm({resolver : yupResolver(schema)})

const onFormSubmit = (data)=>{

  fetch('https://tajak-project.liara.run/api/auth/login',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if(res.status === 401){
        swal({
          title:'کاربر مورد نظر یافت نشد',
          icon:'error',
          buttons: 'تلاش دوباره'
        })
        
      }else if(res.status === 200){
        swal({
          title:'با موفقیت لاگین شدید',
          icon:'success',
          buttons:'ورود به صفحه اصلی'
        }).then(value =>{
          navigate('/')
        })
        return res.json()
        .then((data) =>{
        authContext.login({},data.accessToken)
      })
      }
    })
}


  return (
    <div className="logincontent py-16">
      <div className="container">
        <div className="content flex items-center justify-center gap-5">
          <div className="img  ">
            <img src="/images/imglogin.png" alt="" />
          </div>
          <div className="form w-[270px] h-[380px]">
            <p className="mb-3 text-text font-bold">خوش اومدی به تاجک</p>
            <h1 className="w-full bg-gmain flex items-center justify-center h-10 rounded text-bg mb-5">
              ورود به سایت
            </h1>
            <form className="w-full" action="" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="mb-4 relative">
                <Input 
                elem='input'
                type='number'
                className='w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg'
                validation={register('identifier')}
                />
                <p className="bg-bg text-text absolute -top-4 right-2">شماره موبایل</p>
                {errors.identifier && (
                  <h1 className="text-red mt-1"> {errors.identifier.message}</h1>
                )}
              </div>
              <div className="mb-5 relative">
              <Input 
                elem='input'
                type='password'
                className='w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg'
                validation={register('password')}
                />
                <p className="bg-bg text-text absolute -top-4 right-2">رمز ورود</p>
                {errors.password && (
                  <h1 className="text-red mt-1"> {errors.password.message}</h1>
                )}
              </div>
              <div className="mb-5">
              <input type="submit" className="w-[50%] bg-gmain text-bg h-10 rounded-lg" value='ورود'/>
              </div>
              <p>
                اگر حساب کاربری ندارید{" "}
                <Link className="text-gmain" to='/register'>
                  ثبت نام
                </Link>{" "}
                کنید
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
