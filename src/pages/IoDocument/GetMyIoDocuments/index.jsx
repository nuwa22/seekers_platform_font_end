import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";

function GetMyIoDocuments() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/io/my-documents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setForms(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch documents:", error);
      });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this document?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/io/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setForms((prevForms) => prevForms.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className='ml-3 mt-6 mb-4 px-6 font-[poppins]'>
      {forms.map((form, index) => (
        <div
          key={index}
          className="max-w-7xl mx-auto bg-white rounded-xl shadow-md flex flex-col sm:flex-row gap-6 p-6 mb-6 border border-gray-200"
        >
          <img
            src={form.profile_photo}
            alt="Document preview"
            className="rounded-xl w-full sm:w-[400px] h-[400px] object-cover shadow-lg"
          />

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src={form.io_owner_profile_picture}
                alt="Owner profile"
                className="rounded-full w-12 h-12 object-cover border-1 border-[#0A66C2] shadow-lg"
              />
              <div>
                <h2 className="font-bold text-[24px] leading-6 text-gray-900">{form.owner_name}</h2>
              </div>

              <button
                onClick={() => handleDelete(form.id)}
                className="ml-auto bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>

              <button
                type="button"
                onClick={() => window.open(form.pdf_file, "_blank")}
                className="ml-2 w-[100px] bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#0056A3] transition"
              >
                View
              </button>
            </div>

            <h3 className="font-bold text-[29px] text-gray-900 leading-tight">{form.title}</h3>

            <p className="text-gray-900 text-sm leading-relaxed">{form.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetMyIoDocuments;
