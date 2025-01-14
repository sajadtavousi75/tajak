import React, { useState } from "react";
import Modal from "react-modal";

export default function HistoryBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="historybox">
      <div className="historybox-content flex flex-col items-center justify-around  gap-4 w-full border-solid border-gmain border-y-2 p-2 rounded-lg lg:flex-row">
        <div className="historybox-img w-[200px] flex  itemes-center justify-center gap-2">
          <img
            className="w-[55px] h-20 rounded-lg"
            src="/images/be06d9a3929044ff82e28424a0d1c337.jpg"
            alt=""
          />
          <img
            className="w-[55px] h-20 rounded-lg"
            src="/images/be06d9a3929044ff82e28424a0d1c337.jpg"
            alt=""
          />
          <img
            className="w-[55px] h-20 rounded-lg"
            src="/images/be06d9a3929044ff82e28424a0d1c337.jpg"
            alt=""
          />
        </div>
        <div className="historybox-details flex items-center justify-center gap-2">
          <div className="border-solid border-gmain border-2 rounded-lg relative	p-2 w-[140px] h-10 text-text ">
            <span>1400 / 11 / 23</span>
            <p className="absolute	bg-gmelo  -top-5 right-5">تاریخ ثبت سفارش</p>
          </div>
          <div className="border-solid border-gmain border-2 rounded-lg relative	p-2 w-[140px] h-10 text-text ">
            <span>222222222</span>
            <p className="absolute	bg-gmelo  -top-5 right-5">شماره سفارش</p>
          </div>
        </div>
        <div className="historybox-price flex flex-col items-center justify-between h-20">
          <h1 className="font-bold text-text">500 698 هزار تومان</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-[150px] h-10 bg-gmain text-bg p-1 rounded-lg"
          >
            مشاهده جزئیات
          </button>
        </div>

        <Modal
          className="w-[400px] h-[500px] overflow-y-scroll	mt-[130px] bg-bg  mx-auto p-4 font-roya md:w-[600px]  "
          isOpen={isModalOpen}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <div className="modal-top flex flex-wrap items-center justify-start gap-2 md:justify-between">
            <div
              onClick={() => setIsModalOpen(false)}
              className="bg-gmain w-10 h-10 flex items-center justify-center rounded-full hover:bg-gmelo hover:text-text"
            >
              <img src="/images/close.svg" alt="" />
            </div>
            <div className="flex gap-2 mt-3">
              <div className="border-solid border-gmain border-2 rounded-lg relative	p-2 w-[140px] h-10 text-text ">
                <span>1400 / 11 / 23</span>
                <p className="absolute	bg-bg  -top-5 right-5">تاریخ ثبت سفارش</p>
              </div>
              <div className="border-solid border-gmain border-2 rounded-lg relative	p-2 w-[140px] h-10 text-text ">
                <span>222222222</span>
                <p className="absolute	bg-bg  -top-5 right-5">شماره سفارش</p>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-text">500 698 هزار تومان</h1>
            </div>
          </div>
          <div className="modal-middel mt-5">
            <div className="box-modal shadow-inner p-2 flex flex-col gap-2">
              <div className="content flex items-center justify-between">
                <div className="img flex flex-col items-center justify-srart w-[100px] gap-1 md:flex-row md:w-[200px]">
                  <div className="flex gap-1">
                    <div className="icon h-20 flex  items-center justify-center rounded-lg bg-gmain w-8">
                      <img className="" src="/images/madalimg.png" alt="" />
                    </div>
                    <img
                      className="w-[50px] h-20 rounded-lg"
                      src="/images/be06d9a3929044ff82e28424a0d1c337.jpg"
                      alt=""
                    />
                  </div>
                  <h1 className="text-text font-bold md:mr-8">نام کتاب</h1>
                </div>
                <h1 className="text-text font-bold text-xs md:text-base	">500 68 تومان</h1>
                <button className="w-[150px] h-10 bg-gmain text-bg rounded-lg">
                  مشاهده کتاب
                </button>
              </div>
              <div className="content flex items-center justify-between">
                <div className="img flex flex-col items-center justify-srart w-[100px] gap-1 md:flex-row md:w-[200px]">
                  <div className="flex gap-1">
                    <div className="icon h-20 flex  items-center justify-center rounded-lg bg-gmain w-8">
                      <img className="" src="/images/madalimg.png" alt="" />
                    </div>
                    <img
                      className="w-[50px] h-20 rounded-lg"
                      src="/images/be06d9a3929044ff82e28424a0d1c337.jpg"
                      alt=""
                    />
                  </div>
                  <h1 className="text-text font-bold md:mr-8">نام کتاب</h1>
                </div>
                <h1 className="text-text font-bold text-xs md:text-base	">500 68 تومان</h1>
                <button className="w-[150px] h-10 bg-gmain text-bg rounded-lg">
                  مشاهده کتاب
                </button>
              </div>
              <div className="content flex items-center justify-between">
                <div className="img flex flex-col items-center justify-srart w-[100px] gap-1 md:flex-row md:w-[200px]">
                  <div className="flex gap-1">
                    <div className="icon h-20 flex  items-center justify-center rounded-lg bg-gmain w-8">
                      <img className="" src="/images/madalimg.png" alt="" />
                    </div>
                    <img
                      className="w-[50px] h-20 rounded-lg"
                      src="/images/be06d9a3929044ff82e28424a0d1c337.jpg"
                      alt=""
                    />
                  </div>
                  <h1 className="text-text font-bold md:mr-8">نام کتاب</h1>
                </div>
                <h1 className="text-text font-bold text-xs md:text-base	">500 68 تومان</h1>
                <button className="w-[150px] h-10 bg-gmain text-bg rounded-lg">
                  مشاهده کتاب
                </button>
              </div>
              <div className="content flex items-center justify-between">
                <div className="img flex flex-col items-center justify-srart w-[100px] gap-1 md:flex-row md:w-[200px]">
                  <div className="flex gap-1">
                    <div className="icon h-20 flex  items-center justify-center rounded-lg bg-gmain w-8">
                      <img className="" src="/images/madalimg.png" alt="" />
                    </div>
                    <img
                      className="w-[50px] h-20 rounded-lg"
                      src="/images/be06d9a3929044ff82e28424a0d1c337.jpg"
                      alt=""
                    />
                  </div>
                  <h1 className="text-text font-bold md:mr-8">نام کتاب</h1>
                </div>
                <h1 className="text-text font-bold text-xs md:text-base	">500 68 تومان</h1>
                <button className="w-[150px] h-10 bg-gmain text-bg rounded-lg">
                  مشاهده کتاب
                </button>
              </div>
              
            </div>
          </div>
          <div className="modal-botton flex items-center justify-between h-[70px] border-solid border-gmain border-y-2 rounded-lg">
            <h1 className="font-bold">
              ارسال به آدرس :{" "}
              <span className="font-normal	mr-5">
                اصفهان ، اصفهان ، خیابان.... ، کوچه.... ، پلاک.. ، طبقه 3
              </span>
            </h1>
            <img src="/images/modaladdres.png" alt="" />
          </div>
        </Modal>
      </div>
    </div>
  );
}
