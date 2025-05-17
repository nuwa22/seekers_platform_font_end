import React, { useState } from 'react';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer/footer';
import ScrollToTop from '../../../components/ScrollToTop';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function CreateIoDocument() {
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const supabase = createClient(
    "https://vojolyfgpatvtplddwpq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvam9seWZncGF0dnRwbGRkd3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNjg5MDIsImV4cCI6MjA2MTc0NDkwMn0.ZjD4NDDd2DSLDd810jSOYAfQqeBikcJsNt-HELa-ts0"
  );

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `image_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('formprofile')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      toast.error('Error uploading image.');
    } else {
      const { data } = supabase.storage.from('formprofile').getPublicUrl(filePath);
      setImage(data.publicUrl);
      toast.success('Image uploaded successfully.');
    }
  };

  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed.');
      return;
    }

    const fileName = `pdf_${Date.now()}.pdf`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('formprofile')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      toast.error('Error uploading PDF.');
    } else {
      const { data } = supabase.storage.from('docs').getPublicUrl(filePath);
      setPdf(data.publicUrl);
      toast.success('PDF uploaded successfully.');
    }
  };

  const handleTagInputChange = (e) => {
    const input = e.target.value;
    if (input.includes(',')) {
      const newTags = input
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag && !tags.includes(tag));
      const allowed = 5 - tags.length;
      if (allowed > 0) {
        setTags([...tags, ...newTags.slice(0, allowed)]);
      }
      setTagInput('');
    } else {
      setTagInput(input);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };
console.log('PDF:', pdf);
console.log('Image:', image);

  const handlePublishButton = () => {
    if (tags.length <= 0) return toast.error('Please add at least one tag.');
    if (!title.trim()) return toast.error('Please add a title.');
    if (!description.trim()) return toast.error('Please add a description.');
    if (!image) return toast.error('Please upload a profile image.');
    if (!pdf) return toast.error('Please upload a PDF file.');

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/io/upload`,
        {
          title,
          description,
          tags,
          profile_photo: image,
          pdf_file: pdf,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        toast.success('IO Document published successfully.');
        navigate('/my-forms');
      })
      .catch(() => {
        toast.error('Error publishing IO Document.');
      });
  };

  return (
    <div className="bg-[#F4F7FC]">
      <Navbar />
      <ScrollToTop />
      <div className="min-h-screen font-[poppins] px-4 md:px-10 pt-24">
        <h1 className="text-black text-xl md:text-2xl font-bold mb-6">Create IO Document</h1>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          {/* Image Upload */}
          <div className="flex justify-center items-center mt-4">
            <label className="relative bg-white border-2 border-dashed border-gray-300 shadow-md rounded-xl w-[250px] h-[250px] md:w-[400px] md:h-[400px] flex justify-center items-center cursor-pointer hover:bg-gray-200 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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

          {/* Form Details */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6 w-full">
            <div className="flex flex-col md:flex-row justify-end gap-3">
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 order-2 md:order-1">
                Cancel
              </button>
              <button
                onClick={handlePublishButton}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 order-1 md:order-2"
              >
                Publish
              </button>
            </div>

            {/* Tags */}
            <div className="w-full md:w-[250px]">
              <div className="flex flex-wrap items-center gap-2 px-3 py-1 rounded-md shadow-md border border-gray-200 bg-white focus-within:outline focus-within:outline-blue-300">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center"
                  >
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

            {/* Title */}
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

            {/* Description */}
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

        {/* PDF Upload */}
        <div className="flex mt-8 md:mt-10 mb-6">
          <div className="h-[200px] bg-white border-2 border-dashed border-gray-300 shadow-md rounded-xl text-gray-400 font-medium px-4 py-2 w-full flex justify-center items-center hover:bg-gray-200 transition">
            <label className="flex flex-col items-center cursor-pointer">
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                className="hidden"
              />
              <h2 className="text-gray-600 text-[25px]">Upload Your IO Document</h2>
              <span className="text-gray-400">Only PDF format supported</span>
              {pdf && <p className="text-green-600 text-sm mt-2">PDF uploaded.</p>}
            </label>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default CreateIoDocument;
