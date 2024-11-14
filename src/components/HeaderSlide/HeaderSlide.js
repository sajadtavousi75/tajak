import React,{useState,useEffect,useCallback} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Loader from '../Loader/Loader';

export default function HeaderSlide() {

  const [index, setIndex] = useState(0);
  const [sliders , setSliders] = useState([])

  const [showLoader , setShowLoader] = useState(false)

  setTimeout(()=>{
    setShowLoader(true)
  },500)
  

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getSlide = useCallback(() => {
    fetch("https://tajak-project.liara.run/api/slider", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSliders(data)
      });
  }, []);

  useEffect(() =>{
    getSlide()
  },[])
    
  return (
    <>
    {showLoader ? (

    <div className="slider pt-[120px] mt-12">
      <div className='container w-full '>
     <Carousel activeIndex={index} onSelect={handleSelect} controls={false} interval={2000}>
      {sliders.map((slider) =>(
      <Carousel.Item key={slider._id}>
        <img className='w-full' src={`https://tajak-project.liara.run/uploads/${slider.sliderImage}`} alt="Slide 1" />
      </Carousel.Item>
      ))}
    </Carousel>
  </div>
    </div>
    ) : (
      <Loader />
    )}
    </>
  )
}
