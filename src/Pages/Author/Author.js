import React,{useCallback,useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AboutaAuthor from '../../components/AboutAuthor/AboutaAuthor'
import EventAuthor from '../../components/EventAuthor/EventAuthor'
import Loader from '../../components/Loader/Loader'

export default function Author() {

  const [author ,setAuthor]=useState([])
  const {authorName} = useParams()

  const getOneAuthort = useCallback(() =>{
    const localData = JSON.parse(localStorage.getItem("user"));

    fetch(`https://tajak-project.liara.run/api/author/${authorName}`,{
      method : "POST",
      headers :{
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localData === null ? null : localData.token
        }`
      }
    }).then((res) => res.json())
    .then((data) =>{
      setAuthor(data.author)
    })
  },[authorName])

  useEffect(() =>{
    getOneAuthort()
  },[getOneAuthort])


  return (
    <>
    <Navbar />
    {author? (
      <>
      {author.name? (
      <section className="main font-roya bg-bg pt-[120px]">
        <AboutaAuthor data={author}/>
        <EventAuthor data={author} />
      </section>
      ) : (
        <Loader />
      )}
      </>
    ) : (
      <section className="h-[100vh] flex items-center justify-center main font-roya bg-bg pt-[120px]">
        <h1 className='text-text font-roya font-bold'>اطلاعات وارد شده نادرست است</h1>
      </section>
    )}
    <footer className='font-roya bg-bg'>
      <Footer />
    </footer>
    </>
  )
}
