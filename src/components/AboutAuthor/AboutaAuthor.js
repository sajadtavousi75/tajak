import React from 'react'

export default function AboutaAuthor(data) {
  return (
    <div className="aboutauthor mt-16">
        <div className="container">
            <div className="aboutauthor-content flex flex-col items-center justify-center md:flex-row py-5 gap-5">
                <img className='w-[150px] h-[150px]' src={`https://tajak-project.liara.run/uploads/${data.data.coverAuthor}`} alt="" />
                <div className="aboutauthor-des text-text ">
                    <h1 className='text-xl font-bold border-solid border-gmain border-s-4 p-1 md:text-2xl'>{data.data.name}</h1>
                    <p className='border-solid border-gmain border-x-2 p-1 rounded-lg mt-3'>{data.data.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
