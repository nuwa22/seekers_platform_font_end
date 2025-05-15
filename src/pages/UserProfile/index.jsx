import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGem, FaPencilAlt } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop";
import { User } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { createClient } from '@supabase/supabase-js';

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [email, setEmail] = useState(null);
  const [currentPosition, setCurrentPosition] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
      });
  }, []);

  

  function handleUpdatePassword() {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/change-password",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Error updating password."
        );
      });
  }

  function handleDeleteAccount() {
    if (password.length < 1) {
      toast.error("Please enter your password.");
      return;
    }

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/users/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { password },
      })
      .then((response) => {
        toast.success("Account deleted successfully.");
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error deleting account.");
      });
  }

  return (
    <div className="bg-[#F4F7FC] min-h-screen pt-20 font-[poppins]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 bg-white border border-gray-100 rounded-[10px] min-h-screen text-sm mt-2 mb-10">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full ">
              <img
                src=''
                alt="Preview"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-3 border-blue-500  shadow-lg"
              />
            
            <div className="text-center sm:text-left">
              <h1 className="text-[24px] sm:text-[30px] font-bold flex items-center justify-center sm:justify-start gap-2">
                {user.name}
                <FaPencilAlt className="text-[15px] text-gray-500 cursor-pointer" />
              </h1>
              <p className="text-gray-500 text-[15px]">{user.email}</p>
              <p className="text-gray-500 text-[15px] flex items-center gap-1">
                {user.role}
                <User className="text-sm text-gray-500" />
              </p>
            </div>
          </div>

          <div className="border-2 border-[#0A66C2] rounded-md px-4 py-4 h-[170px] w-full sm:w-[150px] flex flex-col justify-center items-center">
            <FaGem className="text-[#0A66C2] text-[50px] mb-3" />
            <div className="bg-[#0A66C2] h-[70px] w-[120px] rounded-[8px] flex flex-col justify-center items-center">
              <p className="text-white font-bold text-[16px] mt-3">My Point</p>
              <p className="text-[26px] font-bold text-white mb-2">
                {user.point}
              </p>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="border-t-4 border-[#0A66C2] pt-6 mb-6">
          <h2 className="font-bold text-[20px] mb-4">Professional Details</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Current Position</label>
            <div className="relative">
              <p className="w-full h-10 border border-[#0A66C2] rounded-md p-2 pr-10 cursor-not-allowed">
                {user.currentPossition}
              </p>
              <FaPencilAlt className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Your Industry</label>
            <div className="relative">
              <p className="w-full h-10 border border-[#0A66C2] rounded-md p-2 pr-10 cursor-not-allowed">
                {user.industry}
              </p>
              <FaPencilAlt className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="border-t-4 border-[#0A66C2] pt-6 mb-6">
          <h2 className="font-bold text-[20px] mb-4">Change Password</h2>
          <div className="space-y-4">
            <input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              placeholder="Current Password"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <p className="text-xs text-gray-500">
              8 characters or longer. Combine upper and lowercase letters and
              numbers.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleUpdatePassword}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="border-t-4 border-[#0A66C2] pt-6">
          <h2 className="font-bold text-[20px] mb-2">Delete Account</h2>
          <p className="font-medium text-sm mb-1">
            What happens when you deactivate your account?{" "}
            <span className="text-gray-400 cursor-pointer">&#9432;</span>
          </p>
          <ul className="text-sm text-gray-600 list-disc pl-5 mb-4">
            <li>Your profile, Forms and IO Papers won't be shown anymore.</li>
            <li>Active forms and IO papers will be cancelled.</li>
            <li>
              You won’t be able to re-activate your forms and IO papers.
            </li>
          </ul>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={handleDeleteAccount}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
