import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignupPng from "/assets/signup.png";
import toast from "react-hot-toast";

function RegisterPage() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e) =>
    setPassword(e.target.value);
  const handleNameChange = (e) =>
    setName(e.target.value);

  const handleRegister = () => {
    if (email === "") return toast.error("Please enter your name");
    if (password === "") return toast.error("Please enter your Email");
    if (name === "") return toast.error("Please enter your password");

    axios.post("http://localhost:5000/api/users/register", {
      email,
      password,
      name,
    }).then(() => {
      toast.success("Registration successful!");
      navigateLogin();
    });
  };

  const handleSocialRegister = (provider) => {
        toast("😓 Social register with " + provider + " is not implemented yet.");
    };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full bg-gray-300 font-sans p-5 box-border">
      <div className="flex bg-white rounded-2xl shadow-xl max-w-[1000px] w-full overflow-hidden flex-col md:flex-row">
        <div className="flex-1 bg-[#0A66C2] flex justify-center items-center p-10 hidden md:flex">
          <img src={SignupPng} alt="signupImg" className="max-w-full h-auto" />
        </div>
        <div className="flex-1 p-10 flex flex-col justify-center">
          <span className="text-2xl font-bold text-[#0A66C2] mb-5 text-center">Create Account</span>

          <div className="flex justify-between mb-5 flex-col md:flex-row">
            <button 
              className="flex items-center justify-center text-[#0A66C2] w-full md:w-[48%] py-2 border-[3px] border-[#0A66C2] rounded-full bg-white hover:bg-gray-100 mb-2 md:mb-0"
              onClick={() => handleSocialRegister("google")}
            >
              <FaGoogle className="mr-2 text-lg text-[#0A66C2]" />
              <span>Google</span>
            </button>
            <button 
              className="flex items-center justify-center text-[#0A66C2] w-full md:w-[48%] py-2 border-[3px] border-[#0A66C2] rounded-full bg-white hover:bg-gray-100"
              onClick={() => handleSocialRegister("facebook")}
            >
              <FaFacebook className="mr-2 text-lg text-[#0A66C2]" />
              <span>Facebook</span>
            </button>
          </div>

          <div className="relative text-center text-gray-600 mb-5">
            <span>or</span>
            <div className="absolute left-0 top-1/2 w-[40%] h-px bg-gray-300 -translate-y-1/2"></div>
            <div className="absolute right-0 top-1/2 w-[40%] h-px bg-gray-300 -translate-y-1/2"></div>
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              className="mb-4 py-3 bg-transparent text-[#0A66C2] border-b-2 border-[#0A66C2] text-base focus:outline-none"
              placeholder="Enter Your name"
              value={name}
              onChange={handleNameChange}
            />
            <input
              type="email"
              className="mb-4 py-3 bg-transparent text-[#0A66C2] border-b-2 border-[#0A66C2] text-base focus:outline-none"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              className="mb-4 py-3 bg-transparent text-[#0A66C2] border-b-2 border-[#0A66C2] text-base focus:outline-none"
              placeholder="Enter Your Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button 
              className="bg-[#0A66C2] text-white border-none rounded-md py-3 text-base cursor-pointer hover:bg-[#1976D2] transition duration-300"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </div>

          <div className="text-center mt-5 text-gray-600">
            <span>Already have an account?</span>
            <span 
              className="text-[#0A66C2] ml-2 cursor-pointer font-bold"
              onClick={navigateLogin}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
