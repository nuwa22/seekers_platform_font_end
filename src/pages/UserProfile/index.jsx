import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { FaGem, FaPencilAlt } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop";
import { User } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token")


  
  
  

  useEffect(
    () => {
      
        axios.get(import.meta.env.VITE_BACKEND_URL +"/api/users/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then(
          (response) => {
            console.log(response.data);
            setUser(response.data.user);
            
          }
        )
      }
    , {}
  )
 
  function handleUpdatePassword() {
    if (newPassword !== confirmPassword){
      toast.error("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }
    if (currentPassword.length < 1) {
      toast.error("Please enter your current password.");
      return;
    }
    if (newPassword.length < 1) {
      toast.error("Please enter a new password.");
      return;
    }
    if (confirmPassword.length < 1) {
      toast.error("Please confirm your new password.");
      return;
    }
    axios.put(import.meta.env.VITE_BACKEND_URL +"/api/users/change-password",{
      currentPassword: currentPassword,
      newPassword: newPassword,
    } ,{
      headers: {
        "Authorization": `Bearer ${token}`
      }
      
    }).then(
      (response) => {
        console.log(response.data);
        toast.success("Password updated successfully.");
      }
    ).catch((error) => {
      console.log("Error updating password", error.response.data);
      toast.error("Error updating password.");
    });
  };

  function handleDeleteAccount() {
    if (password.length < 1) {
      toast.error("Please enter your password.");
      return;
    }
  
    axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/users/delete", {
      headers: {
        "Authorization": `Bearer ${token}`,
        
      },
      data: {
        password: password
      }
    })
    .then((response) => {
      console.log(response.data);
      toast.success("Account deleted successfully.");
      localStorage.removeItem("token");
      navigate("/");
    })
    .catch((error) => {
      console.error("Error deleting account:", error.response?.data || error.message);
      toast.error("Error deleting account.");
    });
  }
  







  

  
 



  return (
    <div className="bg-[#F4F7FC] min-h-screen  pt-20 ">
      <Navbar />
    <div className="max-w-7xl mx-auto p-6 bg-white border border-gray-100 rounded-[10px] min-h-screen text-sm mt-[10px] mb-[10px]">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={ "assets/profile.png"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover"
          />
          <div>
            <h1 className="text-[30px] font-bold flex items-center gap-3">{user.name}
             <FaPencilAlt className="text-[15px] text-gray-500 cursor-pointer " />
            </h1>
            
            <p className="flex items-center gap-1 text-[15px] text-gray-500 gap-3">{user.email}
               <FaPencilAlt className="text-[15px] text-gray-500 cursor-pointer " />
            </p>
            <p className="flex items-center gap-1 text-gray-500 text-[15px] gap-2">{user.role}
              <User className="text-sm text-gray-500 " />
            </p>
          </div>
        </div>
        <div className="text-center border border-[#0A66C2] border-[3px]  rounded-md px-4 py-2 h-[170px] w-[150px] flex flex-col justify-center items-center">
          <FaGem className="text-[#0A66C2] text-[60px] mx-auto mb-3" />
          <div className=" bg-[#0A66C2] h-[70px] w-[120px]  rounded-[8px] flex flex-col justify-center items-center ">
            <p className="text-white font-bold text-[20px] mt-6">My Point</p>
            <p className="text-[30px] font-bold rounded-md  flex justify-center items-center text-white mb-4">{user.point}</p>
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div className="border-t border-t-[3px] border-[#0A66C2]  pt-6 mb-6">
        <h2 className="font-semibold mb-4">Professional Details</h2>
        <div className="mb-4">
          <label className="block mb-1">Current Position</label>
          <div className="relative">
            <input
              type="text"
              value=""
              className="w-full border border-blue-400 rounded-md p-2 pr-10"
            />
            <FaPencilAlt className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div>
          <label className="block mb-1">Your Industry</label>
          <div className="relative">
            <input
              type="text"
              
              className="w-full border border-blue-400 rounded-md p-2 pr-10"
            />
            <FaPencilAlt className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="border-t border-t-[3px] border-[#0A66C2] pt-6 mb-6">
        <h2 className="font-semibold mb-4">Change Password</h2>
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
            8 characters or longer. Combine upper and lowercase letters and numbers.
          </p>
          <div className="flex justify-end">
            <button 
              onClick={handleUpdatePassword}
            className="bg-blue-600 text-white px-4 py-2 rounded-md ">Save Changes</button>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="border-t border-t-[3px] border-[#0A66C2] pt-6">
        <h2 className="font-semibold mb-2">Delete Account</h2>
        <p className="font-medium text-sm mb-1">What happens when you deactivate your account? <span className="text-gray-400 cursor-pointer">&#9432;</span></p>
        <ul className="text-sm text-gray-600 list-disc pl-5 mb-4">
          <li>Your profile, Forms and IO Papers won't be shown on Seekers anymore.</li>
          <li>Active forms and IO papers will be cancelled.</li>
          <li>You won’t be able to re-activate your forms and IO papers.</li>
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
          className="bg-blue-600 text-white px-4 py-2 rounded-md" >
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