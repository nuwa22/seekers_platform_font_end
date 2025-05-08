import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer/footer'
import ScrollToTop from '../../components/ScrollToTop'

function MyResearches() {
  return (
    <div>
        <Navbar />
        <div className='h-screen flex justify-center items-center'>
            <h1 className='text-3xl font-bold'>My Researches</h1>
            
        </div>

        <ScrollToTop />
        <Footer />
    </div>
  )
}

export default MyResearches