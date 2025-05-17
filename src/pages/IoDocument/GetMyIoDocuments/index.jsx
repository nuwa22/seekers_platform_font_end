import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import toast from 'react-hot-toast';

function GetMyIoDocuments({ tagFilter }) {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
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
        setDocuments(response.data);
        setFilteredDocuments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch documents:", error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/io/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Document deleted successfully.");
      setDocuments((prevDocs) => {
        const updatedDocs = prevDocs.filter((item) => item.id !== id);
        setFilteredDocuments(updatedDocs.filter(doc => filterDocument(doc, tagFilter)));
        return updatedDocs;
      });
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Helper function to determine if a document matches the filter
  const filterDocument = (doc, filter) => {
    if (!filter || !filter.trim()) return true;
    
    // Check if document has tags property and if any tag includes the filter text
    if (doc.tags && Array.isArray(doc.tags)) {
      return doc.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()));
    } else if (doc.tags && typeof doc.tags === 'string') {
      // If tags is a comma-separated string, split and check
      return doc.tags.toLowerCase().includes(filter.toLowerCase());
    }
    
    // Also search in title and description as fallback
    return (
      doc.title.toLowerCase().includes(filter.toLowerCase()) ||
      doc.description.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // Filter documents when tagFilter changes
  useEffect(() => {
    if (!tagFilter || !tagFilter.trim()) {
      // If filter is empty, show all documents
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter(doc => filterDocument(doc, tagFilter));
      setFilteredDocuments(filtered);
    }
  }, [tagFilter, documents]);

  return (
    <div className='ml-3 mt-6 mb-4 px-6 font-[poppins]'>
      {filteredDocuments.length === 0 ? (
        <div className="max-w-7xl mx-auto p-6 text-center">
          <p className="text-gray-600 text-lg">No documents found matching your search.</p>
        </div>
      ) : (
        filteredDocuments.map((doc, index) => (
          <div
            key={index}
            className="max-w-7xl mx-auto bg-white rounded-xl shadow-md flex flex-col sm:flex-row gap-6 p-6 mb-6 border border-gray-200"
          >
            <img
              src={doc.profile_photo}
              alt="Document preview"
              className="rounded-xl w-full sm:w-[400px] h-[400px] object-cover shadow-lg"
            />
            
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={doc.io_owner_profile_picture}
                  alt="Owner profile"
                  className="rounded-full w-12 h-12 object-cover border-1 border-[#0A66C2] shadow-lg"
                />
                <div>
                  <h2 className="font-bold text-[24px] leading-6 text-gray-900">{doc.owner_name}</h2>
                </div>
                
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="ml-auto bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
                
                <button
                  type="button"
                  onClick={() => window.open(doc.pdf_file, "_blank")}
                  className="ml-2 w-[100px] bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#0056A3] transition"
                >
                  View
                </button>
              </div>
              
              <h3 className="font-bold text-[29px] text-gray-900 leading-tight">{doc.title}</h3>
              
              <p className="text-gray-900 text-sm leading-relaxed">{doc.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default GetMyIoDocuments;