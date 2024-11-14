import React,{useContext} from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import EditSection from '../../../components/UserPanel/EditSection/EditSection'
import Sidebar from '../../../components/UserPanel/Sidebar.js/Sidebar'
import AuthContext from '../../../Context/AuthContext/AuthContext'

export default function EditProfile() {

  const authContext=useContext(AuthContext)
  return (
    <>
    <Navbar />
    <section className="main flex font-roya bg-bg pt-[120px]">
      <div className="container my-16 flex">
      <Sidebar />
      <EditSection data={authContext.userInfos} />
      </div>
    </section>
    <footer className='font-roya bg-bg'>
      <Footer />
    </footer>
    </>
  )
}
