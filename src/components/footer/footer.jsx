import { useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Footer Section */}
      <footer className="bg-[#0A66C2] text-white px-6 py-12 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 font-[poppins]">
          {/* Logo */}
          <div>
            <h1
              className="text-3xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              SEEKERS
            </h1>
          </div>

          {/* Other Pages */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Other Pages</h2>
            <ul className="space-y-2 cursor-pointer">
              <li onClick={() => navigate("/home")}>Home</li>
              <li onClick={() => navigate("/create-form")}>Create Form</li>
              <li onClick={() => navigate("/io-document")}>IO Document</li>
              <li onClick={() => navigate("/my-forms")}>Forms</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 cursor-pointer">
              <li onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
              <li onClick={() => navigate("/terms")}>Terms of Services</li>
              <li onClick={() => navigate("/faq")}>F&Q</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">
              Our Support and Sales team is available 24/7 to answer your queries
            </p>
            <div className="flex space-x-4 mt-4 text-2xl">
              <a href="tel:+94771234567" className="hover:text-gray-300">
                <FaPhoneAlt />
              </a>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="mailto:support@seekers.com"
                className="hover:text-gray-300"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="my-8 border-white/50" />
        <div className="text-center text-white font-medium">
          © 2025 SEEKERS. All Rights Reserved.
        </div>
      </footer>

      {/* Fixed Scroll-to-Top Button */}
    

    </>
  );
};

export default Footer;
