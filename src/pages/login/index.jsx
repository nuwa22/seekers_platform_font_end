import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPng from "/assets/login.png";
import "./login.css";

function Login() {
    const navigate = useNavigate();
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigateRegister = () => {
        navigate("/register");
    };

    const handleEmailOrUsernameChange = (e) => {
        setEmailOrUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!emailOrUsername || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email: emailOrUsername,
                password
            });

            const { token } = response.data;
            localStorage.setItem("token", token);
            navigate("/form_wall"); // Redirect to dashboard or home page
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.error || "Login failed");
        }
    };

    const handleSocialLogin = (provider) => {
        // Redirect to backend OAuth endpoints
        window.location.href = `http://localhost:5000/api/auth/${provider}`;
    };

    return (
        <div className="login-container">
            <div className="rectangle-1">
                <div className="signin-image">
                    <img src={LoginPng} alt="loginImg" className="loginImg" />
                </div>
                <div className="rectangle-2">
                    <span className="welcome-back">Welcome Back</span>
                    <div className="Google-Facebook-btn">
                        <button 
                            className="Google-btn"
                            onClick={() => handleSocialLogin("google")}
                        >
                            <FaGoogle className="Google-icon" />
                            <span className="Google-text">Google</span>
                        </button>
                        <button 
                            className="Facebook-btn"
                            onClick={() => handleSocialLogin("facebook")}
                        >
                            <FaFacebook className="Facebook-icon" />
                            <span className="Facebook-text">Facebook</span>
                        </button>
                    </div>
                    <div className="or">
                        <span>or</span>
                    </div>
                    <div className="input-fields">
                        <input
                            type="text"
                            className="input"
                            placeholder="Email or Username"
                            value={emailOrUsername}
                            onChange={handleEmailOrUsernameChange}
                        />
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button className="login-btn" onClick={handleLogin}>Sign In</button>
                    </div>
                    <div className="register-link">
                        <span>Don't have an account?</span>
                        <span className="register-text" onClick={navigateRegister}>Register</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;