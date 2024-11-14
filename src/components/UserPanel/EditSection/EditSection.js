import React, { useState , useEffect} from "react";
import swal from "sweetalert";

export default function EditSection({data}) {

  const [firstname , setFirstName] = useState('');
  const [lastname , setLastName] = useState('');
  const [phone , setPhone] = useState('');
  const [email , setEmail] = useState('');
  const [username , setUserName] = useState('');
  const [password , setPassword] = useState('');

  useEffect(()=>{
    const localData= JSON.parse(localStorage.getItem('user'))
    if(localData){
      fetch('https://tajak-project.liara.run/api/auth/me',{
        headers:{
          "Authorization":`Bearer ${localData.token}`
        }
      }).then((res)=> res.json())
      .then((data) =>{
        setFirstName(data.firstname)
        setLastName(data.lastname)
        setPhone(data.phone)
        setUserName(data.username)
        setEmail(data.email)
      })
    }
  },[])

  const newUpdate ={
    firstname,
    lastname,
    phone,
    email,
    username,
    password
  }

  const updateHandeler =()=>{
    const localData= JSON.parse(localStorage.getItem('user'))
    if(localData){
      fetch('https://tajak-project.liara.run/api/user',{
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
          "Authorization":`Bearer ${localData.token}`
        },
        body : JSON.stringify(newUpdate)
      }).then((res) =>{
        if(res.ok){
          swal({
            title:'اطلاعات با موفقیت ویرایش شد',
            icon:'success',
            buttons:'باشه'
          })
        }
      })
    }
  }
  
  return (
    <div className="editsection bg-gmelo  rounded-lg w-full ">
      <div className="container">
        <div className="editcontent flex flex-col gap-4  w-full p-5">
          <div className="flex items-center justify-between">
            <div className="w-[45%] relative">
              <input
              value={firstname}
              onChange={(event) => setFirstName(event.target.value)}
                className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	 h-10"
                type="text"
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">نام</p>
            </div>
            <div className="w-[45%]">
              <h1 className="w-full bg-gmain flex items-center justify-center h-10 rounded text-bg ">
                افزودن رمز ورود
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-[45%] relative">
              <input
              value={lastname}
              onChange={(event) => setLastName(event.target.value)}
                className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	 h-10"
                type="text"
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">نام خوانوادگی</p>
            </div>
            <div className="w-[45%] relative">
              <input
                className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	 h-10"
                type="text"
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">رمز فعلی</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-[45%] relative">
              <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
                className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	 h-10"
                type="text"
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">شماره موبایل</p>
            </div>
            <div className="w-[45%] relative">
              <input
              onChange={(event) => setPassword(event.target.value)}
                className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	 h-10"
                type="text"
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">رمز جدید</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-[45%] relative">
              <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
                className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	 h-10"
                type="text"
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">ایمیل</p>
            </div>
            <div className="w-[45%] relative">
              <input
                className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	 h-10"
                type="text"
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">تکرار</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
          <div className="w-[45%] relative">
              <input
              value={username}
              onChange={(event) => setUserName(event.target.value)}
                className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	 h-10"
                type="text"
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">نام کاربری</p>
            </div>
            <div className="w-[45%] h-10 relative">
              <p className="text-text text-xs lg:text-sm">
                *رمزجدید حداقل شامل 8 کاراکتر(a-z) و عدد باشد.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end mt-5">
            <div className="">
              <button onClick={updateHandeler} className="w-[150px] h-10 bg-gmain text-bg h-10 rounded-lg ">
                ثبت اطلاعات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
