import React from 'react'
import { Link } from 'react-router-dom'
export default function CategorySection() {
  return (
    <div className="category mt-1 bg-gmelo py-4 ">
        <div className="container">
            <div className="category-content grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to='/shop/موفقیت و انگیزشی'>
                <div className="category-box group  relative    border-solid	border-gmain border-y-[3px]	p-3  rounded-lg cursor-pointer	">
                    <img className=' opacity-10 h-full 	 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-105' src="/images/category/2 6.png" alt="" />
                    <h1 className='absolute top-[37%] left-[27%] lg:left-[33%] text-3xl	font-bold text-gmain transition duration-300 ease-in-out drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] group-hover:text-white'>موفقیت و انگیزشی</h1>
                </div>
                </Link>
                <Link to='shop/کارآفرینی و کسب‌وکار'>
                <div className="category-box group  relative    border-solid	border-gmain border-y-[3px]	p-3  rounded-lg cursor-pointer	">
                    <img className=' opacity-10 h-full 	 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-105' src="/images/category/3 1.png" alt="" />
                    <h1 className='absolute top-[37%] left-[20%] lg:left-[30%] text-3xl	font-bold text-gmain transition duration-300 ease-in-out drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] group-hover:text-white'>کارآفرینی و کسب‌وکار</h1>
                </div>
                </Link>
                <Link to='shop/تاریخ جهان'>
                <div className="category-box group  relative    border-solid	border-gmain border-y-[3px]	p-3  rounded-lg cursor-pointer	">
                    <img className=' opacity-10 h-full 	 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-105' src="/images/category/4 1.png" alt="" />
                    <h1 className='absolute top-[37%] left-[33%] lg:left-[40%] text-3xl	font-bold text-gmain transition duration-300 ease-in-out drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] group-hover:text-white'>تاریخ جهان</h1>
                </div>
                </Link>
                <Link to={`/shop/درام خارجی`}>
                <div className="category-box group  relative    border-solid	border-gmain border-y-[3px]	p-3  rounded-lg cursor-pointer	">
                    <img className=' opacity-10 h-full 	 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-105' src="/images/category/Untitled-1.png" alt="" />
                    <h1 className='absolute top-[37%] left-[35%] lg:left-[38%] text-3xl	font-bold text-gmain transition duration-300 ease-in-out drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] group-hover:text-white'>درام خارجی</h1>
                </div>
                </Link>
            </div>
        </div>
    </div>
  )
}
