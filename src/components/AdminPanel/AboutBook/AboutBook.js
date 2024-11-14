import React,{useContext} from "react";
import productContext from '../../../Context/productContext/productContext'

export default function AboutBook() {
  const productdata= useContext(productContext)
  console.log(productdata)

  return (
    <div className="aboutbook-content bg-gmelo rounded-lg pb-5 mt-5">
      <h1 className="w-[300px] h-10 mx-auto flex items-center justify-center bg-bg text-text font-bold rounded-b-lg shadow-lg">
      3- درباره کتاب
      </h1>
      <div className="text flex items-center justify-center mt-5">
      <textarea onChange={(event) =>{productdata.description = event.target.value}} className="w-[560px] h-[200px] bg-gmelo border-solid border-gmain border-1 rounded-lg p-3 text-text "></textarea>
      </div>
    </div>
  );
}
