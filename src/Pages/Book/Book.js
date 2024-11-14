import React , {useState , useEffect ,useCallback} from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import BookContent from '../../components/BookContent/BookContent'
import AboutBook from '../../components/AboutBook/AboutBook'
import PopularSection from '../../components/PopularSection/PopularSection'
import NewTajak from '../../components/NewTajak/NewTajak'
import Comments from '../../components/Comments/Comments'
import Loader from '../../components/Loader/Loader'

export default function Book() {
  const [aboutBook , setAboutBook] = useState('')
  const [detaisBook , setDetailsBook] = useState([])
  const [showNotif , setShowNotif]= useState(false)
  const [scrollComment, setScrollComment]= useState(false)


  const handelScroll=()=>{
    setScrollComment(true)
  }

  const handelNotif=()=>{
    setShowNotif(true)
    setTimeout(()=>{
      setShowNotif(false)
    },2000)
  }
  const {bookName} = useParams()
  console.log(bookName)

  const getOneProduct = useCallback(() =>{
    const localData = JSON.parse(localStorage.getItem("user"));

    fetch(`https://tajak-project.liara.run/api/product/${bookName}`,{
      method : "POST",
      headers :{
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localData === null ? null : localData.token
        }`
      }
    }).then((res) => res.json())
    .then((data) =>{
      setAboutBook(data.description)
      setDetailsBook(data)
    })
  },[bookName])

  useEffect(() =>{
    getOneProduct()
  },[getOneProduct])

  return (
    <>
    <Navbar showNotif={showNotif} />
    <section className="main font-roya bg-bg pt-[120px]">
      {detaisBook.name?(
      <div className='breadCrumb container mt-2 flex items-center gap-2'>
        <Link className='text-gmain  font-bold' to='/'> تاجک  </Link>
        <svg
              width="9"
              height="17"
              viewBox="0 0 9 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.90625 0.5V4.1128L4.26991 8.50167L8.90625 12.8872V16.5L0.45342 8.50167L8.90625 0.5Z"
                fill="#519D9E"
              />
            </svg>
        <Link className='text-gmain  font-bold' to={`/shop/${detaisBook.subcategoryID.href}`}> {detaisBook.subcategoryID?.title}</Link>
        <svg
              width="9"
              height="17"
              viewBox="0 0 9 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.90625 0.5V4.1128L4.26991 8.50167L8.90625 12.8872V16.5L0.45342 8.50167L8.90625 0.5Z"
                fill="#519D9E"
              />
            </svg>
        <Link className='text-gmain  font-bold' to={`/book/${detaisBook.shortName}`}> {detaisBook.name}</Link>
      </div>
      ) :(
        <>
        </>
      )}
      { detaisBook.name?(
        <>
        <BookContent data={detaisBook} showNotif={showNotif} handelNotif={handelNotif} handelScroll={handelScroll}/>
      {aboutBook&&(
      <AboutBook data={aboutBook}/>
      )}
      <PopularSection />
      <NewTajak />
      {aboutBook&&(
      <Comments scrollComment={scrollComment} setScrollComment={setScrollComment} />
      )}
        </>
      ) : (
        <>
        {aboutBook === undefined? (
          <>
          <h1 className='text-center text-text text-xl pt-10 font-roya font-bold'>کتاب وارد شده موجود نمی باشد</h1>
          </>
        ) : (
         <></>
        )}
        <Loader />
        </>
      )}
      
    </section>
    <footer className='font-roya bg-bg'>
      <Footer />
    </footer>
    </>
  )
}
