import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";

function GetAllForms({ tagFilter }) {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/forms/active", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((response) => {
      setForms(response.data);
      setFilteredForms(response.data);
      console.log(response.data);
    });
  }, []);

  // Filter forms when tagFilter changes
  useEffect(() => {
    if (!tagFilter.trim()) {
      // If filter is empty, show all forms
      setFilteredForms(forms);
    } else {
      const filtered = forms.filter(form => {
        // Check if form has tags property and if any tag includes the filter text
        // This assumes your form data has a tags array
        if (form.tags && Array.isArray(form.tags)) {
          return form.tags.some(tag => 
            tag.toLowerCase().includes(tagFilter.toLowerCase())
          );
        } else if (form.tags && typeof form.tags === 'string') {
          // If tags is a comma-separated string, split and check
          return form.tags.toLowerCase().includes(tagFilter.toLowerCase());
        }
        // Also search in title and description as fallback
        return (
          form.title.toLowerCase().includes(tagFilter.toLowerCase()) ||
          form.description.toLowerCase().includes(tagFilter.toLowerCase())
        );
      });
      
      setFilteredForms(filtered);
    }
  }, [tagFilter, forms]);

  return (
    <div className='ml-3 mt-6 mb-4 px-6 font-[poppins]'>
      {filteredForms.length === 0 ? (
        <div className="max-w-7xl mx-auto p-6 text-center">
          <p className="text-gray-600 text-lg">No forms found matching your tag search.</p>
        </div>
      ) : (
        filteredForms.map((form, index) => {
          return (
            <div key={index} className="max-w-7xl mx-auto bg-white rounded-xl shadow-md flex flex-col sm:flex-row gap-6 p-6 mb-6 border border-gray-200">
              <img
                src={form.form_profile_photo}
                alt="Bookshelf with warm lighting and hanging bulbs in a dimly lit corridor"
                className="rounded-xl w-full sm:w-[400px] h-[400px] object-cover shadow-lg"
                width={400}
                height={300}
              />
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={form.owner_profile_picture}
                    alt="Profile picture of a man with beard and blue necklace wearing white shirt"
                    className="rounded-full w-12 h-12 object-cover border-1 border-[#0A66C2] shadow-lg"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h2 className="font-bold text-[24px] leading-6 text-gray-900">
                      {form.owner_name}
                    </h2>
                    <p className="text-[14px] text-gray-600">{new Date(form.expiry_date).toLocaleDateString()}</p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => navigate(`/form/${form.id}`)}
                    className="ml-auto w-[100px] bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#0056A3] transition"
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
        })
      )}
    </div>
  );
}

export default GetAllForms;