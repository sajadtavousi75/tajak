import React, { useState,useRef,useCallback,useEffect,useContext } from "react";
import Modal from "react-modal";
import Input from "../../Input/Input";
import productContext from '../../../Context/productContext/productContext'

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import Switch from "../Switch/Switch";

import swal from 'sweetalert'

export default function DetailsContentBook() {
  const productdata= useContext(productContext)

  const [isModalAuthor, setIsModalAuthor] = useState(false);
  const [isModalAuthorContent, setIsModalAuthorContent] = useState(false);
  const [valueToggle, setValueToggle] = useState(false);
  const [authorCover,setAuthorCover] =useState({})
  const [author,setAuthor] =useState([])
  const [saveAuthor , setSaveAuthor] = useState([])

  const inputRef = useRef(null);

  const handleLabelClick = () => {
    inputRef.current.click();
  };

  const handelchange = () => {
    setIsModalAuthor(false);
    setIsModalAuthorContent(true);
  };

  const schema = yup.object().shape({
    name: yup.string().required("نام الزامی است"),
    shortName: yup.string().required("نام کوتاه الزامی است"),
    description: yup.string().required("توضیحات الزامی است"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onFormSubmit = (data) => {
    const localData = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData()
    
    
    formData.append("name", data.name);
    formData.append('shortName', data.shortName);
    formData.append('description', data.description);
    formData.append('coverAuthor' , authorCover);

    console.log(formData)

    fetch('https://tajak-project.liara.run/api/author',{
      method:'POST',
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
      body: formData
    }).then((res) => {
      if(res.ok){
        setIsModalAuthorContent(false)
        setIsModalAuthor(true)
        getAuthor()
        swal({
          title: 'نویسنده با موفقیت ثبت شد',
          icon:'success',
          buttons: 'باشه'
        })
      }
    })
  };

  const getAuthor = useCallback(() => {
    fetch("https://tajak-project.liara.run/api/author", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
      });
  }, []);

  useEffect(() => {
    getAuthor();
  }, []);

  const authorHandel = (name, id) => {
    setSaveAuthor(name);
    setIsModalAuthor(false);
    productdata.authorID=id
  };

  return (
    <div className="details-content bg-gmelo rounded-lg pb-5 mt-5">
      <h1 className="w-[380px] h-10 mx-auto flex items-center justify-center bg-bg text-text font-bold rounded-b-lg shadow-lg">
        2- ثبت مشخصات کتاب
      </h1>
      <div className="content flex items-start justify-center mt-5 gap-5 h-[255px]">
        <div className="right">
          <div className=" relative">
            <input
              className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
              type="text"
              onChange={(event)=>{productdata.name=event.target.value}}
            />
            <p className="bg-gmelo text-text absolute -top-4 right-2">
              عنوان کتاب
            </p>
          </div>
          <div className="border-dashed border-gmain border-2 rounded-lg flex flex-col gap-3 mt-4 p-2">
            <button
              onClick={() => setIsModalAuthor(true)}
              className="w-[150px] h-10 bg-gmain text-bg rounded-lg"
            >
              نویسنده
            </button>
            <input className="h-10 bg-bg rounded-lg p-2" type="text" disabled value={saveAuthor} />
          </div>
        </div>
        <div className="left">
          <div
            className={`toggle border-dashed border-gmain overflow-hidden border-2 rounded-lg p-2  transition-all duration-700 ${
              valueToggle ? "h-[110px]" : "h-[50px]"
            }`}
          >
            <div className="flex gap-2 items-center justify-start">
              <h1>مترجم</h1>
              <Switch
                ison={valueToggle}
                handeltoggle={() => setValueToggle(!valueToggle)}
                name={"toggle2"}
              />
            </div>
            <input
              className={`h-10 bg-gmelo border-solid border-gmain border-1 rounded-lg w-full mt-4 p-2 transition-all duration-300 ${
                valueToggle ? "" : ""
              }`}
              type="text"
              onChange={(event)=>{productdata.translator=event.target.value}}
            />
          </div>
          <div className=" relative mt-4">
            <input
              className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
              type="text"
              onChange={(event)=>{productdata.publisher=event.target.value}}
            />
            <p className="bg-gmelo text-text absolute -top-4 right-2">
              انتشارات
            </p>
          </div>
          <div className=" relative mt-4">
            <input
              className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
              type="text"
              onChange={(event)=>{productdata.shortName=event.target.value}}
            />
            <p className="bg-gmelo text-text absolute -top-4 right-2">
              نام کوتاه
            </p>
          </div>
          <div className="flex items-center justify-center font-bold gap-4 mt-4">
            <h1>افزودن کتاب</h1>
            <div className="file 	">
              <label htmlFor="upload-file">
                <span>
                  <img
                    className="cursor-pointer w-8 h-10"
                    src="/images/file.png"
                    alt=""
                  />
                </span>
              </label>
              <input
              onChange={(event)=>{productdata.cover=event.target.files[0]}}
              className="hidden" type="file" id="upload-file" />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-author">
        <Modal
          className="w-[400px] h-[500px] overflow-y-auto	mt-[130px] bg-bg  mx-auto p-4 font-roya md:w-[750px] rounded-lg "
          isOpen={isModalAuthor}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <div className="modal-top flex flex-wrap items-center justify-start gap-2 md:justify-between">
            <div
              onClick={() => setIsModalAuthor(false)}
              className="bg-gmain w-10 h-10 flex items-center justify-center rounded-full hover:bg-gmelo hover:text-text"
            >
              <img src="/images/close.svg" alt="" />
            </div>
            <div className="flex gap-2 mt-3">
              <h1 className="text-text font-bold">انتخاب نویسنده</h1>
            </div>
            <div>
              <svg
                width="57"
                height="40"
                viewBox="0 0 57 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.869391 13.2707C0.863894 13.2692 0.860156 13.2651 0.854659 13.2636C0.385459 13.2442 0.000574895 12.8606 0.000574937 12.3806C0.00057498 11.889 0.384467 11.4914 0.870158 11.4914C1.11806 11.4086 1.7691 10.3245 1.7691 8.37029C1.7691 6.40991 1.11763 5.33194 0.869392 5.25186C0.864887 5.25075 0.861805 5.24719 0.857299 5.24607C0.431407 5.23015 0.0676342 4.90739 0.0160747 4.46535C-0.0406536 3.97632 0.304218 3.5335 0.786941 3.47603L29.1317 0.0992303C30.2336 -0.0330798 31.3506 -0.0330797 32.4534 0.0992306L52.8837 2.58506C52.8886 2.58562 52.8923 2.58885 52.8972 2.58963C54.551 2.70111 55.4174 5.10107 55.4174 7.47931C55.4174 9.01168 55.0572 10.5531 54.3596 11.4874C55.0578 12.4217 55.4174 13.9652 55.4174 15.4981C55.4174 16.9639 55.087 18.4376 54.4477 19.3809C55.6649 20.6191 56.2969 23.1894 56.2969 25.7444C56.2969 29.2569 55.1086 32.8121 52.8373 32.8713L22.9796 36.43C22.9453 36.4343 22.9109 36.4361 22.8765 36.4361C22.8413 36.4361 22.8065 36.4343 22.7717 36.43L15.8408 35.5873L15.8408 39.109C15.8408 39.5093 15.5772 39.8608 15.1962 39.9678C15.1181 39.9895 15.0395 40 14.9613 40C14.6581 40 14.3691 39.8407 14.2073 39.5675L12.2417 36.249L10.3879 38.7523C10.1608 39.0595 9.76566 39.1856 9.40617 39.0629C9.04712 38.942 8.80494 38.6017 8.80494 38.218L8.80494 34.7322L0.784848 33.757C0.322793 33.7004 -0.0160285 33.2898 0.0118952 32.819C0.0393801 32.3483 0.424153 31.9812 0.889615 31.9812C1.50976 31.9812 2.64858 29.9512 2.64858 26.6353C2.64858 23.3473 1.56857 21.4444 0.889616 21.2895C0.403925 21.2895 0.000684819 20.8919 0.000684862 20.3994C0.000684902 19.9417 0.333895 19.565 0.771986 19.5153C0.806288 19.511 0.841578 19.5084 0.876757 19.5075C1.12884 19.4092 1.7691 18.3276 1.7691 16.3891C1.7691 14.4287 1.11763 13.3507 0.869391 13.2707ZM2.86218 11.725L22.8671 14.154C23.1217 14.0509 23.7561 12.9798 23.7561 11.0432C23.7561 9.08897 23.1051 8.00488 22.8766 7.9248C22.8766 7.9248 22.8763 7.92469 22.8761 7.92469C22.8414 7.92457 22.8069 7.92302 22.7719 7.91867L3.06831 5.52651C3.3747 6.38073 3.52806 7.3921 3.52806 8.37029C3.52806 9.58424 3.30269 10.8053 2.86218 11.725ZM32.2452 1.86894C31.2815 1.75233 30.3033 1.75411 29.3379 1.86893L8.3364 4.3708L22.8784 6.13638L44.1891 3.59164C44.1916 3.59131 44.1938 3.59253 44.1964 3.5922C44.197 3.5922 44.1975 3.59175 44.1981 3.59164L45.3141 3.45911L32.2452 1.86894ZM25.0533 13.8929L44.0877 11.6305C44.2956 10.8963 44.4239 9.8805 44.4239 8.81578C44.4239 8.23542 44.3899 7.67421 44.323 7.14776C44.2625 6.67409 44.5844 6.24642 45.0437 6.16323C44.9739 5.84303 44.891 5.56104 44.7987 5.31446L44.4033 5.36146C44.401 5.36168 44.399 5.36068 44.3967 5.3609C44.3962 5.3609 44.3957 5.36135 44.3951 5.36146L24.8528 7.69504C25.2909 8.61397 25.5151 9.83205 25.5151 11.0432C25.5151 12.0236 25.3613 13.0376 25.0533 13.8929ZM52.7905 4.36523L49.617 4.74223C49.9133 5.61271 50.1405 6.71441 50.1405 7.9248C50.1405 9.03997 50.0208 10.0861 49.8125 10.9443L52.7597 10.6003C53.0074 10.5177 53.6584 9.43356 53.6584 7.47931C53.6584 5.55636 53.0285 4.47661 52.7905 4.36523ZM52.7861 12.3849L48.6198 12.877C48.6053 12.8794 48.5938 12.8887 48.5791 12.8904L33.6932 14.6599C33.7518 14.7978 33.8078 14.9434 33.8617 15.0975C33.8791 15.0923 33.8921 15.0795 33.9101 15.0752C34.3817 14.9664 34.8558 15.2632 34.9653 15.7435C35.1137 16.3969 35.1893 17.0634 35.1893 17.7256C35.1893 18.8442 35.0511 19.8866 34.8066 20.7527L45.7013 19.4579C45.7079 19.4576 45.714 19.4558 45.7206 19.4556L49.2263 19.039C49.2339 19.0386 49.2409 19.0365 49.2485 19.0364L52.7596 18.6191C53.0074 18.5365 53.6584 17.4524 53.6584 15.4981C53.6584 13.5607 53.0196 12.4815 52.7861 12.3849ZM52.6758 31.0963C52.7098 31.092 52.7447 31.0902 52.779 31.0902C53.3991 31.0902 54.5379 29.0602 54.5379 25.7444C54.5379 22.4493 53.4144 20.4287 52.7917 20.4032L50.7922 20.6412C51.4715 22.0681 51.8818 24.1429 51.8818 26.4212C51.8818 28.2322 51.6222 29.9313 51.1701 31.2757L52.6758 31.0963ZM45.6668 31.9318C46.249 30.7604 46.605 28.8712 46.605 26.8494C46.605 24.2421 46.0214 22.1934 45.3805 21.2855L33.4526 22.7055C33.4265 22.7078 33.4021 22.7216 33.376 22.7216C33.3692 22.7216 33.3626 22.7181 33.3557 22.7179C33.9571 24.1373 34.31 26.1089 34.31 28.2302C34.31 30.1802 34.0085 31.9969 33.4954 33.3825L45.6668 31.9318ZM25.4274 34.3441L27.9014 34.0493C28.4903 33.0996 29.033 31.1595 29.033 28.6044C29.033 26.4758 28.6423 24.4967 28.0187 23.3525L25.1233 23.6972C25.9611 25.0707 26.3945 27.1945 26.3945 29.3083C26.3945 31.0542 26.0829 32.9472 25.4274 34.3441ZM25.0533 21.9117L29.2996 21.4071C29.5425 20.678 29.6926 19.6692 29.6926 18.6165C29.6926 16.8465 29.3263 15.6662 29.0493 15.212L24.8504 15.7111C25.2898 16.6304 25.5151 17.8494 25.5151 19.062C25.5151 20.0424 25.3613 21.0564 25.0533 21.9117ZM8.80494 32.937L8.80494 27.6052L8.25229 27.5377C7.77001 27.4794 7.42558 27.0356 7.48363 26.5467C7.5408 26.0585 7.98823 25.7079 8.46106 25.768L9.7827 25.9296C9.78501 25.9298 9.78699 25.9287 9.7893 25.9289L15.0662 26.5702C15.0757 26.5714 15.0834 26.5773 15.093 26.5788L16.1896 26.7128C16.6719 26.7703 17.0171 27.2131 16.9605 27.7022C16.908 28.1555 16.528 28.4887 16.0882 28.4887C16.0539 28.4887 16.0191 28.4869 15.9844 28.4825L15.8409 28.4651L15.8409 33.7922L22.8776 34.6481L22.9552 34.6389C23.5605 34.4899 24.6356 32.5894 24.6356 29.3083C24.6356 25.9924 23.4968 23.9624 22.8766 23.9624C22.8419 23.9624 22.8066 23.9606 22.7719 23.9563L3.43945 21.6083C4.09323 23.0046 4.40754 24.8909 4.40754 26.6353C4.40754 28.7471 3.97769 30.8753 3.14153 32.2483L8.80494 32.937ZM22.8667 22.173C23.121 22.0706 23.7561 20.9991 23.7561 19.062C23.7561 17.1078 23.1051 16.0237 22.8766 15.9436C22.8419 15.9436 22.8066 15.9418 22.7719 15.9375L3.06831 13.5453C3.3747 14.3995 3.52806 15.4109 3.52806 16.3891C3.52806 17.6097 3.2873 18.8192 2.84184 19.7406L22.8667 22.173Z"
                  fill="#519D9E"
                />
              </svg>
            </div>
          </div>
          <div className="modal-middel mt-5">
            {author.length ? (
              <div className="h-[200px] content-author bg-gmelo  p-3 flex items-center justify-center flex-wrap  gap-3 rounded-lg overflow-auto">
                {author.map((data) =>(
                  <div className="w-[180px] h-10 border-solid border-gmain border-x-2 rounded-lg p-2 flex items-center justify-center">
                  <span
                  onClick={() =>
                    authorHandel(data.name, data._id)
                  }
                  >{data.name}</span>
                </div>
                ))}
            </div>
            ) : (
              <h1 className=" text-center font-bold text-text">
              هیچ نویسنده ای ثبت نشده است.
            </h1>
            )}
          </div>
          <div className="modal-botton mt-5">
            <button
              onClick={handelchange}
              className="w-[150px] h-10 bg-gmain text-bg rounded-lg"
            >
              افزودن نویسنده
            </button>
          </div>
        </Modal>
        <Modal
          className="w-[400px] h-[500px] overflow-y-auto	mt-[130px] bg-bg  mx-auto p-4 font-roya md:w-[750px] rounded-lg "
          isOpen={isModalAuthorContent}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <div className="modal-top flex flex-wrap items-center justify-start gap-2 md:justify-between">
            <div
              onClick={() => setIsModalAuthorContent(false)}
              className="bg-gmain w-10 h-10 flex items-center justify-center rounded-full hover:bg-gmelo hover:text-text"
            >
              <img src="/images/close.svg" alt="" />
            </div>
            <div className="flex gap-2 mt-3">
              <h1 className="text-text font-bold">انتخاب نویسنده</h1>
            </div>
            <div>
              <svg
                width="57"
                height="40"
                viewBox="0 0 57 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.869391 13.2707C0.863894 13.2692 0.860156 13.2651 0.854659 13.2636C0.385459 13.2442 0.000574895 12.8606 0.000574937 12.3806C0.00057498 11.889 0.384467 11.4914 0.870158 11.4914C1.11806 11.4086 1.7691 10.3245 1.7691 8.37029C1.7691 6.40991 1.11763 5.33194 0.869392 5.25186C0.864887 5.25075 0.861805 5.24719 0.857299 5.24607C0.431407 5.23015 0.0676342 4.90739 0.0160747 4.46535C-0.0406536 3.97632 0.304218 3.5335 0.786941 3.47603L29.1317 0.0992303C30.2336 -0.0330798 31.3506 -0.0330797 32.4534 0.0992306L52.8837 2.58506C52.8886 2.58562 52.8923 2.58885 52.8972 2.58963C54.551 2.70111 55.4174 5.10107 55.4174 7.47931C55.4174 9.01168 55.0572 10.5531 54.3596 11.4874C55.0578 12.4217 55.4174 13.9652 55.4174 15.4981C55.4174 16.9639 55.087 18.4376 54.4477 19.3809C55.6649 20.6191 56.2969 23.1894 56.2969 25.7444C56.2969 29.2569 55.1086 32.8121 52.8373 32.8713L22.9796 36.43C22.9453 36.4343 22.9109 36.4361 22.8765 36.4361C22.8413 36.4361 22.8065 36.4343 22.7717 36.43L15.8408 35.5873L15.8408 39.109C15.8408 39.5093 15.5772 39.8608 15.1962 39.9678C15.1181 39.9895 15.0395 40 14.9613 40C14.6581 40 14.3691 39.8407 14.2073 39.5675L12.2417 36.249L10.3879 38.7523C10.1608 39.0595 9.76566 39.1856 9.40617 39.0629C9.04712 38.942 8.80494 38.6017 8.80494 38.218L8.80494 34.7322L0.784848 33.757C0.322793 33.7004 -0.0160285 33.2898 0.0118952 32.819C0.0393801 32.3483 0.424153 31.9812 0.889615 31.9812C1.50976 31.9812 2.64858 29.9512 2.64858 26.6353C2.64858 23.3473 1.56857 21.4444 0.889616 21.2895C0.403925 21.2895 0.000684819 20.8919 0.000684862 20.3994C0.000684902 19.9417 0.333895 19.565 0.771986 19.5153C0.806288 19.511 0.841578 19.5084 0.876757 19.5075C1.12884 19.4092 1.7691 18.3276 1.7691 16.3891C1.7691 14.4287 1.11763 13.3507 0.869391 13.2707ZM2.86218 11.725L22.8671 14.154C23.1217 14.0509 23.7561 12.9798 23.7561 11.0432C23.7561 9.08897 23.1051 8.00488 22.8766 7.9248C22.8766 7.9248 22.8763 7.92469 22.8761 7.92469C22.8414 7.92457 22.8069 7.92302 22.7719 7.91867L3.06831 5.52651C3.3747 6.38073 3.52806 7.3921 3.52806 8.37029C3.52806 9.58424 3.30269 10.8053 2.86218 11.725ZM32.2452 1.86894C31.2815 1.75233 30.3033 1.75411 29.3379 1.86893L8.3364 4.3708L22.8784 6.13638L44.1891 3.59164C44.1916 3.59131 44.1938 3.59253 44.1964 3.5922C44.197 3.5922 44.1975 3.59175 44.1981 3.59164L45.3141 3.45911L32.2452 1.86894ZM25.0533 13.8929L44.0877 11.6305C44.2956 10.8963 44.4239 9.8805 44.4239 8.81578C44.4239 8.23542 44.3899 7.67421 44.323 7.14776C44.2625 6.67409 44.5844 6.24642 45.0437 6.16323C44.9739 5.84303 44.891 5.56104 44.7987 5.31446L44.4033 5.36146C44.401 5.36168 44.399 5.36068 44.3967 5.3609C44.3962 5.3609 44.3957 5.36135 44.3951 5.36146L24.8528 7.69504C25.2909 8.61397 25.5151 9.83205 25.5151 11.0432C25.5151 12.0236 25.3613 13.0376 25.0533 13.8929ZM52.7905 4.36523L49.617 4.74223C49.9133 5.61271 50.1405 6.71441 50.1405 7.9248C50.1405 9.03997 50.0208 10.0861 49.8125 10.9443L52.7597 10.6003C53.0074 10.5177 53.6584 9.43356 53.6584 7.47931C53.6584 5.55636 53.0285 4.47661 52.7905 4.36523ZM52.7861 12.3849L48.6198 12.877C48.6053 12.8794 48.5938 12.8887 48.5791 12.8904L33.6932 14.6599C33.7518 14.7978 33.8078 14.9434 33.8617 15.0975C33.8791 15.0923 33.8921 15.0795 33.9101 15.0752C34.3817 14.9664 34.8558 15.2632 34.9653 15.7435C35.1137 16.3969 35.1893 17.0634 35.1893 17.7256C35.1893 18.8442 35.0511 19.8866 34.8066 20.7527L45.7013 19.4579C45.7079 19.4576 45.714 19.4558 45.7206 19.4556L49.2263 19.039C49.2339 19.0386 49.2409 19.0365 49.2485 19.0364L52.7596 18.6191C53.0074 18.5365 53.6584 17.4524 53.6584 15.4981C53.6584 13.5607 53.0196 12.4815 52.7861 12.3849ZM52.6758 31.0963C52.7098 31.092 52.7447 31.0902 52.779 31.0902C53.3991 31.0902 54.5379 29.0602 54.5379 25.7444C54.5379 22.4493 53.4144 20.4287 52.7917 20.4032L50.7922 20.6412C51.4715 22.0681 51.8818 24.1429 51.8818 26.4212C51.8818 28.2322 51.6222 29.9313 51.1701 31.2757L52.6758 31.0963ZM45.6668 31.9318C46.249 30.7604 46.605 28.8712 46.605 26.8494C46.605 24.2421 46.0214 22.1934 45.3805 21.2855L33.4526 22.7055C33.4265 22.7078 33.4021 22.7216 33.376 22.7216C33.3692 22.7216 33.3626 22.7181 33.3557 22.7179C33.9571 24.1373 34.31 26.1089 34.31 28.2302C34.31 30.1802 34.0085 31.9969 33.4954 33.3825L45.6668 31.9318ZM25.4274 34.3441L27.9014 34.0493C28.4903 33.0996 29.033 31.1595 29.033 28.6044C29.033 26.4758 28.6423 24.4967 28.0187 23.3525L25.1233 23.6972C25.9611 25.0707 26.3945 27.1945 26.3945 29.3083C26.3945 31.0542 26.0829 32.9472 25.4274 34.3441ZM25.0533 21.9117L29.2996 21.4071C29.5425 20.678 29.6926 19.6692 29.6926 18.6165C29.6926 16.8465 29.3263 15.6662 29.0493 15.212L24.8504 15.7111C25.2898 16.6304 25.5151 17.8494 25.5151 19.062C25.5151 20.0424 25.3613 21.0564 25.0533 21.9117ZM8.80494 32.937L8.80494 27.6052L8.25229 27.5377C7.77001 27.4794 7.42558 27.0356 7.48363 26.5467C7.5408 26.0585 7.98823 25.7079 8.46106 25.768L9.7827 25.9296C9.78501 25.9298 9.78699 25.9287 9.7893 25.9289L15.0662 26.5702C15.0757 26.5714 15.0834 26.5773 15.093 26.5788L16.1896 26.7128C16.6719 26.7703 17.0171 27.2131 16.9605 27.7022C16.908 28.1555 16.528 28.4887 16.0882 28.4887C16.0539 28.4887 16.0191 28.4869 15.9844 28.4825L15.8409 28.4651L15.8409 33.7922L22.8776 34.6481L22.9552 34.6389C23.5605 34.4899 24.6356 32.5894 24.6356 29.3083C24.6356 25.9924 23.4968 23.9624 22.8766 23.9624C22.8419 23.9624 22.8066 23.9606 22.7719 23.9563L3.43945 21.6083C4.09323 23.0046 4.40754 24.8909 4.40754 26.6353C4.40754 28.7471 3.97769 30.8753 3.14153 32.2483L8.80494 32.937ZM22.8667 22.173C23.121 22.0706 23.7561 20.9991 23.7561 19.062C23.7561 17.1078 23.1051 16.0237 22.8766 15.9436C22.8419 15.9436 22.8066 15.9418 22.7719 15.9375L3.06831 13.5453C3.3747 14.3995 3.52806 15.4109 3.52806 16.3891C3.52806 17.6097 3.2873 18.8192 2.84184 19.7406L22.8667 22.173Z"
                  fill="#519D9E"
                />
              </svg>
            </div>
          </div>
          <div className="modal-middel mt-5">
            <form action="" onSubmit={handleSubmit(onFormSubmit)}>
            <div className=" content-author  p-3 flex flex-col items-start justify-center flex-wrap  gap-3 ">
              <div className=" relative">
                <Input
                  elem="input"
                  type="text"
                  className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-bg"
                  validation={register("name")}
                />
                <p className="bg-bg text-text absolute -top-4 right-2">
                  نام نویسنده
                </p>
                {errors.name && (
                  <h1 className="text-red mt-1"> {errors.name.message}</h1>
                )}
              </div>
              <div className=" relative">
                <Input
                  elem="input"
                  type="text"
                  className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-bg"
                  validation={register("shortName")}
                />
                <p className="bg-bg text-text absolute -top-4 right-2">
                  نام کوتاه
                </p>
                {errors.shortName && (
                  <h1 className="text-red mt-1"> {errors.shortName.message}</h1>
                )}
              </div>
              <div className=" relative w-full">
                <Input
                  className="w-full h-[120px] bg-bg border-solid border-gmain border-1 rounded-lg"
                  validation={register("description")}
                />
                <p className="bg-bg text-text absolute -top-4 right-2">
                  درباره نویسنده
                </p>
                {errors.description && (
                  <h1 className="text-red mt-1">
                    {" "}
                    {errors.description.message}
                  </h1>
                )}
              </div>
              <div className="file flex items-center justify-center gap-3	">
                <h1 className="text-text font-bold">افزودن پروفایل</h1>
                <label  onClick={handleLabelClick}>
                  <span>
                    <img
                      className="cursor-pointer w-8 h-10"
                      src="/images/file.png"
                      alt=""
                    />
                  </span>
                </label>
                <input className="hidden" type="file" ref={inputRef} onChange={(event) =>{
                  setAuthorCover(event.target.files[0])
                }} />
              </div>
              <input
                type="submit"
                className="w-[150px] h-10 bg-gmain text-bg rounded-lg"
                value="افزودن"
              />
            </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
