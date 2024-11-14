import React, { useState, useEffect } from "react";
import BookBoxes from "../BookBoxes/BookBoxes";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function OfferTajak() {
  const [products, setProducts] = useState([]);
  const [productsdiscount, setProductsDiscount] = useState([]);

  const discount = products.filter((product) => product.discount !== 0);

  const getProduct = () => {
    fetch("https://tajak-project.liara.run/api/product", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="offertajak bg-gmelo mt-16 relative">
      <div className="container">
        <div className="offertajak-content">
          <h1 className="offertajak-title text-center w-[300px] mx-auto	bg-bg p-2 text-lg	font-bold rounded-b-lg	text-text">
            تخفیف های تاجک
          </h1>
          <Swiper
            className="py-5"
            spaceBetween={50}
            slidesPerView={6}
            breakpoints={{
              1200: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            }}
          >
            {discount.map((product) => (
              <SwiperSlide key={product._id} className="flex gap-5 flex-row items-center justify-center 	w-[100%]">
                <BookBoxes  {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
