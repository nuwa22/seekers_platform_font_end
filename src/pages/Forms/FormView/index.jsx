import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/navbar';
import ScrollToTop from '../../../components/ScrollToTop';
import Footer from '../../../components/footer/footer';
import toast from 'react-hot-toast';

function FormDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [page, setPage] = useState(0);

  const QUESTIONS_PER_PAGE = 10;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/forms/get-form/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const formData = res.data;
        let parsedQuestions = [];

        try {
          parsedQuestions = Array.isArray(formData.questions)
            ? formData.questions
            : JSON.parse(formData.questions);
        } catch (e) {
          console.error('Failed to parse questions', e);
          parsedQuestions = [];
        }

        setForm(formData);
        setQuestions(parsedQuestions);
      })
      .catch((err) => {
        console.error('Failed to fetch form:', err);
        setQuestions([]);
      });
  }, [id]);

  if (!form) return <p className="text-center mt-10">Loading...</p>;

  const handleAnswerChange = (index, value, optionType, optionValue) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };

      if (optionType === 'checkbox') {
        const prevChecked = newAnswers[index] || [];
        if (prevChecked.includes(optionValue)) {
          newAnswers[index] = prevChecked.filter((v) => v !== optionValue);
        } else {
          newAnswers[index] = [...prevChecked, optionValue];
        }
      } else {
        newAnswers[index] = value;
      }

      return newAnswers;
    });
  };

  const handleSubmit = () => {
    const answersArray = questions.map((_, idx) =>
      answers[idx] ?? (questions[idx].type === 'Checkbox' ? [] : '')
    );
    if (answersArray.length !== questions.length) return toast.error('Please answer all questions.');
    if (answersArray.some((answer) => answer === '')) {
      return toast.error('Please answer all questions.');
    }
    
    


    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/forms/submit`,
        {
          formId: id,
          answers: answersArray,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        toast.success('Answer submitted successfully.');
        navigate('/home');
      })
      .catch(() => {
        toast.error('Error submitting answer.');
      });
  };

  
  const startIndex = page * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const paginatedQuestions = questions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  return (
    <div className="bg-[#F4F7FC]">
      <Navbar />
      <div className="min-h-screen font-[poppins] px-4 md:px-10 pt-24">
        <h1 className="text-black text-xl md:text-2xl font-bold mb-6">Submit Response</h1>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          <div className="flex justify-center items-center mt-4 w-[400px] h-[400px]">
            <img
              src={form.form_profile_photo}
              alt="Preview"
              className="object-cover w-full h-full rounded-xl shadow-md "
            />
          </div>
          <div className="flex-1 flex flex-col gap-4 md:gap-6 w-full">
            <div className="flex flex-col md:flex-row justify-end gap-3">
              <button
                onClick={() => navigate(-1)}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 order-2 md:order-1"
              >
                Back
              </button>
            </div>

            <div className="shadow-md border border-gray-200 bg-white rounded-md p-4">
              <h1 className="text-[24px] font-bold mb-2 block">{form.title}</h1>
            </div>
            <div className="shadow-md border border-gray-200 bg-white rounded-md p-4">
              <p className="text-[14px] font-semibold mb-1 block">{form.description}</p>
            </div>
          </div>
        </div>

        <div className="">
          {questions.length === 0 && <p>No questions available.</p>}
          {paginatedQuestions.map((q, idx) => {
            const questionIndex = startIndex + idx;

            return (
              <div
                key={questionIndex}
                className="shadow-md border border-gray-200 bg-white rounded-md p-4 my-4 md:my-6"
              >
                <label className="block mb-2 font-semibold text-[20px] ">{1 + questionIndex}. {q.label}</label>

                {q.type === 'Text Area' && (
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2"
                    rows={4}
                    placeholder="Your answer"
                    value={answers[questionIndex] || ''}
                    onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                  />
                )}

                {q.type === 'Dropdown' && (
                  <select
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={answers[questionIndex] || ''}
                    onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                  >
                    <option value="">Select an option</option>
                    {q.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {q.type === 'Checkbox' && (
                  <div className="flex flex-col flex-wrap">
                    {q.options.map((opt, i) => (
                      <label key={i} className="inline-flex flex- items-center mr-4 mb-[8px] text-[18px]">
                        <input
                          type="checkbox"
                          className="w-[20px] h-[20px] border-gray-300 rounded-md  mr-[8px]"
                          value={opt}
                          checked={(answers[questionIndex] || []).includes(opt)}
                          onChange={() =>
                            handleAnswerChange(questionIndex, null, 'checkbox', opt)
                          }
                        />
                        <span className="ml-2">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'Multiple Option' && (
                  <div className="flex flex-col flex-wrap">
                    {q.options.map((opt, i) => (
                      <label key={i} className="inline-flex items-center mr-4 mb-[8px] text-[18px]">
                        <input
                          type="radio"
                          name={`question_${questionIndex}`}
                          value={opt}
                          className="w-[20px] h-[20px] border-gray-300 rounded-md  mr-[8px]"
                          checked={answers[questionIndex] === opt}
                          onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                        />
                        <span className="ml-2">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>


        <div className="flex justify-between items-center mt-6 mb-10 ">

            <div>
                <button
                disabled={page === 0}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                className={`px-4 py-2 rounded-md border ${
                    page === 0
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
                >
                Previous
                </button>
            </div>

    
            <div>
                {page < totalPages - 1 && (
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                    Next
                </button>
                )}

                {page === totalPages - 1 && (
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Submit
                </button>
                )}
            </div>
</div>

      </div>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default FormDetails;
