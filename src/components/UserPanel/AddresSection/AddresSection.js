import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import AddresBox from "../AddresBox/AddresBox";
import swal from "sweetalert";

import NotFound from "../NotFound/NotFound";

export default function AddresSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address ,setAddress] = useState([])

  const [title , setTitle] = useState('')
  const [state , setState] = useState('')
  const [city , setCity] = useState('')
  const [details , setDetails] = useState('')
  const [pelak , setPelak] = useState('')
  const [unit , setUnit] = useState('')
  const [postalcode , setPostalcode] = useState('')
  const [firstname , setFirstname] = useState('')
  const [lastname , setLastname] = useState('')
  const [phone , setPhone] = useState('')

  const {register , handleSubmit , formState:{errors}} = useForm({
    defaultValues:{
      title:'',
      state:'',
      city:'',
      details:'',
      pelak:'',
      unit:'',
      postalcode:'',
      firstname:'',
      lastname:'',
      phone:''
    }
  })

const getAddres = ()=>{
  const localData = JSON.parse(localStorage.getItem("user"));

  fetch('https://tajak-project.liara.run/api/user/addres',{
    headers:{
      "Content-Type": "application/json",
            Authorization: `Bearer ${localData.token}`,
    }
  }).then((res) => res.json())
  .then((data) => {
    setAddress(data)
  })
}

useEffect(() =>{
  getAddres()
},[])

  const onSubmit=(data)=>{
    console.log(data)
    const newAddres={
          title:data.title,
          state:data.state,
          city:data.city,
          details:data.details,
          pelak:data.pelak,
          unit:data.unit,
          postalcode:data.postalcode,
          firstname:data.firstname,
          lastname:data.lastname,
          phone:data.phone
        }
    
        const localData = JSON.parse(localStorage.getItem("user"));
    
        fetch('https://tajak-project.liara.run/api/addres',{
          method: 'POST',
          headers :{
            "Content-Type": "application/json",
                Authorization: `Bearer ${localData.token}`,
          },
          body : JSON.stringify(newAddres)
        }).then((res) => {
          if(res.ok){
            swal({
              title: 'ادرس با موفقیت اضافه شد',
              icon: 'success',
              buttons: 'باشه'
            })
            getAddres()
          }
        })
  }


  return (
    <div className="addressection bg-gmelo rounded-lg  w-full p-3">
      
      <div className="container">
          {address.length ? (
        <div className="content  ">
          {address.map((addres) =>(
          <AddresBox key={addres._id}  data={addres} />
          ))}
        </div>
          ) : (
            <NotFound title='تا کنون آدرسی ثبت نشده است'/>
          )}
          <div className="flex items-center justify-end mt-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-[150px] h-10 bg-gmain text-bg rounded-lg text-end flex items-center justify-center "
            >
              افزودن آدرس جدید
            </button>
          </div>
        <div>
          <Modal
          className="w-[400px] h-[500px] 	mt-[130px] bg-bg  mx-auto p-4 font-roya md:w-[600px]"
            isOpen={isModalOpen}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <div className="modal-top flex items-center justify-between">
              <div
                onClick={() => setIsModalOpen(false)}
                className="bg-gmain w-10 h-10 flex items-center justify-center rounded-full hover:bg-gmelo hover:text-text"
              >
                <img src="/images/close.svg" alt="" />
              </div>
            </div>
            <div className="content">
              <h1 className="text-center font-bold text-text">افزودن آدرس جدید</h1>
              <form className="mt-3"  onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 relative w-[45%]">
                  <input
                    className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                    type="text"
                    {...register('title',{
                      required: true
                    })}
                  />
                  <p className="bg-bg text-text absolute -top-4 right-2">
                  عنوان آدرس
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mb-4 relative w-[45%]">
                    <input
                    {...register('state',{
                      required: true
                    })}
                      className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                      type="text"
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                    استان
                    </p>
                  </div>
                  <div className="mb-4 relative w-[45%]">
                    <input
                    {...register('city',{
                      required: true
                    })}
                      className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                      type="text"
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                    شهر
                    </p>
                  </div>
                </div>
                <div className="mb-4 relative w-full">
                  <input
                  {...register('details',{
                    required: true
                  })}
                    className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                    type="text"
                  />
                  <p className="bg-bg text-text absolute -top-4 right-2">
                  جزئیات آدرس
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mb-4 relative w-[30%]">
                    <input
                    {...register('pelak',{
                      required: true
                    })}
                      className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                      type="number"
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                    پلاک
                    </p>
                  </div>
                  <div className="mb-4 relative w-[30%]">
                    <input
                    {...register('unit',{
                      required: true
                    })}
                      className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                      type="number"
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                    واحد
                    </p>
                  </div>
                  <div className="mb-4 relative w-[30%]">
                    <input
                    {...register('postalcode',{
                      required: true
                    })}
                      className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                      type="number"
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                    کد پستی
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mb-4 relative w-[45%]">
                    <input
                    {...register('firstname',{
                      required: true
                    })}
                      className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                      type="text"
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                    نام گیرنده
                    </p>
                  </div>
                  <div className="mb-4 relative w-[45%]">
                    <input
                    {...register('lastname',{
                      required: true
                    })}
                      className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                      type="text"
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                    نام خانوادگی گیرنده
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mb-4 relative w-[45%]">
                    <input
                    {...register('phone',{
                      required: true
                    })}
                      className="w-full border-solid border-gmain border-1 p-1 rounded-lg bg-bg 	"
                      type="number"
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                    شماره تماس
                    </p>
                  </div>
                  <div className="mb-4 ">
                  <button type="submit" className="w-[150px] h-10 bg-gmain text-bg rounded-lg">ثبت آدرس</button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
