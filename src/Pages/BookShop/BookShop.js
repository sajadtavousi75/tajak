import React, { useCallback, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BookShopContent from "../../components/BookShopContent/BookShopContent";
import Loader from "../../components/Loader/Loader";

export default function BookShop() {
  const [search, setSearch] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  window.scrollTo(0, 0);

  const { categoryName } = useParams();

  const getProductCategory = useCallback(() => {
    fetch(`https://tajak-project.liara.run/api/product/category/${categoryName}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllCategory(data);
      });
  }, [categoryName]);

  useEffect(() => {
    getProductCategory();
  }, [categoryName]);

  return (
    <>
      <Navbar />
      <section className="main font-roya bg-bg pt-[120px]">
        <div className="container">
          {allCategory.length? (
            <>
            <div className="breadcrumb mt-2 flex items-center gap-2">
              <Link className="text-gmain  font-bold" to="/">
                {" "}
                تاجک{" "}
              </Link>
              <svg
                width="9"
                height="17"
                viewBox="0 0 9 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.90625 0.5V4.1128L4.26991 8.50167L8.90625 12.8872V16.5L0.45342 8.50167L8.90625 0.5Z"
                  fill="#519D9E"
                />
              </svg>
              <Link
                className="text-gmain  font-bold"
                to={`/shop/${categoryName}`}
              >
                {" "}
                {categoryName}{" "}
              </Link>
            </div>
            <BookShopContent />
            </>
          ) : (
            <>
            <Loader />
            </>
          )}
        </div>
      </section>
      <footer className="font-roya bg-bg">
        <Footer />
      </footer>
    </>
  );
}
