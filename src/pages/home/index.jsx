import { useState } from "react";
import Navbar from "../../components/navbar";
import Form from '../../components/form/form';
import Footer from '../../components/footer/footer'; // ✅ Import the Footer
import ScrollToTop from "../../components/ScrollToTop";

const dummyForms = [
  { id: 1, tags: ['design', 'frontend'] },
  { id: 2, tags: ['backend', 'node'] },
  { id: 3, tags: ['ui', 'ux'] },
  { id: 4, tags: ['react', 'javascript'] },
  { id: 5, tags: ['express', 'api'] },
  { id: 6, tags: ['fullstack', 'project'] },
  { id: 7, tags: ['css', 'tailwind'] },
  { id: 8, tags: ['html', 'web'] },
  { id: 9, tags: ['mysql', 'database'] },
  { id: 10, tags: ['typescript', 'code'] },
];

const Home = () => {
  const [searchTag, setSearchTag] = useState("");

  const filteredForms = dummyForms.filter(form =>
    form.tags.some(tag =>
      tag.toLowerCase().includes(searchTag.toLowerCase())
    )
  );

  return (
    <div className="bg-[#F4F7FC] min-h-screen flex flex-col pt-20">
      <Navbar />

      {/* Title and Search Row */}
      <div className="flex justify-between items-center px-6 ml-3 mt-6 mb-4">
        <h1 className="text-black text-2xl font-bold">Home</h1>
        <input
          type="text"
          placeholder="Search by tag..."
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          className="px-4 py-2 w-80 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
        />
      </div>

      {/* Filtered Forms */}
      <div className="flex flex-col gap-8 items-center px-4 pb-10 flex-grow">
        {filteredForms.map((form) => (
          <Form key={form.id} tags={form.tags} />
        ))}
        {filteredForms.length === 0 && (
          <p className="text-gray-500">No forms match the entered tag.</p>
        )}
      </div>

      {/* ✅ Footer */}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
