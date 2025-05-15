import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer/footer';
import ScrollToTop from '../../../components/ScrollToTop';
import toast from 'react-hot-toast';

function PreviewForm() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/forms/${formId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFormData(response.data);
      } catch (error) {
        toast.error("Failed to load form preview");
        navigate('/create-form');
      }
    };

    fetchFormData();
  }, [formId, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!formData) {
    return <div className="text-center mt-8">Loading preview...</div>;
  }

  return (
    <div className="bg-[#F4F7FC]">
      <Navbar />
      <div className="min-h-screen font-[poppins] px-6 md:px-10 pt-24">
        <div className="max-w-3xl mx-auto">
          {/* Form Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
            <p className="text-gray-600 mb-4">{formData.description}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {formData.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Form expires on {formatDate(formData.expiryDate)}
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {formData.questions.map((question, qIndex) => (
              <div 
                key={qIndex}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <div className="mb-4">
                  <label className="block text-lg font-semibold">
                    {qIndex + 1}. {question.question}
                  </label>
                </div>

                {question.type === 'Text Area' && (
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows="4"
                    placeholder="Type your answer here..."
                    disabled
                  />
                )}

                {question.type === 'Multiple Option' && (
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center">
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          className="mr-2"
                          disabled
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'Checkbox' && (
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center">
                        <input
                          type="checkbox"
                          name={`question-${qIndex}`}
                          className="mr-2"
                          disabled
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'Dropdown' && (
                  <select 
                    className="w-full p-2 border rounded-md bg-white"
                    disabled
                  >
                    <option value="">Select an option</option>
                    {question.options.map((option, oIndex) => (
                      <option key={oIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
            >
              Back to Editor
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              onClick={() => navigate(`/publish/${formId}`)} // Add your publish route here
            >
              Publish Form
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default PreviewForm;