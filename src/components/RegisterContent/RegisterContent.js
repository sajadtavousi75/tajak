import React,{useContext} from "react";
import Input from "../Input/Input";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import swal from 'sweetalert'

import {yupResolver} from '@hookform/resolvers/yup'

import AuthContext from '../../Context/AuthContext/AuthContext'





export default function RegisterContent() {
  const authContext= useContext(AuthContext)
  console.log(authContext.userInfos)

  const navigate = useNavigate()

  const schema = yup.object().shape({
    username : yup.string().required('نام کاربری الزامی است').min(5,'نام کاربری باید حداقل ۵ کارکتر باشد').max(15 , 'نام کاربری باید حداکثر ۱۵ کارکتر باشد'),
    phone : yup.string().required('شماره موبایل الزامی است'),
    email:yup.string().required('ایمیل الزامی است').email('ایمیل نامعتبر است'),
    password :yup.string().required('رمز ورود الزامی است').min(4 , 'رمز ورود حداقل 4 کاراکتر باشد').max(10 , 'رمز ورود حداکثر 10 کاراکتر باشد'),
    confirmpassword : yup.string().oneOf([yup.ref('password')] , 'رمز ورود همخوانی ندارد').required('رمز ورود الزامی است')
  });

  const {register , handleSubmit , formState:{errors}} = useForm({resolver : yupResolver(schema)})

  const onFormSubmit = (data) =>{

    fetch('https://tajak-project.liara.run/api/auth/register',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) =>{
      authContext.login(data.user,data.accessToken)
      swal({
        title:'ثبت نام با موفقیت انجام شد',
        icon: 'success',
        buttons: 'ورود به صفحه اصلی'
      }).then((value) =>{
        navigate('/')
      })
    })
  }
  return (
    <div className="registercontent  pb-32 pt-16 ">
      <div className="container">
        <div className="content flex items-center justify-center gap-5">
          <div className="img  ">
            <img src="/images/imgregister.png" alt="" />
          </div>
          <div className="form w-[270px] h-[470px]">
            <h1 className="w-full bg-gmain flex items-center justify-center h-10 rounded text-bg mb-5">
              ثبت نام
            </h1>
            <form className="w-full" action="" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="mb-4 relative">
                <Input
                elem='input'
                type='text'
                className='w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg'
                validation={register('username')}
                />
                <p className="bg-bg text-text absolute -top-4 right-2">نام کاربری</p>
                {errors.username && (
                  <h1 className="text-red mt-1"> {errors.username.message}</h1>
                )}
              </div>
              <div className="mb-4 relative">
                <Input 
                elem='input'
                type='number'
                className='w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg'
                validation={register('phone')}
                />
                <p className="bg-bg text-text absolute -top-4 right-2">شماره موبایل</p>
                {errors.phone && (
                  <h1 className="text-red mt-1"> {errors.phone.message}</h1>
                )}
              </div>
              <div className="mb-4 relative">
                <Input 
                elem='input'
                type='text'
                className='w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg'
                validation={register('email')}
                />
                <p className="bg-bg text-text absolute -top-4 right-2">ایمیل</p>
                {errors.email && (
                  <h1 className="text-red mt-1"> {errors.email.message}</h1>
                )}
              </div>
              <div className="mb-4 relative">
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
              <div className="mb-5 relative">
              <Input 
                elem='input'
                type='password'
                className='w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg'
                validation={register('confirmpassword')}
                />
                <p className="bg-bg text-text absolute -top-4 right-2">تکرار رمز ورود</p>
                {errors.confirmpassword && (
                  <h1 className="text-red mt-1"> {errors.confirmpassword.message}</h1>
                )}
              </div>
              <div className="mb-5">
                <input type="submit" className="w-[50%] bg-gmain text-bg h-10 rounded-lg" value='ثبت نام'/>
              </div>
              <p>
                قبلا ثبت نام کرده ام ،{" "}
                <Link to='/login' className="text-gmain" >
                  ورود{" "}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
