import React from 'react'

export default function PublisherSection() {
  return (
    <div className="publishersection bg-bg pb-16 mt-16">
        <div className="container">
            <div className="publishersection-content  flex flex-wrap	gap-5 items-center justify-around	">
                <div className="publishersection-content__box w-[170px]">
                <div className="publishersection-img flex items-center justify-center">
                    <img className='rounded-lg p-2 w-[130px] h-[130px] border-solid border-gmain border-x-2 rounded-lg ' src="/images/publisher/1.png" alt="" />
                </div>
                <h1 className='text-center mt-3 border-solid border-gmain border-x-2 rounded-lg text-lg font-bold text-text'>نشر آموت</h1>
                </div>
                <div className="publishersection-content__box w-[170px]">
                <div className="publishersection-img flex items-center justify-center">
                    <img className='rounded-lg p-2 w-[130px] h-[130px] border-solid border-gmain border-x-2 rounded-lg ' src="/images/publisher/Logo-png_result.webp" alt="" />
                </div>
                <h1 className='text-center mt-3 border-solid border-gmain border-x-2 rounded-lg text-lg font-bold text-text'>نشر رهنما</h1>
                </div>
                <div className="publishersection-content__box w-[170px]">
                <div className="publishersection-img flex items-center justify-center">
                    <img className='rounded-lg p-2 w-[130px] h-[130px] border-solid border-gmain border-x-2 rounded-lg ' src="/images/publisher/nardeban-logo.png" alt="" />
                </div>
                <h1 className='text-center mt-3 border-solid border-gmain border-x-2 rounded-lg text-lg font-bold text-text'>نشر نردبان</h1>
                </div>
                <div className="publishersection-content__box w-[170px]">
                <div className="publishersection-img flex items-center justify-center">
                    <img className='rounded-lg p-2 w-[130px] h-[130px] border-solid border-gmain border-x-2 rounded-lg ' src="/images/publisher/logo.png" alt="" />
                </div>
                <h1 className='text-center mt-3 border-solid border-gmain border-x-2 rounded-lg text-lg font-bold text-text'>نشر ققنوس</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
