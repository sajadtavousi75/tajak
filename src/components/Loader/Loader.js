import React from 'react'

import './Loader.css'

export default function Loader() {
  return (
    <>
    <div className='h-[100vh] bg-bg flex items-center justify-center'>
    <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    </>
  )
}
