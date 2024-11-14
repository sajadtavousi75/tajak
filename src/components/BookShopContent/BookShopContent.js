import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookBox from "../BookBox/BookBox";
import BookBoxes from "../BookBoxes/BookBoxes";

import './BookShopContent.css'
import Loader from "../Loader/Loader";

export default function BookShopContent() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
const [originalData , setOriginalData] = useState([])

const { categoryName } = useParams();

  const [value, setValue] =useState('')
  const [publisherValue , setPublisherValue]= useState('')


  useEffect(() => {
    fetchData();  // اجرای fetchData در هر تغییر value
  }, [value,allCategory]);
  
  useEffect(()=>{
    fetchDataPublisher()
  },[publisherValue])

  const fetchData =  () => {
    const result = allCategory.filter((category) => (
      category.authorID.name === value
    ));
    setCategories(result);
    
  };
  const fetchDataPublisher =  () => {
    const result = allCategory.filter((category) => (
      category.publisher === publisherValue
    ));
    setCategories(result);
    
  };

  useEffect(()=>{
    setCategories(allCategory)
  },[allCategory,categoryName])

  const handelSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  

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

  const getAuthor = () => {
    fetch("https://tajak-project.liara.run/api/author", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data)

      });
  };

  useEffect(() => {
    getAuthor();
  }, []);

  return (
    
    <>

    <div className="bookshopcontent py-16   h-full ">
      <div
        className={`${
          showSidebar ? "translate-x-5 " : "translate-x-[300px]"
        } sidebar transition-all duration-700 absolute top-30 w-[240px] h-full bg-bg z-10 	  	 md:translate-x-0`}
      >
        <div className="container">
          <div className="sidebar-content p-3">
            <img
              onClick={closeSidebar}
              className="cursor-pointer md:hidden"
              src="/images/filter.png"
              alt=""
            />
            <div className="sidebar-title border-solid border-gmain border-2 rounded-lg flex items-center justify-center mt-5 text-text font-bold">
              <span>{categoryName}</span>
            </div>
            <div className="search-author">
              <h1 className="bg-gmain text-bg text-center p-1 rounded-lg font-bold mt-3">
                نویسندگان
              </h1>
              <div className="list-author border-solid border-gmain border-x-2 rounded-lg p-2 h-[250px] overflow-auto	">
                <form className="">
                    {authors.map((author ,index) =>(
                  <div key={author._id} className="flex items-center gap-2">
                    <label className="flex items-center font-roya font-bold tet-text">
                    <input onChange={(event) => setValue(event.target.value)} className="ml-2" type="radio"  name="option" value={author.name}/>
                    {author.name}
                    </label>
                    
                  </div>
                    ))}
                </form>
              </div>
            </div>
            <div className="search-author">
              <h1 className="bg-gmain text-bg text-center p-1 rounded-lg font-bold mt-3">
                انتشارات
              </h1>
              <div className="border-solid border-gmain border-x-2 rounded-lg p-2">
                <form>
                  <div className="flex items-center gap-2">
                    <input onChange={(event) => setPublisherValue(event.target.value)} type="radio" id="value1" name="option" value='نشر ماهی'/>
                    <label className="flex items-center font-roya font-bold tet-text" htmlFor="value1">نشر ماهی</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input onChange={(event) => setPublisherValue(event.target.value)} type="radio" id="value2" name="option" value='انتشارات نگاه'/>
                    <label className="flex items-center font-roya font-bold tet-text" htmlFor="value2">انتشارات نگاه</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input onChange={(event) => setPublisherValue(event.target.value)} type="radio" id="value3" name="option" value='نشر چشمه'/>
                    <label className="flex items-center font-roya font-bold tet-text" htmlFor="value3">نشر چشمه</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input onChange={(event) => setPublisherValue(event.target.value)} type="radio" id="value4" name="option" value='نشر نی'/>
                    <label className="flex items-center font-roya font-bold tet-text" htmlFor="value4">نشر نی</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-shop   z-0 md:mr-[240px] 	">
        <div className="container ">
          <div className="mainshop-search flex items-center  gap-16 md:justify-center">
            <img
              onClick={handelSidebar}
              className="cursor-pointer md:hidden"
              src="/images/filter.png"
              alt=""
            />
            <div className="flex items-center  gap-2  ">
              <button className="border-solid border-gmain border-2 rounded-lg text-text p-1 text-xs font-bold md:text-sm">
                محبوبترین ها
              </button>
              <button className="border-solid border-gmain border-2 rounded-lg text-text p-1 text-xs font-bold md:text-sm">
                جدیدترین ها
              </button>
              <button className="border-solid border-gmain border-2 rounded-lg text-text p-1 text-xs font-bold md:text-sm">
                تخفیف ها
              </button>
            </div>
          </div>
          <div className="mainshop-boxes  bg-gmelo mt-3 rounded-lg min-h-[50vh] sm:min-h-[90vh] lg:min-h-[100vh] ">
            {categories.length ? (
              <div className="mainshop-box flex flex-wrap items-center justify-center gap-3 py-4">
                {categories.map((category) => (
                  <BookBox key={category._id} {...category} />
                ))}
              </div>
            ) : (
              <div className="mainshop-boxes flex items-center justify-center  bg-gmelo mt-3 rounded-lg h-[100vh]">
                <h1 className="text-text font-roya font-bold text-xl">در این دسته بندی محصولی وجود ندارد</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
