import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    setIsAnimated(true);
  }, []);
  
  return (
    <div className="relative w-full h-screen flex justify-center items-center flex-col bg-no-repeat bg-center"
         style={{ backgroundImage: `url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')` }}>
      
      {/* 404 Text */}
      <p className={`absolute top-12 text-7xl font-bold text-black ${isAnimated ? "animate-bounce" : ""}`}>404</p>
      
      {/* Error Messages */}
      <h2 className="absolute bottom-32 text-3xl font-medium">Look like you're lost</h2>
      <h5 className="absolute bottom-24 text-gray-500">the page you are looking for not available</h5>
      
      {/* Home Button with Gradient */}
      <a href="/home" 
         className="absolute bottom-4 py-3 px-6 text-2xl text-white no-underline rounded-xl hover:scale-105 transition-transform duration-300"
         style={{ 
           background: '#0A66C2'
         }}>
        Go to Home
      </a>
    </div>
  );
}