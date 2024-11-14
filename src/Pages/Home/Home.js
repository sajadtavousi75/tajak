import React,{useContext, useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import OfferDay from '../../components/OfferDay/OfferDay'
import NewTajak from '../../components/NewTajak/NewTajak'
import OfferTajak from '../../components/OfferTajak/OfferTajak'
import CategorySection from '../../components/CategorySection/CategorySection'
import AuthorSection from '../../components/AuthorSection/AuthorSection'
import SaleSection from '../../components/SaleSection/SaleSection'
import PopularSection from '../../components/PopularSection/PopularSection'
import PublisherSection from '../../components/PublisherSection/PublisherSection'
import Footer from '../../components/Footer/Footer'
import AuthContext from "../../Context/AuthContext/AuthContext";

export default function Home() {
  const context= useContext(AuthContext)
  window.scrollTo(0,0)
  return (
    <>
    <Header />
    <section className="main font-roya bg-bg ">
      <OfferDay />
      <NewTajak />
      <OfferTajak />
      <CategorySection />
      <AuthorSection />
      <SaleSection />
      <PopularSection />
      <PublisherSection />
    </section>
    <footer className='font-roya bg-bg'>
      <Footer />
    </footer>
    </>
  )
}
