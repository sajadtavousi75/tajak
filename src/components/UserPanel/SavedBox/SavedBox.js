import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function SavedBox({ data, onclick }) {
  const deleteProduct = (id) => {};
  return (
    <div className="savedbox">
      <div className="savedbox-content group h-[370px]">
        <Link to={`/book/${data.product.shortName}`}>
        <div className="book-box  border-solid border-1 border-gmain rounded-lg p-2 p-2 bg-gmelo	   w-[160px] h-[350px] rounded-lg transition duration-300 ease-in-out group-hover:bg-gmain group-hover:text-bg group-hover:transition duration-300 ease-in-out">
          <div className="relative">
            <img
              src={`https://tajak-project.liara.run/uploads/${data.product.cover}`}
              alt=""
              className="book-box-img w-[150px] h-[220px] rounded-lg mx-auto 	"
            />
            {data.product.discount !== 0 ? (
                <div className="discount w-12 h-8 bg-red absolute top-0 right-0 p-1 text-white rounded-tr-lg">% {data.product.discount}</div>
              ) : (
                ''
              )}
            <div className="book-box-img__icon hidden w-full bg-gmainhover rounded-b-lg	 h-4 mx-auto  items-center justify-between	absolute bottom-0 left-0  p-3 group-hover:flex	group-hover:transition duration-100 ease-in-out">
              {data.product.printed && data.product.printed[0].shabook !== "null" ? (
                <img
                  className="w-[30px] 	"
                  src="/images/slider/Vector.png"
                  alt=""
                />
              ) : (
                ""
              )}
              {data.product.digital && data.product.audio[0].speaker !== "null" ? (
                <img
                  className="w-[30px]"
                  src="/images/slider/Vector1.png"
                  alt=""
                />
              ) : (
                ""
              )}
              {data.product.audio && data.product.digital[0].format !== "null" ? (
                <img
                  className="w-[30px]"
                  src="/images/slider/Vector2.png"
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <h1 className="book-box__title font-bold text-end mr-4 mt-2">
            {data.product.name}
          </h1>
          {data.product.discount !== 0 ? (
              <div className="flex relative">
              <h1 className="book-box__price text-start font-bold ml-4 "> {(data.product.printed && data.product.printed[0].pricePrinted) - (data.product.printed &&data.product.printed[0].pricePrinted *data.product.discount /100)} تومان</h1>
              <h1 className="book-box__price text-start font-bold ml-4"> {data.product.printed && data.product.printed[0].pricePrinted} تومان</h1>
              <div className="w-12 h-[1.5px] bg-red absolute left-0 -rotate-[30deg] translate-x-4 translate-y-3		rounded-lg"></div>
              </div>
            ) : (
              <h1 className="book-box__price text-start font-bold ml-4"> {data.product.printed && data.product.printed[0].pricePrinted} تومان</h1>
            )}
        </div>
        </Link>
        <div
          onClick={() => onclick(data._id)}
          className="cursor-pointer w-full transition duration-300 ease-in-out h-10 hidden items-center justify-center bg-gmain rounded-lg mt-1 group-hover:flex group-hover:transition duration-300 ease-in-out"
        >
          <img className="	" src="/images/deletprofile.png" alt="" />
        </div>
      </div>
    </div>
  );
}
