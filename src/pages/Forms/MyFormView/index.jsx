// FormDetails.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/navbar';
import ScrollToTop from '../../../components/ScrollToTop';
import Footer from '../../../components/footer/footer';

function MyFormView() {
    const { id } = useParams(); 
    const [form, setForm] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/forms/my-forms/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(res => {
            setForm(res.data);
            console.log(res.data);
        });
    }, [id]);

    if (!form) return <p className="text-center mt-10">Loading...</p>;

     return (
        <div className='bg-[#F9FAFB]'>
        <Navbar />
        <div className='h-screen flex justify-center items-center'>
            <h1 className='text-3xl font-bold'>My Forms Preview</h1>
            
        </div>

        <ScrollToTop />
        <Footer />
    </div>
  );

}

export default MyFormView;
