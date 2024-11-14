import React, { useState,useContext } from "react";
import Switch from "../Switch/Switch";

import productContext from '../../../Context/productContext/productContext'

export default function PrintedVersion() {

  const productdata= useContext(productContext)

  
  const [printValue, setPrintValue] = useState(false);
  return (
    <div className="printedversion ">
      <div
        className={`content w-[80%] mx-auto border-dashed border-gmain border-2 p-3 mt-5 overflow-hidden	 rounded-lg transition-all duration-700  ${
          printValue ? "h-[420px]" : "h-[65px]"
        }`}
      >
        <div className={`flex gap-2 items-center justify-start `}>
          <Switch
            ison={printValue}
            handeltoggle={() => setPrintValue(!printValue)}
            name={"toggle"}
          />
          <h1>نسخه چاپی</h1>
        </div>
        <div
          className={`form mt-5 flex flex-col gap-5 transition-all duration-700 ${
            printValue ? "" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className=" relative">
              <input
                className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
                type="text"
                onChange={(event) =>{productdata.shabook = event.target.value}}
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">شابک</p>
            </div>
            <div className=" relative">
              <input
                className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
                type="text"
                onChange={(event) =>{productdata.yearsPublish = event.target.value}}
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">
                سال انتشار
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className=" relative">
              <input
                className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
                type="text"
                onChange={(event) =>{productdata.cut = event.target.value}}
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">قطع</p>
            </div>
            <div className=" relative">
              <input
                className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
                type="text"
                onChange={(event) =>{productdata.coverType = event.target.value}}
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">
                نوع جلد
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className=" relative">
              <input
                className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
                type="text"
                onChange={(event) =>{productdata.numberPagePrinted = event.target.value}}
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">
                تعداد صفحه
              </p>
            </div>
            <div className=" relative">
              <input
                className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
                type="text"
                onChange={(event) =>{productdata.printNumber = event.target.value}}
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">
                شماره چاپ
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className=" relative">
              <input
                className="w-[270px] h-10 border-solid border-gmain border-1 p-1 rounded-lg bg-gmelo 	"
                type="text"
                onChange={(event) =>{productdata.pricePrinted = event.target.value}}
              />
              <p className="bg-gmelo text-text absolute -top-4 right-2">قیمت</p>
            </div>
            <div className="">
              <img
                className="w-[40px] h-[36px] flex justify-start"
                src="/images/book/Vector3.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
