import React,{useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";



 
import "./BookBoxes.css";

export default function BookBoxes(props) {

  const handelClik =() =>{

    window.scrollTo(0,0)
  }

  return (
    <div className="book-boxes ">
          <Link to={`/book/${props.shortName}`} onClick={handelClik}>
          <div className="book-box border-solid border-1 border-gmain rounded-lg p-2	   w-[160px] h-[360px] rounded-lg transition duration-300 ease-in-out hover:bg-gmain hover:text-bg hover:transition duration-300 ease-in-out">
            <div className="relative">
              <img
                src={`https://tajak-project.liara.run/uploads/${props.cover}`}
                alt=""
                className="book-box-img w-[150px] h-[220px] rounded-lg mx-auto 	relative"
              />
              {props.discount !== 0 ? (
                <div className="discount w-10 h-6 bg-red absolute top-0 right-[5px] p-1 text-white rounded-tr-lg">% {props.discount}</div>
              ) : (
                ''
              )}
              <div className="book-box-img__icon w-[120px] bg-gmainhover rounded-b-lg	 h-4 mx-auto flex items-center justify-around	absolute bottom-0 left-[4px]  p-3	hover:transition duration-100 ease-in-out">
                {(props.printed && props.printed[0].shabook !== 'null') ? (

                <img
                  className="w-[30px] 	"
                  src="/images/slider/Vector.png"
                  alt=""
                />
                ) : (
                  ''
                )}
                {(props.digital && props.audio[0].speaker!== 'null') ? (

                <img
                  className="w-[30px]"
                  src="/images/slider/Vector1.png"
                  alt=""
                />
                ) : (
                  ''
                )}
                {(props.audio && props.digital[0].format !== 'null' ) ? (
                <img
                  className="w-[30px]"
                  src="/images/slider/Vector2.png"
                  alt=""
                />
                ) : (
                  ''
                )}
              </div>
            </div>
            <h1 className="book-box__title font-bold text-end mr-4 mt-2">
              {props.name}
            </h1>
            <h3 className="book-box__name text-end mr-4">{props.authorID && props.authorID.name}</h3>
            {props.discount !== 0 ? (
              <div className="flex relative">
              <h1 className="book-box__price text-start font-bold ml-4 "> {(props.printed && props.printed[0].pricePrinted) - (props.printed && props.printed[0].pricePrinted * props.discount /100)} تومان</h1>
              <h1 className="book-box__price text-start font-bold ml-4"> {props.printed && props.printed[0].pricePrinted} تومان</h1>
              <div className="w-12 h-[1.5px] bg-red absolute left-0 -rotate-[30deg] translate-x-4 translate-y-3		rounded-lg"></div>
              </div>
            ) : (
              <h1 className="book-box__price text-start font-bold ml-4"> {props.printed && props.printed[0].pricePrinted} تومان</h1>
            )}
          </div>
          </Link>
    </div>
  );
}
