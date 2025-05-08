import axios from 'axios'
import { useEffect, useState } from 'react'
import "@fortawesome/fontawesome-free/css/all.min.css";

function GetAllForms() {

    const [forms, setForms] = useState([]);
    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/forms/active", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }).then(
                (response) => {
                    setForms(response.data); 
                    console.log(response.data);
                }
            )
        }, []
    )
    

  return (
    <div className='ml-3 mt-6 mb-4 px-6'>
        {
            forms.map(
                (forms, index) => {
                    return (
                        <div key={index} className="max-w-7xl mx-auto bg-white rounded-xl shadow-md flex flex-col sm:flex-row gap-6 p-6 mb-6 border border-gray-200">
                            <img
                                src={forms.form_profile_photo}
                                alt="Bookshelf with warm lighting and hanging bulbs in a dimly lit corridor"
                                className="rounded-xl w-full sm:w-[400px] h-auto object-cover shadow-lg"
                                width={400}
                                height={300}
                            />
                            <div className="flex-1 flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                <img
                                    src="https://storage.googleapis.com/a1aa/image/c4cca207-3114-4b64-95bf-60722f4f5b4c.jpg"
                                    alt="Profile picture of a man with beard and blue necklace wearing white shirt"
                                    className="rounded-full w-12 h-12 object-cover border-1 border-[#0A66C2] shadow-lg"
                                    width={48}
                                    height={48}
                                />
                                <div>
                                    <h2 className="font-bold text-[24px] leading-6 text-gray-900">
                                    Suresh Nuwan
                                    </h2>
                                    <p className="text-[14px] text-gray-600">{new Date(forms.expiry_date).toLocaleDateString()}</p>
                                </div>
                                <a
                                    href="https://your-research-link.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto"
                                    title="Visit Link"
                                >
                                    
                                    <i
                                    className="fas fa-link text-[#0A66C2] text-xl hover:text-blue-[#0056A3] transition"
                                    aria-hidden="true"
                                    ></i>
                                </a>

                                <button
                                    type="button"
                                    className="ml-4 w-[100px] h-[40-px] bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#0056A3] transition"
                                >
                                    View
                                </button>
                                </div>

                                <h3 className="font-bold text-[29px] text-gray-900 leading-tight">
                                {forms.title}
                                </h3>

                                <p className="text-gray-900 text-sm leading-relaxed">
                                {forms.description}
                                </p>
                            </div>
                            </div>
                    )
                }
            )
        }
    </div> 
  )
}

export default GetAllForms