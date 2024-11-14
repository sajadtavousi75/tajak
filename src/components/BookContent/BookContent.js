import React, { useState ,useContext } from "react";
import swal from "sweetalert";
import NotifContext from "../../Context/ShowNotif/ShowNotif";
import { Link } from "react-router-dom";

export default function BookContent({ data , showNotif, handelNotif , handelScroll }) {
  const [print, setPrint] = useState(true);
  const [digital, setDigital] = useState(false);
  const [audio, setAudio] = useState(false);
  const [fileAudio, setFileAudio] = useState();

  const context=useContext(NotifContext)

  const handelPrint = () => {
    setPrint(true);
    setAudio(false);
    setDigital(false);
  };
  const handelDigital = () => {
    setDigital(true);
    setAudio(false);
    setPrint(false);
  };
  const handelAudio = () => {
    setAudio(true);
    setDigital(false);
    setPrint(false);
  };

  const addToBasket = (id, event) => {
    const localData = JSON.parse(localStorage.getItem("user"));

    if (localData) {
      fetch(`https://tajak-project.liara.run/api/product/${id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localData.token}`,
        },
        body: JSON.stringify({ count: 1 }),
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "به سبد خرید اضافه شد",
            icon: "success",
            buttons: "باشه",
          });
          context.handelNotif()
        }
        if (res.status === 409) {
          swal({
            title: "این محصول در سبد خرید موجود است",
            icon: "warning",
            buttons: "باشه",
          });
        }
      });
    } else {
      swal({
        title: "لظفا ابتدا در سایت لاگین کنید",
        icon: "warning",
        buttons: "باشه",
      });
    }
  };
  const addToSaved = (id, event) => {
    const localData = JSON.parse(localStorage.getItem("user"));

    if (localData) {
      fetch(`https://tajak-project.liara.run/api/product/${id}/saved`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localData.token}`,
        },
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "به علاقه مندی ها اضافه شد",
            icon: "success",
            buttons: "باشه",
          });
        }
        if (res.status === 409) {
          swal({
            title: "این محصول در علاقه مندی ها موجود است",
            icon: "warning",
            buttons: "باشه",
          });
        }
      });
    } else {
      swal({
        title: "لظفا ابتدا در سایت لاگین کنید",
        icon: "warning",
        buttons: "باشه",
      });
    }
  };

  return (
    <div className="bookcontent mt-4">
      <div className="container">

        <div className="bookcontent-details flex flex-col lg:flex-row justify-around items-center">
          <div className="bookcontent-details__main flex items-center justify-center gap-4 py-8 ">
            <img
              className="w-[150px] h-[220px] rounded-lg md:w-[200px] md:h-[300px]"
              src={`https://tajak-project.liara.run/uploads/${data.cover}`}
              alt=""
            />
            <div>
              <h1 className="text-text text-xl font-bold border-solid border-gmain border-s-4 p-2 lg:text-2xl">
                {data.name}
              </h1>
              <p className="text-gmain mt-2 text-xs	 lg:text-sm	">
                نویسنده:{" "}
                <Link to={`/author/${data.authorID?.shortName}`}>
                <span className="text-text font-bold mr-4">
                  {data.authorID && data.authorID.name}
                </span>
                </Link>
              </p>
              {data.translator !== "null" ? (
                <p className="text-gmain mt-2 text-xs	 lg:text-sm	">
                  مترجم:
                  <span className="text-text font-bold mr-6">
                    {data.translator}
                  </span>
                </p>
              ) : (
                ""
              )}
              <p className="text-gmain mt-2 text-xs lg:text-sm		">
                انتشارات:{" "}
                <span className="text-text font-bold mr-2.5">
                  {data.publisher}
                </span>
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-text mt-2 text-xs	 lg:text-sm	">
                  امتیاز این کتاب از بین{" "}
                  <span className="text-gmain font-bold">{}</span> نظر
                </p>
                <span className="flex items-center justify-between gap-2 bg-text p-1 rounded-lg text-bg text-xs	 lg:text-sm	">
                  5
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.14867 0.583442C7.29825 0.229954 7.64504 0 8.02829 0C8.4123 0 8.75909 0.229954 8.90867 0.583442L10.6903 4.79554L15.177 5.42512C15.5483 5.47721 15.8549 5.74066 15.9606 6.1001C16.067 6.45954 15.9539 6.84801 15.6703 7.09284L12.4622 9.87461L13.3254 14.4878C13.3939 14.8532 13.2443 15.2246 12.9422 15.4404C12.64 15.6569 12.2396 15.6778 11.9167 15.4955L8.02829 13.3008L4.15406 15.488C3.8281 15.6718 3.4255 15.6488 3.12336 15.4292C2.82048 15.2097 2.67387 14.8339 2.74755 14.4677L3.59517 10.2497L0.292473 7.06754C0.029031 6.81377 -0.0662249 6.43201 0.0468914 6.08447C0.159264 5.73619 0.460659 5.48391 0.823078 5.43256L5.36708 4.79554L7.14867 0.583442Z"
                      fill="#EFDB1B"
                    />
                  </svg>
                </span>
              </div>
              <button
              onClick={handelScroll}
                className="text-gmain mt-2 font-bold text-xs lg:text-sm		"
                href=""
              >
                مشاهده نظرات
              </button>
              <div className="icon flex items-center justify-start gap-4 mt-4">
                <img className="h-[24px]" src="/images/share 1.png" alt="" />
                <img
                  onClick={() => addToSaved(data._id)}
                  className="h-[24px] cursor-pointer	"
                  src="/images/saved 2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="bookcontent-details__version pb-8 w-[350px] lg:w-[450px] ">
            <div className="bookcontent-details__title flex items-center justify-center gap-2 w-[350px] font-bold border-solid border-gmain border-b-4 pt-2 px-4 mx-auto">
              {data.printed && data.printed[0].shabook !== "null" ? (
                <p
                  onClick={handelPrint}
                  className={`${
                    print ? "bg-gmain text-bg" : ""
                  } transition-all duration-700 p-2 w-[130px] h-[40px] text-center rounded-t-lg cursor-pointer text-xs flex items-center justify-center lg:text-sm	`}
                >
                  چاپی
                </p>
              ) : (
                ""
              )}
              {data.digital && data.digital[0].format !== "null" ? (
                <p
                  onClick={handelDigital}
                  className={`${
                    digital ? "bg-gmain text-bg" : ""
                  } transition-all duration-700 p-2 w-[130px] h-[40px] text-center rounded-t-lg cursor-pointer text-xs flex items-center justify-center lg:text-sm	`}
                >
                  دیجیتالی
                </p>
              ) : (
                ""
              )}
              {data.audio && data.audio[0].speaker !== "null" ? (
                <p
                  onClick={handelAudio}
                  className={`${
                    audio ? "bg-gmain text-bg" : ""
                  } transition-all duration-700 p-2 w-[130px] h-[40px] text-center rounded-t-lg cursor-pointer text-xs flex items-center justify-center lg:text-sm	`}
                >
                  صوتی
                </p>
              ) : (
                ""
              )}
            </div>
            <div
              className={`${
                print ? " flex	 " : " hidden	 "
              }  bookcontent-details__printed transition-all ease-in duration-700  justify-between px-4 h-[232px] 	 text-xs lg:text-sm`}
            >
              <div className="">
                <p className="text-gmain mt-2">شابک :</p>
                <p className="text-gmain mt-2">قطع :</p>
                <p className="text-gmain mt-2">تعداد صفحه :</p>
                <p className="text-gmain mt-2">سال انتشار : </p>
                <p className="text-gmain mt-2">نوع جلد :</p>
                <p className="text-gmain mt-2">شماره چاپ :</p>
              </div>
              <div className="flex flex-col items-start ">
                <span className="text-text  mt-2">
                  {data.printed && data.printed[0].shabook}
                </span>
                <span className="text-text  mt-2">
                  {data.printed && data.printed[0].cut}
                </span>
                <span className="text-text mt-2">
                  {data.printed && data.printed[0].numberPagePrinted}
                </span>
                <span className="text-text mt-2">
                  {data.printed && data.printed[0].yearsPublish}
                </span>
                <span className="text-text mt-2 ">
                  {data.printed && data.printed[0].coverType}
                </span>
                <span className="text-text mt-2">
                  {data.printed && data.printed[0].printNumber}
                </span>
              </div>
              <div className="flex flex-col justify-around items-end">
                <img
                  className="w-[40px] h-[36px] flex justify-end"
                  src="/images/book/Vector3.png"
                  alt=""
                />
                <p className="text-text">
                  <span className="text-2xl font-bold">
                    {data.printed && data.printed[0].pricePrinted - (data.printed && data.printed[0].pricePrinted)*(data.discount)/100 }
                  </span>{" "}
                  تومان
                </p>
                <button
                  onClick={() => addToBasket(data._id)}
                  className="bg-gmain font-bold text-bg p-2 rounded-lg w-[150px] h-[32px] flex items-center justify-center hover:text-text hover:bg-gmelo"
                >
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
            <div
              className={`${
                digital ? " flex	  " : " hidden	 "
              } bookcontent-details__digital transition-all ease-in duration-700  justify-between h-[232px] px-4 text-xs lg:text-sm`}
            >
              <div>
                <p className="text-gmain mt-2">حجم :</p>
                <p className="text-gmain mt-2">فرمت:</p>
                <p className="text-gmain mt-2">تعداد صفحه :</p>
              </div>
              <div className="flex flex-col items-start ">
                <span className="text-text  mt-2">
                  {data.digital && data.digital[0].volume} MB
                </span>
                <span className="text-text  mt-2">
                  {data.digital && data.digital[0].format}
                </span>
                <span className="text-text mt-2">
                  {data.digital && data.digital[0].numberPageDigital}
                </span>
              </div>
              <div className="flex flex-col justify-around items-end">
                <img
                  className="w-[40px] h-[36px] flex justify-end"
                  src="/images/book/Vector digital.png"
                  alt=""
                />
                <p className="text-text">
                  <span className="text-2xl font-bold">
                    {data.digital && data.digital[0].priceDigital -(data.digital && data.digital[0].priceDigital)*(data.discount)/100}
                  </span>{" "}
                  تومان
                </p>
                <button className="bg-gmain font-bold text-bg p-2 rounded-lg w-[150px] h-[32px] flex items-center justify-center hover:text-text hover:bg-gmelo">
                  خرید
                </button>
              </div>
            </div>
            <div
              className={`${
                audio ? " flex	 " : " hidden	 "
              } bookcontent-details__audio  transition-all ease-in duration-700 justify-between h-[232px] px-4 text-xs lg:text-sm`}
            >
              <div className="flex">
                <div>
                  <p className="text-gmain mt-2">گوینده :</p>
                  <p className="text-gmain mt-2">انتشارات صوتی:</p>
                  
                </div>
                <div className="flex flex-col items-start mr-4">
                  <span className="text-text  mt-2">
                    {data.audio && data.audio[0].speaker}
                  </span>
                  <span className="text-text  mt-2">
                    {data.audio && data.audio[0].publishAudio}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-around items-end">
                <img
                  className="w-[40px] h-[36px] flex justify-end"
                  src="/images/book/Vector audio.png"
                  alt=""
                />
                <p className="text-text">
                  <span className="text-2xl font-bold">
                    {data.audio && data.audio[0].priceAudio -(data.audio && data.audio[0].priceAudio)*(data.discount)/100}
                  </span>{" "}
                  تومان
                </p>
                <audio className=" w-[250px] h-8 " controls src={`https://tajak-project.liara.run/uploads/${data.audio && data.audio[0].fileAudio}`}></audio>
                <button className="bg-gmain font-bold text-bg p-2 rounded-lg w-[150px] h-[32px] flex items-center justify-center hover:text-text hover:bg-gmelo">
                  خرید
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
