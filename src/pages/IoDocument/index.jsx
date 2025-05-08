import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer/footer'
import ScrollToTop from '../../components/ScrollToTop'

function IoDocument() {
  return (
    <div>
        <Navbar />
        <div className='h-screen flex justify-center items-center'>
            <h1 className='text-3xl font-bold'>IO Document</h1>
            
        </div>

        <ScrollToTop />
        <Footer />
    </div>
  )
}

export default IoDocument