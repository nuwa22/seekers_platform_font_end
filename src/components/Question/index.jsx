import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function QuestionBuilder() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Form states
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState([{
    id: 1,
    question: '',
    answerType: 'text',
    answer: '',
    options: ['Option 1', 'Option 2', 'Option 3']
  }]);

  // Constants
  const MAX_QUESTIONS = 20;
  const QUESTIONS_PER_PAGE = 10;

  // Tags handling
  const handleTagsChange = (e) => {
    const inputTags = e.target.value.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '')
      .slice(0, 5);
    setTags(inputTags);
    console.log(inputTags);
  };

  // Image upload handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Question management
  const handleAddQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) return;
    const newQuestion = {
      id: questions.length + 1,
      question: '',
      answerType: 'text',
      answer: '',
      options: ['Option 1', 'Option 2', 'Option 3']
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleOptionChange = (questionId, index, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[index] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleAddOption = (questionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, options: [...q.options, `Option ${q.options.length + 1}`] };
      }
      return q;
    }));
  };

  const handleRemoveOption = (questionId, index) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options.length > 1) {
        const newOptions = [...q.options];
        newOptions.splice(index, 1);
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  // Preview rendering
  const renderPreviewAnswer = (question) => {
    switch (question.answerType) {
      case 'text':
        return <div className="p-2 border border-gray-300 rounded-md">Text Answer</div>;
      case 'radio':
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input type="radio" name={`preview-${question.id}`} disabled className="mr-2" />
                {option}
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input type="checkbox" disabled className="mr-2" />
                {option}
              </label>
            ))}
          </div>
        );
      case 'dropdown':
        return (
          <select className="w-full p-2 border border-gray-300 rounded-md" disabled>
            <option value="">Select an option</option>
            {question.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  // Pagination
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 flex items-start gap-4">
        {/* Image Upload Area */}
        <div 
          className={`relative w-64 h-64 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer ${
            isDragging ? 'border-blue-500 bg-blue-50' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
          {image ? (
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>Drag and drop or click to upload</p>
            </div>
          )}
        </div>

        {/* Main Form */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-end gap-2">
            <button 
              className="p-2 border border-gray-300 rounded-md"
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye size={20} />
            </button>
            <button 
              className="p-2 border border-gray-300 rounded-md"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button className="p-2 bg-blue-600 text-white rounded-md">
              Publish
            </button>
          </div>

          {!isPreview ? (
            <>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter up to 5 tags (comma separated)"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={tags.join(', ')}
                    onChange={handleTagsChange}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
                <label className="block text-lg font-medium mb-2">Caption</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Write the Caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
                <label className="block text-lg font-medium mb-2">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Write the Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </>
          ) : (
            // Preview Display
            <div className="space-y-4">
              <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
                <h2 className="text-xl font-bold mb-2">{caption || 'Caption Preview'}</h2>
                <p className="text-gray-600">{description || 'Description Preview'}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isPreview ? (
        // Question Builder
        <>
          {currentQuestions.map((question) => (
            <div key={question.id} className="mb-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Question {question.id}</h3>
                <div className="flex items-center">
                  <select
                    className="mr-2 p-2 border border-gray-300 rounded-md"
                    value={question.answerType}
                    onChange={(e) => handleQuestionChange(question.id, 'answerType', e.target.value)}
                  >
                    <option value="text">Text Area</option>
                    <option value="radio">Radio Button</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                  <button 
                    className="p-1 text-red-500"
                    onClick={() => handleDeleteQuestion(question.id)}
                    disabled={questions.length <= 1}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Write Your Question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                />

                {question.answerType === 'text' ? (
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Write Your Answer"
                    value={question.answer}
                    onChange={(e) => handleQuestionChange(question.id, 'answer', e.target.value)}
                  />
                ) : (
                  <div className="space-y-2 mt-2">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type={question.answerType === 'radio' ? 'radio' : 'checkbox'}
                          disabled
                          className="mr-2"
                        />
                        <input
                          type="text"
                          className="flex-1 p-2 border border-gray-300 rounded-md"
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                        />
                        <button 
                          className="ml-2 text-red-500"
                          onClick={() => handleRemoveOption(question.id, index)}
                          disabled={question.options.length <= 1}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    <button 
                      className="flex items-center text-blue-500 mt-2"
                      onClick={() => handleAddOption(question.id)}
                    >
                      <Plus size={18} className="mr-1" /> Add Option
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div 
            className="p-4 bg-gray-50 border border-gray-200 border-dashed rounded-md flex items-center justify-center cursor-pointer" 
            onClick={handleAddQuestion}
            disabled={questions.length >= MAX_QUESTIONS}
          >
            {questions.length < MAX_QUESTIONS ? (
              <>
                <Plus size={24} className="text-gray-400 mr-2" />
                <span className="text-gray-500">Add New Question</span>
              </>
            ) : (
              <span className="text-gray-400">Maximum 20 questions reached</span>
            )}
          </div>
        </>
      ) : (
        // Questions Preview
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="mb-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <h3 className="text-lg font-medium mb-2">{question.question || 'Question Preview'}</h3>
              {renderPreviewAnswer(question)}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button 
          className="flex items-center p-2 border border-gray-300 rounded-md"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ArrowLeft size={20} className="mr-1" /> Previous
        </button>
        
        <div className="text-gray-500">
          Page {currentPage} of {totalPages}
        </div>

        <button 
          className="flex items-center p-2 bg-blue-600 text-white rounded-md"
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage >= totalPages}
        >
          Next <ArrowRight size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
}