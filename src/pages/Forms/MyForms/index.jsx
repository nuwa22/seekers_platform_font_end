import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../../components/navbar";
import ScrollToTop from "../../../components/ScrollToTop";
import Footer from "../../../components/footer/footer";
import GetMyAllForms from "../GetMyAllForms";

const MyForms = () => {
  const [tagFilter, setTagFilter] = useState("");
  
  const handleTagFilterChange = (e) => {
    setTagFilter(e.target.value);
  };

  return (
    <div className="bg-[#F4F7FC] min-h-screen flex flex-col font-[poppins]">
      <Navbar />
      <div className="flex justify-between items-center px-6 ml-3 mt-6 mb-4 pt-20">
        <h1 className="text-black text-2xl font-bold">My Forms</h1>
        <input
          type="text"
          value={tagFilter}
          onChange={handleTagFilterChange}
          placeholder="Search by tag..."
          className="px-4 py-2 w-80 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
        />
      </div>
      <div className="w-full bg-[#F4F7FC]">
        <GetMyAllForms tagFilter={tagFilter} />
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default MyForms;