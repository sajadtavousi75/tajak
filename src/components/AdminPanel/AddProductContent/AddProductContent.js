import React,{useContext,useEffect, useState, useCallback} from "react";
import CategoryContent from "../CategoryContent/CategoryContent";
import DetailsContentBook from "../DetailsContentBook/DetailsContentBook";
import AboutBook from "../AboutBook/AboutBook";
import VrsionsBox from "../VersionsBox/VrsionsBox";

import productContext from '../../../Context/productContext/productContext'


export default function AddProductContent() {

  const productDataFromContext = useContext(productContext);



  const productData ={
    name:productDataFromContext.name,
    translator:productDataFromContext.translator,
    publisher:productDataFromContext.publisher,
    description:productDataFromContext.description,
    cover:productDataFromContext.cover,
    shortName:productDataFromContext.shortName,
    discount:productDataFromContext.discount,
    subcategoryID:productDataFromContext.subcategoryID,
    authorID:productDataFromContext.authorID,
    fileDigital: productDataFromContext.fileDigital,
    fileAudio: productDataFromContext.fileAudio,
      shabook: productDataFromContext.shabook,
      yearsPublish: productDataFromContext.yearsPublish,
      cut: productDataFromContext.cut,
      coverType: productDataFromContext.coverType,
      numberPagePrinted: productDataFromContext.numberPagePrinted,
      printNumber: productDataFromContext.printNumber,
      pricePrinted: productDataFromContext.pricePrinted,
      format: productDataFromContext.format,
      numberPageDigital: productDataFromContext.numberPageDigital,
      volume: productDataFromContext.volume,
      priceDigital: productDataFromContext.priceDigital,
      speaker: productDataFromContext.speaker,
      priceAudio: productDataFromContext.priceAudio,
      publishAudio: productDataFromContext.publishAudio,
  }

  const addProduct =(event)=>{
    event.preventDefault()
    const localData = JSON.parse(localStorage.getItem("user"));
    
    const formData = new FormData()

    formData.append("name", productData.name );
    formData.append('translator' , productData.translator);
    formData.append('publisher' , productData.publisher);
    formData.append('description' , productData.description);
    formData.append('cover' , productData.cover);
    formData.append('shortName' , productData.shortName);
    formData.append('discount' , productData.discount);
    formData.append('subcategoryID' , productData.subcategoryID);
    formData.append('authorID' , productData.authorID);
    formData.append('fileDigital' , productData.fileDigital);
    formData.append('shabook' , productData.shabook);
    formData.append('yearsPublish' , productData.yearsPublish);
    formData.append('cut' , productData.cut);
    formData.append('coverType' , productData.coverType);
    formData.append('numberPagePrinted' , productData.numberPagePrinted);
    formData.append('printNumber' , productData.printNumber);
    formData.append('pricePrinted' , productData.pricePrinted);
    formData.append('format' , productData.format);
    formData.append('numberPageDigital' , productData.numberPageDigital);
    formData.append('volume' , productData.volume);
    formData.append('priceDigital' , productData.priceDigital);
    formData.append('speaker' , productData.speaker);
    formData.append('priceAudio' , productData.priceAudio);
    formData.append('publishAudio' , productData.publishAudio);
    formData.append('fileAudio' , productData.fileAudio);;

    console.log(productData)


    fetch('https://tajak-project.liara.run/api/product',{
      method:'POST',
      headers: {
        // "Content-Type" : "multipart/form-data",
        Authorization: `Bearer ${localData.token}`,
      },
      body: formData
    }).then((res) => {
    })
    
  }

  const getProduct = useCallback(() => {
    fetch("https://tajak-project.liara.run/api/product", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
      });
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  
  return (
    <>
    <productContext.Provider value={productData} >
      <div className="addproduct-content pt-14 pb-5">
      <CategoryContent />
      <DetailsContentBook />
      <AboutBook />
      <VrsionsBox />
    </div>
    </productContext.Provider>
    <div className="add flex items-center justify-center mt-5">
        <button 
        onClick={addProduct}
        className="w-[150px] h-20 bg-gmelo text-text group rounded-lg flex gap-2 font-bold items-center justify-center transition-all duration-700 hover:text-bg hover:bg-gmain">
          <h1>افزودن محصول</h1>
          <svg
          className="fill-gmain transition-all duration-700 group-hover:fill-bg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            // fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 16C0 14.5272 1.19391 13.3333 2.66667 13.3333H29.3333C30.8061 13.3333 32 14.5272 32 16C32 17.4728 30.8061 18.6667 29.3333 18.6667H2.66667C1.19391 18.6667 0 17.4728 0 16Z"
              
            />
            <path
              d="M16 0C17.4728 6.43764e-08 18.6667 1.19391 18.6667 2.66667L18.6667 29.3333C18.6667 30.8061 17.4728 32 16 32C14.5272 32 13.3333 30.8061 13.3333 29.3333L13.3333 2.66667C13.3333 1.19391 14.5272 -6.43764e-08 16 0Z"
              
            />
          </svg>
        </button>
      </div>
    </>
  );
}
