import React, { useState } from 'react';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer/footer';
import ScrollToTop from '../../../components/ScrollToTop';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function CreateForm() {
  const [image, setImage] = useState(null);
  const supabase = createClient("https://vojolyfgpatvtplddwpq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvam9seWZncGF0dnRwbGRkd3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNjg5MDIsImV4cCI6MjA2MTc0NDkwMn0.ZjD4NDDd2DSLDd810jSOYAfQqeBikcJsNt-HELa-ts0");
  const [expiryDate, setExpiryDate] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { label: '', type: 'Text Area', options: [''] }
  ]);

  const navigate = useNavigate();

   const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from("formprofile")
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Error uploading image:", error.message);
    } else {
      const { data } = supabase.storage.from("formprofile").getPublicUrl(filePath);
      const url = data.publicUrl;
      console.log("Image URL:", url);
      setImage(data.publicUrl);
      console.log("Image uploaded successfully:");
    }
  };

  

  const handleTagInputChange = (e) => {
    const input = e.target.value;
    if (input.includes(',')) {
      const newTags = input
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0 && !tags.includes(tag));
      const allowed = 5 - tags.length;
      if (allowed > 0) {
        setTags([...tags, ...newTags.slice(0, allowed)]);
      }
      setTagInput('');
    } else {
      setTagInput(input);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].label = value;
    setQuestions(updated);
  };

  const handleTypeChange = (index, type) => {
    const updated = [...questions];
    updated[index].type = type;
    if (type === 'Text Area') {
      updated[index].options = [''];
    } else if (updated[index].options.length === 0) {
      updated[index].options = [''];
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== oIndex);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { label: '', type: 'Text Area', options: [''] }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handlePublsihButton = () => {
    if(tags <= 0)return toast.error("Please add at least one tag.");
    if(expiryDate === null)return toast.error("Please select an expiry date.");
    if(expiryDate < new Date())return toast.error("Expiry date cannot be in the past.");
    if(title === '')return toast.error("Please add a title.");
    if(description === '')return toast.error("Please add a description.");
    if(questions.length <= 0)return toast.error("Please add at least one question.");
    if(questions.length > 20)return toast.error("You can only add up to 20 questions.");
    if(questions.some(q => q.question === ''))return toast.error("Please fill all questions.");
    if(questions.some(q => q.type !== 'Text Area' && q.options.length <= 0))
      return toast.error("Please add at least one option for each question.");
    if(questions.some(q => q.type !== 'Text Area' && q.options.some(o => o === '')))
      return toast.error("Please fill all options.");
    if(image === null)return toast.error("Please add a profile image.");
    
    

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/forms/publish`, {
      title,
      description,
      tags,
      questions,
      expiryDate,
      formProfilePhoto: image,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(() => {
      toast.success("Form published successfully.");
      navigate('/my-forms'); 
    })
    .catch(() => {
      toast.error("Error publishing form.");
    });
  };

  return (
    <div className="bg-[#F4F7FC]">
      <Navbar />
      <ScrollToTop />
      <div className="min-h-screen font-[poppins] px-4 md:px-10 pt-24">
        <h1 className="text-black text-xl md:text-2xl font-bold mb-6">Create Form</h1>
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          
          <div className="flex justify-center items-center mt-4">
              <label
              className="relative bg-white border-2 border-dashed border-gray-300 shadow-md rounded-xl w-[250px] h-[250px]
              md:w-[400px] md:h-[400px] flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
              >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files[0]) {
              handleImageChange(e);
            }
          }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="object-cover w-full h-full rounded-xl shadow-md"
            />
          ) : (
            <span className="text-gray-400">Click to upload image</span>
          )}
              </label>
            </div>

          
          <div className="flex-1 flex flex-col gap-4 md:gap-6 w-full">
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-end gap-3">
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 order-2 md:order-1">
                Cancel
              </button>
              <button
                onClick={handlePublsihButton}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 order-1 md:order-2"
              >
                Publish
              </button>
            </div>

            {/* Tags and Date Picker */}
            <div className="flex flex-col md:flex-row items-start gap-3 w-full">
              <div className="w-full md:w-[250px]">
                <div className="flex flex-wrap items-center gap-2 w-full min-h-[40px]  px-3 py-1 rounded-md
                shadow-md border border-gray-200 bg-white focus-within:outline focus-within:outline-blue-300">
                  {tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm flex
                    items-center">
                      {tag}
                      <button 
                        onClick={() => removeTag(index)} 
                        className="ml-1 text-red-500 font-bold hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    placeholder={tags.length >= 5 ? 'Max 5 tags' : 'Enter tags'}
                    className="flex-1 min-w-[80px] py-2 px-1 outline-none text-sm disabled:opacity-50"
                    disabled={tags.length >= 5}
                  />
                </div>
              </div>
              
              <div className="w-full md:w-auto md:ml-auto">
                <DatePicker
                  selected={expiryDate}
                  onChange={(date) => setExpiryDate(date)}
                  placeholderText="Select Expiry Date"
                  className="w-full md:w-[250px] h-[40px] px-3 rounded-md shadow-md border border-gray-200 bg-white text-gray-500 focus:outline-none"
                  calendarClassName="custom-datepicker"
                />
              </div>
            </div>

            {/* Title Input */}
            <div className="shadow-md border border-gray-200 bg-white rounded-md p-4">
              <label className="text-gray-700 text-md font-semibold mb-2 block">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write the Title"
                className="w-full focus:outline-none py-2 px-1"
              />
            </div>

            {/* Description Input */}
            <div className="h-[112px] shadow-md border border-gray-200 bg-white rounded-md p-4">
              <label className="text-gray-700 text-md font-semibold mb-1 block">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write the Description"
                className="w-full py-2 px-1 text-left resize-none focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="shadow-md border border-gray-200 bg-white rounded-md p-4 my-4 md:my-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
              <h1 className="text-gray-700 text-md font-semibold">Question {questionIndex + 1}</h1>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
                <select
                  value={question.type}
                  onChange={(e) => handleTypeChange(questionIndex, e.target.value)}
                  className="w-full md:w-[200px] lg:w-[250px] px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                >
                  <option>Text Area</option>
                  <option>Multiple Option</option>
                  <option>Checkbox</option>
                  <option>Dropdown</option>
                </select>
                <button
                  onClick={() => removeQuestion(questionIndex)}
                  className="text-red-600 hover:text-red-800 text-sm flex items-center"
                >
                  <FaTrash className="mr-1" />
                  Remove
                </button>
              </div>
            </div>

            {/* Question Input */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full border-b border-black focus:outline-none mt-3"
                placeholder="Write your question"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
              />
            </div>

            {/* Options */}
            {question.type !== 'Text Area' && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="relative mb-4">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      className="w-full pr-8 border-b border-black focus:outline-none mt-3"
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    <button
                      onClick={() => removeOption(questionIndex, optionIndex)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addOption(questionIndex)}
                  className="mt-2 text-blue-600 hover:underline text-sm"
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Question Button */}
        <div className="flex mt-8 md:mt-10 mb-6">
          <button
            onClick={addQuestion}
            className="bg-white shadow-md border border-gray-200 text-gray-400 font-medium text-[20px] md:text-[25px] px-4
            py-2 rounded-md w-full h-[80px] md:h-[100px] flex items-center justify-center hover:bg-gray-50 cursor-pointer"
          >
            <i className="fas fa-plus mr-2 bg-gray-300 text-white p-2 rounded-full text-[12px] md:text-[15px]"></i>
            Add Question
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateForm;