import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoginPng from "/assets/login.png";

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleLogin = () => {
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (password.length < 1) {
            toast.error("Please enter a valid password");
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
            email,
            password
        }).then((response) => {
            toast.success("Login successful!");
            localStorage.setItem("token", response.data.token);
            const user = response.data.user;
            navigate('/home');
        }).catch((error) => {
            toast.error(error.response?.data?.message || "Login failed.");
        });
    };

    const handleSocialLogin = (provider) => {
        toast("😓 Social login with " + provider + " is not implemented yet.");
    };

    const navigateRegister = () => {
        navigate("/register");
    };

    return (
        <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-300 p-5 font-[poppins]">
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden">
                {/* Left Side Image */}
                <div className="md:flex-1 hidden md:flex items-center justify-center bg-blue-700 p-10">
                    <img src={LoginPng} alt="Login" className="max-w-full h-auto" />
                </div>

                {/* Right Side Form */}
                <div className="flex-1 p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Welcome Back</h2>

                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                        <button
                            onClick={() => handleSocialLogin("google")}
                            className="flex items-center justify-center border-2 border-blue-700 text-blue-700 rounded-full px-4 py-2 w-full md:w-1/2 hover:bg-gray-100 transition"
                        >
                            <FaGoogle className="mr-2" />
                            Google
                        </button>
                        <button
                            onClick={() => handleSocialLogin("facebook")}
                            className="flex items-center justify-center border-2 border-blue-700 text-blue-700 rounded-full px-4 py-2 w-full md:w-1/2 hover:bg-gray-100 transition"
                        >
                            <FaFacebook className="mr-2" />
                            Facebook
                        </button>
                    </div>

                    <div className="text-center text-gray-600 relative mb-6">
                        <span className="px-3 bg-white z-10 relative">or</span>
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 -z-10"></div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Email"
                            className="border-b-2 border-blue-700 focus:outline-none py-2 text-blue-700 placeholder-gray-500"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="border-b-2 border-blue-700 focus:outline-none py-2 text-blue-700 placeholder-gray-500 w-full pr-10"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-700"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ?  <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        <button
                            onClick={handleLogin}
                            className="bg-blue-700 text-white py-3 rounded-md font-medium hover:bg-blue-800 transition"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="text-center mt-6 text-gray-600">
                        <span>Don't have an account? </span>
                        <span
                            onClick={navigateRegister}
                            className="text-blue-700 font-bold cursor-pointer"
                        >
                            Register
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
