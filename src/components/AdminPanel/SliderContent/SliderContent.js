import React, { useEffect, useRef, useState, useCallback } from "react";
import swal from "sweetalert";
import { date } from "yup";

export default function SliderContent() {
  const [sliderImage, setSliderImage] = useState({});
  const [sliders, setSliders] = useState([]);
  const [slideName, setSlideName] = useState('');

  const inputRef = useRef(null);

  const handleLabelClick = () => {
    inputRef.current.click();
  };

  const addSlide = () => {
    const localData = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();

    formData.append("sliderImage", sliderImage);

    fetch("https://tajak-project.liara.run/api/slider", {
      method: "POST",
      headers: {
        // "Content-Type" : "multipart/form-data",
        Authorization: `Bearer ${localData.token}`,
      },
      body: formData,
    }).then((res) => {

      if (res.ok) {
        swal({
          title: "اسلایدر با موفقیت افزوده شد",
          icon: "success",
          buttons: "باشه",
        });
        getSlide()
      }
    });
  };

  const getSlide = useCallback(() => {
    fetch("https://tajak-project.liara.run/api/slider", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSliders(data);
      });
  }, []);

  useEffect(() => {
    getSlide();
  }, []);

  return (
    <div className="slider-content flex flex-col items-center justify-center gap-5 pt-14 pb-5 ">
      <div className="input-slider h-[210px] bg-gmelo w-[550px] rounded-lg flex flex-col items-center justify-center">
        <div className="file 	">
          <label onClick={handleLabelClick}>
            <span>
              <img className="cursor-pointer" src="/images/file.png" alt="" />
            </span>
          </label>
          <input
            onChange={(event) => {
              setSliderImage(event.target.files[0]);
              setSlideName(event.target.files[0].name)
            }}
            ref={inputRef}
            className="hidden"
            type="file"
            id="upload-file"
          />
        </div>
          <h1>{slideName}</h1>
        <h1 className="text-gmain">افزودن اسلاید جدید</h1>
      </div>
      <button onClick={addSlide}>افزودن</button>
      {sliders.length ? (
        <div className="slider-img flex flex-col items-center justify-center gap-3 border-solid border-gmain border-y-2 rounded-lg w-full py-5">
          {sliders.map((slider,index) =>(
            <div className="slider-box flex items-center justify-center gap-4  w-full">
            <div>
              <button className=" bg-gmelo flex items-center justify-center rounded-lg p-1 opacity-30 hover:opacity-100">
                <img src="/images/deletprofile.png" alt="" />
              </button>
            </div>
            <img
              className="h-[210px]  w-[550px]"
              src={`https://tajak-project.liara.run/uploads/${slider.sliderImage}`}
              alt=""
            />
            <div>
              <h1 className="w-8 h-8 bg-text text-bg rounded-lg flex items-center justify-center">
                {index+1}
              </h1>
            </div>
          </div>
          ))}
          
        </div>
      ) : (
        <p>jjjjjjjjj</p>
      )}
    </div>
  );
}
