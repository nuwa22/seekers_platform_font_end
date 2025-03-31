import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignupPng from "/assets/signup.png";
import "./register.css";

function Register() {
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate("/login");
    };

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = () => {
        if (userName === "") {
            alert("Please enter your userName");
            return;
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
        if (password === "") {
            alert("Please enter your password");
            return;
        }

        axios.post("http://localhost:5000/api/users/register", {
            userName,
            email,
            password
        }).then((res) => {
            // Assuming the response contains the JWT token
            const { token } = res.data;
            localStorage.setItem("token", token); // Store the token
            navigateLogin();
        }).catch((err) => {
            console.error(err);
            alert("Error during registration");
        });
    };

    const handleSocialRegister = (provider) => {
        // Redirect to backend OAuth endpoints
        window.location.href = `http://localhost:5000/api/auth/${provider}`;
    };

    return (
        <div className="register-container">
            <div className="rectangle-1">
                <div className="signin-image">
                    <img src={SignupPng} alt="signupImg" className="signupImg" />
                </div>
                <div className="rectangle-2">
                    <span className="create-account">Create Account</span>
                    <div className="Google-Facebook-btn">
                        <button 
                            className="Google-btn"
                            onClick={() => handleSocialRegister("google")}
                        >
                            <FaGoogle className="Google-icon" />
                            <span className="Google-text">Google</span>
                        </button>
                        <button 
                            className="Facebook-btn"
                            onClick={() => handleSocialRegister("facebook")}
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
                            placeholder="Username"
                            value={userName}
                            onChange={handleUserNameChange}
                        />
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button className="register-btn" onClick={handleRegister}>Sign Up</button>
                    </div>
                    <div className="login">
                        <span>Already have an account?</span>
                        <span className="login-text" onClick={navigateLogin}>Login</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
