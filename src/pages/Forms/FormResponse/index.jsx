import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar';
import ScrollToTop from '../../../components/ScrollToTop';
import Footer from '../../../components/footer/footer';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const { value, fullName } = payload[0].payload;

  const formatTooltipText = (text, maxCharsPerLine = 50) => {
    if (!text) return [];

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + ' ' + word).length > maxCharsPerLine && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = currentLine ? currentLine + ' ' + word : word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };

  const textLines = formatTooltipText(fullName);

  return (
    <div className="custom-tooltip bg-white p-2 border border-gray-200 rounded-md shadow-md">
      {textLines.map((line, index) => (
        <p key={index} className="text-sm mb-0">{line}</p>
      ))}
      <p className="text-sm font-semibold text-blue-600 mt-1">{value}%</p>
    </div>
  );
};

function FormResponse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = [
  '#1E3A8A', 
  '#047857', 
  '#B91C1C', 
  '#78350F', 
  '#3F6212', 
  '#7C2D12', 
  '#4C1D95', 
  '#0C4A6E', 
  '#701A75', 
  '#475569', 
];



  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/forms/statistics/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
        setError("Failed to load form responses");
        toast.error("Failed to load form responses");
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [id]);

  const processFormData = (data) => {
    if (!data) return { questions: [] };
    if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length > 0) {
      const questions = Object.entries(data).map(([questionText, answers]) => ({
        questionText,
        type: determineQuestionType(answers),
        answers: processAnswers(answers)
      }));
      return { questions };
    }
    return data;
  };

  const determineQuestionType = (answers) => {
    if (typeof answers === 'object' && Object.values(answers).every(val => typeof val === 'string' && val.includes('%'))) {
      return '';
    }

    return 'pie';
  };

  const processAnswers = (answers) => {
    if (typeof answers !== 'object') return answers;
    const processedAnswers = {};
    Object.entries(answers).forEach(([option, value]) => {
      if (typeof value === 'string' && value.includes('%')) {
        const numericValue = parseFloat(value.replace('%', ''));
        processedAnswers[option] = numericValue;
      } else {
        processedAnswers[option] = value;
      }
    });
    return processedAnswers;
  };

  const generateChartData = (answers) => {
    if (!answers) return [];
    return Object.entries(answers).map(([option, count]) => ({
      name: option.length > 20 ? option.substring(0, 20) + '...' : option,
      value: count,
      fullName: option
    }));
  };

  const renderPieChart = (data) => {
    if (!data || data.length === 0) {
      return <p className="text-gray-500 italic">No data available for chart.</p>;
    }
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              name && percent ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const processedData = processFormData(formData);

  return (
    <div className="bg-[#F4F7FC] min-h-screen flex flex-col font-[poppins]">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-4 pt-25  pb-16 flex-grow">
        {loading ? (
          <div className="flex items-center justify-center h-60 text-center">
            <div>
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full
               animate-spin mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading form responses...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center h-60">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md">
              <p>{error}</p>
            </div>
            <button
              className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => navigate(-1)}
            >
              Back to Forms
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <button
              onClick={() => navigate(-1)}
              >
              <FaArrowLeft className="text-[20px] font-bold cursor-pointer text-black" />
              </button>
              <h1 className="text-black text-xl md:text-2xl font-bold">
              Create IO Document
              </h1>
            </div>
            {formData?.title && (
              <h2 className="text-2xl text-gray-700 mb-8 text-center font-semibold">{formData.title}</h2>
            )}

            {!processedData || processedData.questions.length === 0 ? (
              <p className="text-center text-gray-500 italic">No questions available for this form.</p>
            ) : (
              <div className="space-y-10">
                {processedData.questions.map((question, index) => (
                  <div
                    key={index}
                    className="w-full bg-gray-100 shadow-md rounded-lg p-8 border border-gray-300 hover:shadow-lg transition"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full select-none">
                        Question {index + 1}
                      </span>
                      <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full select-none capitalize">
                        {question.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-5 text-gray-800">{question.questionText}</h3>

                    {question.type === 'text' ? (
                      <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
                        {question.answers && Object.keys(question.answers).length > 0 ? (
                          Object.entries(question.answers).map(([answer, percentage], i) => (
                            <div
                              key={i}
                              className="bg-white border border-gray-300 p-4 rounded-md shadow-sm"
                            >
                              <p className="text-gray-800 whitespace-pre-wrap break-words">
                                {answer}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">{percentage}</p>
                            </div>
                          ))
                        ) : (
                          <p className="italic text-gray-500">No text responses yet.</p>
                        )}
                      </div>
                    ) : (
                      renderPieChart(generateChartData(question.answers))
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default FormResponse;
