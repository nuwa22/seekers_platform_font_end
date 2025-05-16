import React from 'react'

import { Form } from 'react-router-dom'
import Navbar from '../../../components/navbar'
import ScrollToTop from '../../../components/ScrollToTop'
import Footer from '../../../components/footer/footer'

function FormResponse() {
  return (
    <div>
        <Navbar />
        <div className='h-screen flex justify-center items-center'>
            <h1 className='text-3xl font-bold'>Form Response</h1>
            
        </div>

        <ScrollToTop />
        <Footer />
    </div>
  )
}

export default FormResponse