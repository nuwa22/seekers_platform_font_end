import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer/footer';
import ScrollToTop from '../../components/ScrollToTop';
import GetAllIoDocuments from './getAllIoDocuments';
import GetMyIoDocuments from './GetMyIoDocuments';

function IoDocument() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'my'

  return (
    <div className="bg-[#F4F7FC] min-h-screen flex flex-col font-[poppins]">
      <Navbar />

      <div className="pt-20 px-6 flex flex-col flex-grow">
       
        <div className="flex justify-between items-center ml-3 mb-4">
          <h1 className="text-black text-2xl font-bold">IO Document</h1>
          <input
            type="text"
            placeholder="Search by tag..."
            className="px-4 py-2 w-80 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
          />
        </div>

    
        <div className="flex justify-center gap-4 h-[40px] mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition duration-200 ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-blue-600 border border-blue-600'
            }`}
          >
            All IO Documents
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition duration-200 ${
              activeTab === 'my'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-blue-600 border border-blue-600'
            }`}
          >
            My IO Documents
          </button>
        </div>

        {/* Content Switch */}
        <div className="flex-grow">
          {activeTab === 'all' ? <GetAllIoDocuments /> : <GetMyIoDocuments />}
        </div>
      </div>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default IoDocument;
