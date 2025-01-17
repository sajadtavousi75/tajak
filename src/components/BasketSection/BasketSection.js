import React, { useEffect, useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import BasketBoxes from "../BasketBoxes/BasketBoxes";
import BasketPay from "../BasketPay/BasketPay";
import NotFound from "../UserPanel/NotFound/NotFound";
import NotifContext from "../../Context/ShowNotif/ShowNotif";
import AddresBox from "../UserPanel/AddresBox/AddresBox";
import Modal from "react-modal";
import Loader from "../Loader/Loader";

export default function BasketSection() {
  const [products, setProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [sum, setSum] = useState("");
  const [address , setAddress] =useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowAddres, setIsShowAddres] = useState(false);
  const [addresData, setAddresData] = useState({})

  const navigate=useNavigate()

  const localData = JSON.parse(localStorage.getItem("user"));
  const context= useContext(NotifContext)

  if(products.length === 0){
    setTimeout(() => {
      setShowLoader(true)
    }, 300);
  }
  
  const getProducts = () => {

    fetch("https://tajak-project.liara.run/api/user/products", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localData === null ? null : localData.token
        }`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    if(localData){
      getProducts();
    }
  }, []);

  const productPlus = (id) => {
    const localData = JSON.parse(localStorage.getItem("user"));

    fetch(`https://tajak-project.liara.run/api/user/products/plus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        getProducts();
      }
    });
  };

  const productMin = (id) => {
    const localData = JSON.parse(localStorage.getItem("user"));

    fetch(`https://tajak-project.liara.run/api/user/products/min/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        getProducts();
      }
    });
  };

  const deleteProduct = (id) => {
    const localData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "ایا ار حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`https://tajak-project.liara.run/api/user/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            getProducts();
            context.handelNotif()
          }
        });
      }
    });
  };

  const getAddres = ()=>{
    
  
    fetch('https://tajak-project.liara.run/api/user/addres',{
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localData === null ? null : localData.token
        }`,
      }
    }).then((res) => res.json())
    .then((data) => {
      setAddress(data)
    })
  }
  
  useEffect(() =>{
    if(localData){

      getAddres()
    }
  },[])

  const handelAddress=()=>{
    const localData = JSON.parse(localStorage.getItem("user"));
    if(address.length){
      setIsModalOpen(true)
    }else if(!address.length && !localData){
      swal({
        title:'ابتدا در سایت لاگین کنید',
        icon:'warning',
        buttons:'ورود به صفحه لاگین'
      }).then(value =>{
        navigate('/login')
      })
    }else{
      navigate('/my-account/addres')
    }
  }



  return (
    <div className="basketsection">
      {showLoader?(
        <div className="content flex flex-col lg:flex-row items-center  justify-between">
        <div className="basketboxes min-h-[400px] w-[300px] md:w-[600px] lg:w-[800px] bg-gmelo rounded-lg p-3 my-5">
          {products.length ? (
            <div className="content flex flex-col gap-2">
              {products.map((product) => (
                <div key={product._id} className="basketbox border-solid border-gmain border-1  p-2 rounded-lg">
                  <div className="content flex items-center justify-between">
                    <div className="details flex items-center gap-3 w-[300px]">
                      <div className="img flex items-center gap-1">
                        <div className="w-8 h-20 bg-gmain flex items-center justify-center rounded-lg">
                          <img className="" src="/images/madalimg.png" alt="" />
                        </div>
                        <img
                          className="w-[50px] h-20 rounded-lg"
                          src={`https://tajak-project.liara.run/uploads/${product.product.cover}`}
                          alt=""
                        />
                      </div>
                      <div className="name">
                        <h1 className="text-text font-bold">
                          {product.product.name}
                        </h1>
                        {/* <h1 className="text-text font-bold">نام نویسنده</h1> */}
                      </div>
                    </div>
                    <div className="count w-[150px]">
                      <div className="w-full flex items-center justify-around font-bold">
                        <button
                          onClick={() => productPlus(product._id)}
                          className="text-gmain text-2xl"
                        >
                          +
                        </button>
                        <span>{product.count}</span>
                        <button
                          onClick={() => productMin(product._id)}
                          className="text-gmain text-2xl"
                        >
                          -
                        </button>
                      </div>
                      <div className="w-full flex items-center justify-center 	">
                        <img
                          onClick={() => deleteProduct(product._id)}
                          className="cursor-pointer"
                          src="/images/deletprofile.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="price flex flex-col items-center justify-center">
                      <span>
                        {product.product.printed[0].pricePrinted} تومان
                      </span>
                      <span className="font-bold text-2xl">
                        {product.product.printed[0].pricePrinted *
                          product.count}{" "}
                        تومان
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NotFound  title='تا کنون محصولی ثبت نشده است'/>
          )}
        </div>
        <div className="basketpay w-[330px] my-3 ">
          <div className="content">
            <h1 className="bg-gmelo w-[320] h-10 rounded-lg flex items-center justify-center font-bold shadow-lg">
              سبد خرید
            </h1>
            <div className="price mt-3 flex items-center justify-around">
              <span>جمع :</span>
              <span className="">
                {" "}
                تومان
                {products.reduce(
                  (total, item) =>
                    total + item.count * item.product.printed[0].pricePrinted,
                  0
                )}
              </span>
            </div>
            <div className="discount mt-3 flex items-center justify-around">
              <span className="text-red">تخفیف :</span>
              <span>
                {" "}
                تومان {products.reduce((total, item) => total + (item.count * item.product.printed[0].pricePrinted) * item.product.discount/100 ,0)}
              </span>
            </div>
            <div className={`${isShowAddres ? 'hidden': ''} addres flex flex-col items-center justify-center gap-3 mt-3`}>
            <h1 className="text-text text-xs mt-5 text-center">
              *برای مشاهده هزینه ارسال ، ابتدا آدرس را انتخاب کنید
            </h1>
              <div className="flex items-center justify-center gap-2">
              <button onClick={handelAddress} className="w-[150px] h-10 bg-gmain text-bg flex items-center justify-center rounded-lg">
                انتخاب آدرس
              </button>
              <svg
                width="18"
                height="26"
                viewBox="0 0 18 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00037 0C3.61694 0 0 3.08559 0 7.67801C0 13.7645 7.7387 24.7383 7.81576 24.8241C7.96476 24.9905 8.14716 25.1236 8.35107 25.2148C8.55497 25.306 8.77581 25.3532 8.99917 25.3533C9.22254 25.3534 9.44342 25.3064 9.64741 25.2155C9.85141 25.1245 10.0339 24.9915 10.1831 24.8253C10.2613 24.7383 18 13.7645 18 7.67801C18 3.08559 14.3832 0 9.00037 0ZM9 14.9218C7.82996 14.9218 6.6862 14.5748 5.71335 13.9248C4.7405 13.2747 3.98225 12.3508 3.5345 11.2698C3.08674 10.1889 2.96959 8.99938 3.19786 7.85182C3.42612 6.70427 3.98955 5.65017 4.81689 4.82282C5.64423 3.99548 6.69833 3.43205 7.84589 3.20379C8.99345 2.97553 10.1829 3.09268 11.2639 3.54043C12.3449 3.98818 13.2688 4.74643 13.9188 5.71928C14.5689 6.69213 14.9158 7.83589 14.9158 9.00593C14.9158 9.78281 14.7628 10.5521 14.4655 11.2698C14.1682 11.9876 13.7325 12.6397 13.1831 13.1891C12.6338 13.7384 11.9816 14.1742 11.2639 14.4715C10.5462 14.7688 9.77688 14.9218 9 14.9218Z"
                  fill="#519D9E"
                />
                <path
                  d="M12.9394 11.5417C12.907 11.5932 12.8746 11.6408 12.8403 11.6904C12.4089 12.3087 11.8345 12.8137 11.1661 13.1625C10.4977 13.5113 9.75489 13.6935 9.00094 13.6937C8.24698 13.6939 7.50413 13.512 6.83552 13.1636C6.16691 12.8151 5.59233 12.3104 5.1606 11.6923C5.12438 11.6427 5.09007 11.5913 5.05957 11.5398C5.06339 11.5131 5.0672 11.4883 5.07101 11.4636C5.09371 11.334 5.14639 11.2116 5.22482 11.106C5.30326 11.0004 5.40529 10.9146 5.52276 10.8555C6.30997 10.4629 8.0331 9.8853 8.0331 9.8853V9.31537L7.98544 9.27916C7.65061 9.02337 7.4268 8.64877 7.36024 8.23271L7.35071 8.17171H7.30496C7.17861 8.17231 7.05496 8.13505 6.94998 8.06472C6.845 7.99439 6.7635 7.89423 6.71597 7.77715C6.65813 7.67414 6.62793 7.55791 6.6283 7.43978C6.62846 7.3596 6.64331 7.28013 6.67214 7.20532C6.68717 7.12303 6.7328 7.04949 6.79984 6.99947L6.95996 6.90416L6.92184 6.73261C6.64164 5.50699 7.55848 4.40336 8.8165 4.3252C8.82466 4.32362 8.83298 4.32298 8.84128 4.32329C8.86225 4.32138 8.88321 4.31949 8.90419 4.31949H9.0948C9.11576 4.31949 9.13673 4.32138 9.15769 4.32329C9.166 4.32298 9.17431 4.32362 9.18247 4.3252C10.4424 4.40336 11.3592 5.50699 11.079 6.73261L11.039 6.90416L11.1991 6.99947C11.2668 7.04893 11.3126 7.12274 11.3268 7.20532C11.3563 7.28002 11.3718 7.35949 11.3726 7.43978C11.372 7.55779 11.3419 7.67379 11.2849 7.77715C11.2374 7.89423 11.1559 7.99439 11.0509 8.06472C10.9459 8.13505 10.8223 8.17231 10.6959 8.17171H10.6502L10.6387 8.23271C10.5737 8.64885 10.3504 9.02377 10.0154 9.27916L9.96778 9.31537V9.8853C9.96778 9.8853 11.6909 10.4629 12.4762 10.8555C12.5939 10.9143 12.6961 11 12.7746 11.1057C12.8531 11.2113 12.9056 11.3339 12.928 11.4636C12.9318 11.4883 12.9356 11.515 12.9394 11.5417Z"
                  fill="#519D9E"
                />
              </svg>
              </div>
            </div>
            <div className={`${isShowAddres ? 'addresbox mt-3 w-full mx-auto border-solid border-gmain border-y-2 rounded-lg p-2' : 'hidden'}`}>
              <div className="flex flex-col gap-3">
              <h1>{addresData.title}</h1>
                <h1>{`${addresData.state}/${addresData.city}/${addresData.details}/پلاک${addresData.pelak}/واحد${addresData.unit}/کد پستی${addresData.postalcode}`}</h1>
                <h1>هزینه ارسال: <span className="mr-3">2000 تومان</span></h1>
              </div>
            </div>
            <div className="totalprice flex items-center justify-around mt-5 font-bold text-text">
              <span>قابل پرداخت :</span>
              <span>
                {" "}
                تومان{" "}
                {products.reduce(
                  (total, item) =>
                    total + item.count * item.product.printed[0].pricePrinted,
                  0
                ) - products.reduce((total, item) => total + (item.count * item.product.printed[0].pricePrinted) * item.product.discount/100 ,0)}
              </span>
            </div>
            <div className="flex items-center justify-center mt-5">
              <button className="w-[150px] h-10 bg-gmain text-bg rounded-lg flex items-center justify-center">
                پرداخت
              </button>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <Loader />
      )}
      
      <Modal
          className="w-[400px] h-[500px] 	mt-[130px] bg-bg  mx-auto p-4 font-roya md:w-[600px]"
            isOpen={isModalOpen}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <div className="modal-top flex items-center justify-between">
              <div
                onClick={() => setIsModalOpen(false)}
                className="bg-gmain w-10 h-10 flex items-center justify-center rounded-full hover:bg-gmelo hover:text-text"
              >
                <img src="/images/close.svg" alt="" />
              </div>
            </div>
            <div className="content mt-3">
              {address.map((data)=>(
              <button onClick={()=>{
                setIsShowAddres(true)
                setAddresData(data)
                setIsModalOpen(false)
              }} className="addresbox w-full mx-auto border-solid border-gmain border-y-2 rounded-lg p-2">
              <div className="flex flex-col gap-3">
                <h1>{data.title}</h1>
                <h1>{`${data.state}/${data.city}/${data.details}/پلاک${data.pelak}/واحد${data.unit}/کد پستی${data.postalcode}`}</h1>
                <div className="flex gap-3">
                </div>
              </div>
            </button>
              ))}
            </div>
          </Modal>
    </div>
  );
}
