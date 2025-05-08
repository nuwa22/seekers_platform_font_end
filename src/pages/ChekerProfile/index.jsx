import { useState } from 'react';
import { Trash2, PlusCircle } from 'lucide-react';

export default function QuestionFormBuilder() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'Write the Your Question',
      type: 'text',
      options: []
    }
  ]);

  const questionTypes = [
    { value: 'text', label: 'Text Area' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' }
  ];

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      title: 'Write the Your Question',
      type: 'text',
      options: []
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(question => 
      question.id === id ? { ...question, [field]: value } : question
    ));
  };

  const addOption = (questionId) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const newOptions = [...question.options, { id: question.options.length + 1, text: 'New Option' }];
        return { ...question, options: newOptions };
      }
      return question;
    }));
  };

  const updateOption = (questionId, optionId, value) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const updatedOptions = question.options.map(option => 
          option.id === optionId ? { ...option, text: value } : option
        );
        return { ...question, options: updatedOptions };
      }
      return question;
    }));
  };

  const removeOption = (questionId, optionId) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const filteredOptions = question.options.filter(option => option.id !== optionId);
        return { ...question, options: filteredOptions };
      }
      return question;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Question Form Builder</h1>
      
      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex flex-col gap-4">
              {/* Question Header */}
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={question.title}
                  onChange={(e) => updateQuestion(question.id, 'title', e.target.value)}
                  className="border-b border-gray-300 bg-transparent flex-grow text-lg font-medium focus:outline-none focus:border-blue-500"
                />
                <button 
                  onClick={() => removeQuestion(question.id)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              {/* Question Type */}
              <div className="flex items-center gap-4">
                <label className="font-medium">Answer Type:</label>
                <select
                  value={question.type}
                  onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  {questionTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Answer Preview */}
              <div className="mt-2">
                {question.type === 'text' && (
                  <textarea 
                    placeholder="Write Your Answer"
                    className="w-full p-2 border border-gray-300 rounded-md h-20"
                    disabled
                  ></textarea>
                )}
                
                {question.type === 'dropdown' && (
                  <div className="space-y-4">
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="" disabled selected>Select an answer</option>
                      {question.options.map(option => (
                        <option key={option.id} value={option.id}>{option.text}</option>
                      ))}
                    </select>
                    
                    <div className="pt-2 border-t">
                      <h4 className="font-medium mb-2">Options:</h4>
                      <div className="space-y-2">
                        {question.options.map(option => (
                          <div key={option.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                              className="border border-gray-300 rounded p-1 flex-grow"
                            />
                            <button 
                              onClick={() => removeOption(question.id, option.id)}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => addOption(question.id)}
                        className="mt-2 flex items-center gap-1 text-blue-500 hover:text-blue-700"
                      >
                        <PlusCircle size={16} />
                        <span>Add Option</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {question.type === 'checkbox' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {question.options.map(option => (
                        <div key={option.id} className="flex items-center gap-2">
                          <input type="checkbox" disabled />
                          <span>{option.text}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-2 border-t">
                      <h4 className="font-medium mb-2">Options:</h4>
                      <div className="space-y-2">
                        {question.options.map(option => (
                          <div key={option.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                              className="border border-gray-300 rounded p-1 flex-grow"
                            />
                            <button 
                              onClick={() => removeOption(question.id, option.id)}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => addOption(question.id)}
                        className="mt-2 flex items-center gap-1 text-blue-500 hover:text-blue-700"
                      >
                        <PlusCircle size={16} />
                        <span>Add Option</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-between">
        <button 
          onClick={addQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          <span>Add Question</span>
        </button>
        
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Save Form
        </button>
      </div>
    </div>
  );
}