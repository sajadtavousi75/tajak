import React from 'react'

export default function AboutBook({data}) {
  return (
    <>
    <div className="aboutbook bg-gmelo mt-16">
        <div className="container">
            <div className="aboutbook-content">
                <h1 className='bg-bg w-[300px] h-10 flex items-center justify-center rounded-b-lg text-lg	font-bold mx-auto text-text'>درباره کتاب</h1>
                <p className='py-4 text-text'>{data}</p>
            </div>
        </div>
    </div>
    </>
  )
}
