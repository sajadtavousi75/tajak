import React, { useState, useEffect, useCallback,useContext } from "react";
import Modal from "react-modal";
import Input from "../../Input/Input";
import productContext from '../../../Context/productContext/productContext'

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import swal from 'sweetalert'

export default function CategoryContent() {
  const productdata= useContext(productContext)


  const [isModalGroup, setIsModalGroup] = useState(false);
  const [isModalCategory, setIsMOdalCategory] = useState(false);

  const [categories, setCategoreis] = useState([]);
  const [subCategories, setSubCategoreis] = useState([]);
  const [saveCategory, setSaveCategory] = useState([]);
  const [saveSubCategory, setSaveSubCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const schemaCategory = yup.object().shape({
    title: yup.string().required("گروه الزامی است"),
  });

  const schemaSubCategory = yup.object().shape({
    title: yup.string().required("دسته بندی الزامی است"),
    href: yup.string().required("نام دسته بندی الزامی است"),
  });

  const {
    register: registerCategory,
    handleSubmit: handelSubmitCategory,
    formState: { errors: errorsCategory },
  } = useForm({ resolver: yupResolver(schemaCategory) });

  const {
    register: registerSubCategory,
    handleSubmit: handelSubmitSubCategory,
    formState: { errors: errorsSubCategory },
  } = useForm({ resolver: yupResolver(schemaSubCategory) });

  const categoryHandel = (title, id) => {
    setSaveCategory(title);
    setIsModalGroup(false);
    setCategoryId(id);
    getSubCategory(id)
  };

  const subCategoryHandel = (title, id) => {
    setSaveSubCategory(title);
    setIsMOdalCategory(false);
    setSubCategoryId(id);
    productdata.subcategoryID=id
  };

  console.log(categories);
  console.log(saveCategory);

  const onFormSubmitSubCategory = (data) => {
    const localData = JSON.parse(localStorage.getItem("user"));

    const newSubCategory = {
      title: data.title,
      href: data.href,
      categoryID: categoryId,
    };

    fetch("https://tajak-project.liara.run/api/subcategory", {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
      body: JSON.stringify(newSubCategory),
    }).then((res) => {
      if(res.ok){
        swal({
          title: 'گروه با موفقیت ثبت شد',
          icon:'success',
          buttons: 'باشه'
        })
      }
      getSubCategory(categoryId)
    });
  };

  const onFormSubmitCategory = (data) => {
    const localData = JSON.parse(localStorage.getItem("user"));

    fetch("https://tajak-project.liara.run/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if(res.ok){
        swal({
          title: 'گروه با موفقیت ثبت شد',
          icon:'success',
          buttons: 'باشه'
        })
      }
      getCategory();
    });
  };

  const getCategory =() => {
    fetch("https://tajak-project.liara.run/api/category", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoreis(data);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getSubCategory = (id) => {
    const localData = JSON.parse(localStorage.getItem("user"));

    fetch(`https://tajak-project.liara.run/api/subcategory/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubCategoreis(data)
      });
  };


  return (
    <div className="category-content  bg-gmelo rounded-lg pb-5">
      <h1 className="w-[380px] h-10 mx-auto flex items-center justify-center bg-bg text-text font-bold rounded-b-lg shadow-lg">
        1- انتخاب گروه و دسته بندی
      </h1>
      <div className="content flex items-center justify-center gap-5 mt-4">
        <div className="right flex items-center gap-2">
          <div className=" flex flex-col h-[100px] items-center justify-center gap-2">
            <button
              onClick={() => setIsModalGroup(true)}
              className="w-[150px] h-10 bg-gmain text-bg flex items-center justify-center rounded-lg"
            >
              گروه
            </button>
            <button
              onClick={() => setIsMOdalCategory(true)}
              className="w-[150px] h-10 bg-gmain text-bg flex items-center justify-center rounded-lg"
            >
              دسته بندی
            </button>
          </div>
          <svg
            width="39"
            height="96"
            viewBox="0 0 39 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.02085 14.9585C3.0192 14.9581 3.01782 14.9572 3.01643 14.9564C3.01505 14.9556 3.01366 14.9547 3.01201 14.9543C2.73049 14.9426 2.49956 14.7124 2.49956 14.4244C2.49956 14.1295 2.7299 13.8909 3.02131 13.8909C3.17006 13.8413 3.56068 13.1908 3.56068 12.0183C3.56068 10.842 3.16979 10.1953 3.02085 10.1472C3.0195 10.1469 3.01836 10.1462 3.01723 10.1455C3.01609 10.1448 3.01495 10.1441 3.0136 10.1437C2.75806 10.1342 2.5398 9.94053 2.50886 9.67531C2.47483 9.38189 2.68175 9.1162 2.97138 9.08171L19.9782 7.05563C20.6394 6.97625 21.3096 6.97625 21.9713 7.05563L34.2295 8.54713C34.2309 8.5473 34.2323 8.5479 34.2336 8.5485C34.2349 8.54907 34.2361 8.54964 34.2376 8.54987C35.2298 8.61676 35.7497 10.0567 35.7497 11.4837C35.7497 12.4031 35.5336 13.3279 35.115 13.8885C35.5339 14.4491 35.7497 15.3752 35.7497 16.295C35.7497 17.1744 35.5514 18.0586 35.1678 18.6246C35.8981 19.3676 36.2773 20.9097 36.2773 22.4427C36.2773 24.5502 35.5644 26.6834 34.2016 26.7189L16.287 28.8541C16.2664 28.8567 16.2458 28.8577 16.2251 28.8577C16.204 28.8577 16.1831 28.8567 16.1623 28.8541L12.0037 28.3485V30.4615C12.0037 30.7017 11.8455 30.9126 11.617 30.9768C11.5701 30.9898 11.5229 30.9961 11.476 30.9961C11.2941 30.9961 11.1207 30.9005 11.0236 30.7366L9.84425 28.7455L8.73195 30.2475C8.59568 30.4318 8.35861 30.5075 8.14292 30.4338C7.92749 30.3613 7.78218 30.1571 7.78218 29.9269L7.78218 27.8354L2.97013 27.2503C2.69289 27.2164 2.4896 26.97 2.50636 26.6875C2.52285 26.4051 2.75371 26.1848 3.03299 26.1848C3.40508 26.1848 4.08837 24.9668 4.08837 22.9773C4.08837 21.0045 3.44036 19.8627 3.03299 19.7698C2.74157 19.7698 2.49963 19.5312 2.49963 19.2357C2.49963 18.9611 2.69956 18.7351 2.96241 18.7053C2.98299 18.7027 3.00416 18.7011 3.02527 18.7006C3.17652 18.6416 3.56068 17.9927 3.56068 16.8295C3.56068 15.6533 3.16979 15.0065 3.02085 14.9585ZM4.21653 14.0311L16.2195 15.4885C16.3722 15.4267 16.7529 14.784 16.7529 13.622C16.7529 12.4495 16.3623 11.799 16.2252 11.751C16.2044 11.7509 16.1834 11.7499 16.1623 11.7473L4.34021 10.312C4.52404 10.8245 4.61605 11.4314 4.61605 12.0183C4.61605 12.7466 4.48083 13.4793 4.21653 14.0311ZM21.8463 8.11746C21.2681 8.04749 20.6812 8.04856 20.102 8.11746L7.50106 9.61857L16.2262 10.6779L29.0127 9.15108C29.0134 9.15098 29.0141 9.15111 29.0148 9.15124C29.0153 9.15134 29.0158 9.15143 29.0164 9.15145C29.0161 9.15148 29.0166 9.15145 29.0164 9.15145C29.0167 9.15145 29.0177 9.15115 29.0181 9.15108L29.6877 9.07156L21.8463 8.11746ZM17.5312 15.3318L28.9518 13.9744C29.0766 13.5339 29.1536 12.9244 29.1536 12.2856C29.1536 11.9373 29.1332 11.6006 29.093 11.2847C29.0567 11.0005 29.2499 10.7439 29.5254 10.694C29.4836 10.5019 29.4338 10.3327 29.3784 10.1848L29.1412 10.213C29.1405 10.213 29.1399 10.2129 29.1392 10.2128C29.1386 10.2127 29.138 10.2126 29.1373 10.2126L29.1363 10.213L17.4109 11.6131C17.6738 12.1645 17.8083 12.8953 17.8083 13.622C17.8083 14.2103 17.716 14.8186 17.5312 15.3318ZM34.1735 9.61524L32.2694 9.84143C32.4472 10.3637 32.5835 11.0247 32.5835 11.751C32.5835 12.4201 32.5117 13.0477 32.3867 13.5627L34.155 13.3563C34.3037 13.3067 34.6943 12.6562 34.6943 11.4837C34.6943 10.3299 34.3163 9.68206 34.1735 9.61524ZM34.1709 14.427L31.6711 14.7223C31.6669 14.723 31.6632 14.7246 31.6595 14.7262C31.6554 14.728 31.6513 14.7298 31.6467 14.7304L22.7152 15.792C22.7503 15.8748 22.7839 15.9621 22.8162 16.0546C22.8211 16.0531 22.8255 16.0506 22.8298 16.0482C22.8347 16.0454 22.8396 16.0426 22.8453 16.0412C23.1282 15.9759 23.4127 16.154 23.4784 16.4422C23.5674 16.8342 23.6128 17.2342 23.6128 17.6314C23.6128 18.3026 23.5298 18.9281 23.3832 19.4477L29.92 18.6709C29.9219 18.6708 29.9237 18.6705 29.9256 18.6702C29.9275 18.6699 29.9295 18.6695 29.9316 18.6695L32.035 18.4195C32.0371 18.4194 32.0392 18.419 32.0413 18.4187C32.0436 18.4183 32.0459 18.418 32.0483 18.4179L34.155 18.1676C34.3037 18.118 34.6943 17.4675 34.6943 16.295C34.6943 15.1325 34.311 14.485 34.1709 14.427ZM34.1047 25.6539C34.1251 25.6513 34.146 25.6502 34.1666 25.6502C34.5387 25.6502 35.222 24.4322 35.222 22.4427C35.222 20.4657 34.5478 19.2533 34.1742 19.238L32.9745 19.3808C33.3821 20.2369 33.6283 21.4819 33.6283 22.8488C33.6283 23.9354 33.4725 24.9549 33.2013 25.7615L34.1047 25.6539ZM29.8993 26.1551C30.2486 25.4524 30.4622 24.3188 30.4622 23.1057C30.4622 21.5413 30.112 20.3121 29.7275 19.7674L22.5708 20.6194C22.5637 20.62 22.5568 20.6221 22.5499 20.6241C22.5416 20.6266 22.5334 20.6291 22.5248 20.6291C22.5207 20.6291 22.5168 20.627 22.5127 20.6268C22.8735 21.4784 23.0852 22.6614 23.0852 23.9342C23.0852 25.1042 22.9043 26.1942 22.5964 27.0256L29.8993 26.1551ZM17.7557 27.6025L19.2401 27.4257C19.5934 26.8559 19.919 25.6918 19.919 24.1587C19.919 22.8816 19.6846 21.6941 19.3105 21.0076L17.5732 21.2144C18.0759 22.0385 18.3359 23.3128 18.3359 24.5811C18.3359 25.6286 18.1489 26.7644 17.7557 27.6025ZM17.5312 20.1431L20.079 19.8403C20.2247 19.4029 20.3148 18.7976 20.3148 18.166C20.3148 17.104 20.095 16.3958 19.9288 16.1233L17.4095 16.4227C17.6731 16.9744 17.8083 17.7057 17.8083 18.4333C17.8083 19.0216 17.716 19.6299 17.5312 20.1431ZM7.78218 26.7583V23.5592L7.4506 23.5187C7.16122 23.4837 6.95457 23.2175 6.9894 22.9241C7.0237 22.6312 7.29216 22.4209 7.57586 22.4569L8.36884 22.5538L8.37044 22.5537C8.37121 22.5536 8.37197 22.5534 8.3728 22.5534L11.5389 22.9382C11.5419 22.9386 11.5445 22.9397 11.5471 22.9408C11.5497 22.9419 11.5522 22.9429 11.555 22.9433L12.213 23.0238C12.5024 23.0583 12.7095 23.324 12.6755 23.6174C12.644 23.8894 12.416 24.0893 12.1522 24.0893C12.1316 24.0893 12.1107 24.0882 12.0898 24.0856L12.0038 24.0751V27.2714L16.2258 27.785L16.2724 27.7794C16.6355 27.69 17.2806 26.5497 17.2806 24.5811C17.2806 22.5915 16.5973 21.3735 16.2252 21.3735C16.2043 21.3735 16.1832 21.3725 16.1623 21.3699L4.56289 19.9611C4.95516 20.7989 5.14374 21.9306 5.14374 22.9773C5.14374 24.2443 4.88583 25.5213 4.38414 26.3451L7.78218 26.7583ZM16.2193 20.2999C16.3718 20.2385 16.7529 19.5956 16.7529 18.4333C16.7529 17.2608 16.3623 16.6103 16.2252 16.5623C16.2043 16.5623 16.1832 16.5612 16.1623 16.5586L4.3402 15.1233C4.52404 15.6358 4.61605 16.2426 4.61605 16.8295C4.61605 17.5619 4.4716 18.2876 4.20432 18.8405L16.2193 20.2999Z"
              fill="#519D9E"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.5 39.4961C0.5 38.9438 0.947715 38.4961 1.5 38.4961H38C38.5523 38.4961 39 38.9438 39 39.4961C39 40.0484 38.5523 40.4961 38 40.4961H13.5V68.0671H23.5C23.5362 68.0671 23.5719 68.069 23.6071 68.0727C24.0239 66.3087 25.6087 64.9961 27.5 64.9961C29.7091 64.9961 31.5 66.787 31.5 68.9961C31.5 70.6563 30.4885 72.0803 29.0482 72.6854C28.572 72.8855 28.0489 72.9961 27.5 72.9961C27.1547 72.9961 26.8196 72.9523 26.5 72.8701C25.9823 72.7368 25.5052 72.5026 25.091 72.1896C24.3966 71.665 23.8788 70.9192 23.6422 70.057C23.5958 70.0636 23.5483 70.0671 23.5 70.0671H13.5V76.0078H23.5C23.5543 76.0078 23.6076 76.0121 23.6595 76.0205C23.8878 75.3504 24.3464 74.787 24.9411 74.4246C25.3954 74.1478 25.9291 73.9883 26.5 73.9883C26.8506 73.9883 27.1872 74.0484 27.5 74.159C27.9355 74.3129 28.3249 74.5646 28.6418 74.8876C29.1726 75.4288 29.5 76.1703 29.5 76.9883C29.5 77.8171 29.1639 78.5674 28.6206 79.1103C28.3076 79.4231 27.9259 79.6671 27.5 79.8176C27.1872 79.9281 26.8506 79.9883 26.5 79.9883C25.939 79.9883 25.4139 79.8343 24.9648 79.5662C24.3696 79.211 23.9079 78.6556 23.6724 77.993C23.6164 78.0027 23.5588 78.0078 23.5 78.0078H13.5V83.9883H23.5C23.5435 83.9883 23.5864 83.9911 23.6285 83.9965C23.8609 83.1024 24.3949 82.3299 25.1154 81.7941C25.5239 81.4902 25.9925 81.2625 26.5 81.1319C26.8196 81.0496 27.1547 81.0059 27.5 81.0059C28.0392 81.0059 28.5535 81.1126 29.023 81.306C30.4767 81.905 31.5 83.336 31.5 85.0059C31.5 87.215 29.7091 89.0059 27.5 89.0059C25.6273 89.0059 24.0552 87.7189 23.6198 85.9812C23.5805 85.9859 23.5405 85.9883 23.5 85.9883H11.5V40.4961H1.5C0.947715 40.4961 0.5 40.0484 0.5 39.4961ZM29.5 68.9961C29.5 70.1007 28.6046 70.9961 27.5 70.9961C26.3954 70.9961 25.5 70.1007 25.5 68.9961C25.5 67.8915 26.3954 66.9961 27.5 66.9961C28.6046 66.9961 29.5 67.8915 29.5 68.9961ZM27.5 76.9883C27.5 77.5406 27.0523 77.9883 26.5 77.9883C25.9477 77.9883 25.5 77.5406 25.5 76.9883C25.5 76.436 25.9477 75.9883 26.5 75.9883C27.0523 75.9883 27.5 76.436 27.5 76.9883ZM29.5 85.0059C29.5 86.1104 28.6046 87.0059 27.5 87.0059C26.3954 87.0059 25.5 86.1104 25.5 85.0059C25.5 83.9013 26.3954 83.0059 27.5 83.0059C28.6046 83.0059 29.5 83.9013 29.5 85.0059Z"
              fill="#519D9E"
            />
          </svg>
        </div>
        <div className="left w-[350px] h-[100px] p-3 flex items-center justify-center border-solid border-gmain border-x-2 rounded-lg">
          <div className="left-content flex gap-2">
            <div className="w-[150px] h-10 bg-bg rounded-lg flex items-center justify-center text-text">
              {saveCategory.length ? (
                <span>{saveCategory}</span>
              ) : (
                <span>گروه</span>
              )}
            </div>
            <img
              className="w-[15px] h-10"
              src="/images/adminprofile/arow.png"
              alt=""
            />
            <div className="w-[150px] h-10 bg-bg rounded-lg flex items-center justify-center text-text">
              {saveSubCategory.length ? (
                <span>{saveSubCategory}</span>
              ) : (
                <span>دسته بندی</span>
              )}
              
            </div>
          </div>
        </div>
      </div>
      <div className="modal-group">
        <Modal
          className="w-[400px] h-[500px] overflow-y-auto	mt-[130px] bg-bg  mx-auto p-4 font-roya md:w-[750px] rounded-lg "
          isOpen={isModalGroup}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <div className="modal-top flex flex-wrap items-center justify-start gap-2 md:justify-between">
            <div
              onClick={() => setIsModalGroup(false)}
              className="bg-gmain w-10 h-10 flex items-center justify-center rounded-full hover:bg-gmelo hover:text-text"
            >
              <img src="/images/close.svg" alt="" />
            </div>
            <div className="flex gap-2 mt-3">
              <h1 className="text-text font-bold">انتخاب گروه</h1>
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
            {categories.length ? (
              <div className="content-group bg-gmelo  p-3 flex items-center justify-center flex-wrap  gap-3">
                {categories.map((category) => (
                  <div className="w-[180px] h-10 border-solid border-gmain border-x-2 rounded-lg p-2 flex items-center justify-center">
                    <span
                      onClick={() =>
                        categoryHandel(category.title, category._id)
                      }
                    >
                      {category.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="  text-center font-bold text-text">
                تاکنون هیچ گروهی ایجاد نشده است.
              </h1>
            )}
          </div>
          <div className="modal-botton">
            <div className="added-group border-dotted border-gmain border-2 rounded-lg mt-5 h-auto">
              <h1 className="text-center font-bold text-text h-[55px] border-solid border-gmain border-b-2 flex items-center justify-center">
                افزودن گروه جدید
              </h1>
              <form
                action=""
                onSubmit={handelSubmitCategory(onFormSubmitCategory)}
              >
                <div className="flex flex-col items-center justify-center pt-4 gap-4">
                  <div className=" relative">
                    <Input
                      elem="input"
                      type="text"
                      className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-bg"
                      validation={registerCategory("title")}
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                      عنوان گروه
                    </p>
                    {errorsCategory.title && (
                      <h1 className="text-red mt-1">
                        {" "}
                        {errorsCategory.title.message}
                      </h1>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="w-[150px] h-10 bg-gmain text-bg rounded-lg"
                    value="افزودن"
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
      <div className="modal-category">
        <Modal
          className="w-[400px] h-[500px] overflow-y-auto	mt-[130px] bg-bg  mx-auto p-4 font-roya md:w-[750px] rounded-lg "
          isOpen={isModalCategory}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <div className="modal-top flex flex-wrap items-center justify-start gap-2 md:justify-between">
            <div
              onClick={() => setIsMOdalCategory(false)}
              className="bg-gmain w-10 h-10 flex items-center justify-center rounded-full hover:bg-gmelo hover:text-text"
            >
              <img src="/images/close.svg" alt="" />
            </div>
            <div className="flex gap-2 mt-3">
              <h1 className="text-text font-bold">انتخاب دسته</h1>
            </div>
            <div>
              <svg
                width="19"
                height="41"
                viewBox="0 0 19 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5V21.1803M12 37.1016H1V21.1803M1 21.1803H12M1 29.1211H12"
                  stroke="#519D9E"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M18 20.4883C18 22.1451 16.6569 23.4883 15 23.4883C13.3431 23.4883 12 22.1451 12 20.4883C12 18.8314 13.3431 17.4883 15 17.4883C16.6569 17.4883 18 18.8314 18 20.4883ZM16 28.4805C16 29.585 15.1046 30.4805 14 30.4805C12.8954 30.4805 12 29.585 12 28.4805C12 27.3759 12.8954 26.4805 14 26.4805C15.1046 26.4805 16 27.3759 16 28.4805ZM18 36.498C18 38.1549 16.6569 39.498 15 39.498C13.3431 39.498 12 38.1549 12 36.498C12 34.8412 13.3431 33.498 15 33.498C16.6569 33.498 18 34.8412 18 36.498Z"
                  stroke="#519D9E"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
          <div className="modal-middel mt-5 ">
            {subCategories.length ? (
              <div className=" content-group bg-gmelo  p-3 flex items-center justify-center flex-wrap  gap-3 rounded-lg">
                {subCategories.map((sub) =>(
                  <div className="w-[180px] h-10 border-solid border-gmain border-x-2 rounded-lg p-2 flex items-center justify-center">
                  <span
                  onClick={() =>
                    subCategoryHandel(sub.title, sub._id)
                  }
                  >{sub.title}</span>
                </div>
                ))}
            </div>
            ) : (
              <h1 className=" text-center font-bold text-text">
              در گروه انتخابی هیچ دسته ای وجود ندارد
            </h1>
            )}
            
            
          </div>
          <div className="modal-botton">
            <div className="added-group border-dotted border-gmain border-2 rounded-lg mt-5 h-[160px]">
              <h1 className="text-center font-bold text-text h-[55px] border-solid border-gmain border-b-2 flex items-center justify-center">
                افزودن دسته جدید
              </h1>
              <form
                action=""
                onSubmit={handelSubmitSubCategory(onFormSubmitSubCategory)}
              >
                <div className="flex items-center justify-center pt-4 gap-4">
                  <div className=" relative">
                    <Input
                      elem="input"
                      type="text"
                      className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-bg"
                      validation={registerSubCategory("title")}
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                      عنوان دسته
                    </p>
                    {errorsSubCategory.title && (
                      <h1 className="text-red mt-1">
                        {" "}
                        {errorsSubCategory.title.message}
                      </h1>
                    )}
                  </div>
                  <div className=" relative">
                    <Input
                      elem="input"
                      type="text"
                      className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-bg"
                      validation={registerSubCategory("href")}
                    />
                    <p className="bg-bg text-text absolute -top-4 right-2">
                      نام دسته
                    </p>
                    {errorsSubCategory.href && (
                      <h1 className="text-red mt-1">
                        {" "}
                        {errorsSubCategory.href.message}
                      </h1>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="w-[150px] h-10 bg-gmain text-bg rounded-lg"
                    value="افزودن"
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
