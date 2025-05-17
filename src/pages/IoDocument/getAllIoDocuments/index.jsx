import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import toast from 'react-hot-toast';


function GetAllIoDocuments() {
    const [forms, setForms] = useState([]);
    const [userPoints, setUserPoints] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Get all documents
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/io/all/exclude", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(
            (response) => {
                setForms(response.data);
                console.log(response.data);
            }
        );
        
        // Get user points
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/points", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(
            (response) => {
                setUserPoints(response.data.points);
                console.log("User points:", response.data.points);
            }
        ).catch(error => {
            console.error("Error fetching user points:", error);
        });
    }, []);

    const handleViewClick = (pdfUrl) => {
    console.log("userPoints:", userPoints); 

    if (userPoints <= 0) {
        toast.error("You need at least 1 point to view documents. Fill out one form, earn one point, and try again!");
        return;
    }

    window.open(pdfUrl, "_blank");
};

    return (
        <div className='ml-3 mt-6 mb-4 px-6 font-[poppins]'>
            
            {forms.map((form, index) => {
                return (
                    <div key={index} className="max-w-7xl mx-auto bg-white rounded-xl shadow-md flex flex-col sm:flex-row gap-6 p-6 mb-6 border border-gray-200">
                        <img
                            src={form.profile_photo}
                            alt="Document cover image"
                            className="rounded-xl w-full sm:w-[400px] h-[400px] object-cover shadow-lg"
                            width={400}
                            height={300}
                        />
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={form.io_owner_profile_picture}
                                    alt="Profile picture"
                                    className="rounded-full w-12 h-12 object-cover border-1 border-[#0A66C2] shadow-lg"
                                    width={48}
                                    height={48}
                                />
                                <div>
                                    <h2 className="font-bold text-[24px] leading-6 text-gray-900">
                                        {form.owner_name}
                                    </h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleViewClick(form.pdf_file)}
                                    className={`ml-auto w-[100px] text-white text-sm font-semibold px-5 py-2 rounded-md transition ${
                                        userPoints <= 0 
                                            ? "bg-gray-400 cursor-not-allowed" 
                                            : "bg-[#0A66C2] hover:bg-[#0056A3]"
                                    }`}

                                >
                                    View
                                </button>
                            </div>
                            <h3 className="font-bold text-[29px] text-gray-900 leading-tight">
                                {form.title}
                            </h3>
                            <p className="text-gray-900 text-sm leading-relaxed">
                                {form.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default GetAllIoDocuments;