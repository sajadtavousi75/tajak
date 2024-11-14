import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function OfferDay() {
const [products , setProducts] = useState([])

const handelClik =() =>{

    window.scrollTo(0,0)
  }

    const getProduct =() => {
        fetch("https://tajak-project.liara.run/api/offer", {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setProducts(data)
          });
      };
    
      useEffect(() => {
        getProduct();
      }, []);
    
  return (
    <div className="offerday bg-bg pt-16">
        <div className="container">
            <div className="offerday-content">
                <h1 className='offerday-title text-center text-lg font-bold border-solid border-gmain border-y-2 rounded-lg p-2 text-text'>پیشنهاد روز سایت</h1>
                <div className="offerday-boxes flex flex-col md:flex-row gap-4 justify-between	 p-5 border-solid border-gmain border-b-2 rounded-lg">
                    {products?.map((product) =>(
                    <div key={product._id} className="offerday-box flex gap-4">
                        <div className="offerday-img">
                            <img className='w-[150px] h-[220px]' src={`https://tajak-project.liara.run/uploads/${product.product.cover}`} alt="" />
                        </div>
                        <div className="offerday-des pt-3 flex flex-col justify-between">
                            <div>
                            <h1 className="offerday-name text-base font-bold text-text">{product.originaltitle}</h1>
                            <ul className="offerday-list pt-3">
                                <li className="offerday-item text-base text-text">{product.subtitle1}</li>
                                <li className="offerday-item text-base text-text">{product.subtitle2}</li>
                                <li className="offerday-item text-base text-text">{product.subtitle3}</li>
                            </ul>
                            </div>
                            <div className='flex justify-end pb-2 '>
                            <Link to={`/book/${product.product.shortName}`} onClick={handelClik}><button className="offerday-btn bg-gmain  p-1 rounded-lg w-[150px] mt-3 text-bg transition duration-300 ease-in-out hover:text-text hover:bg-gmelo ">مشاهده کتاب</button></Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
