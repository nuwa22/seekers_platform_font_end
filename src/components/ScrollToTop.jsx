import { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-[#0A1A2E] text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#0056A3] transition-all duration-300"
      style={{
        animation: "scroll-up-loop 2s infinite ease-in-out",
      }}
    >
      <FaArrowUp className="text-xl" />
      <style>
        {`
          @keyframes scroll-up-loop {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ScrollToTop;
