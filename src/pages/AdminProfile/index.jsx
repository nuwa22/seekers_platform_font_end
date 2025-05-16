import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGem, FaPencilAlt, FaSave } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop";
import { User } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { createClient } from '@supabase/supabase-js';

export default function ProfilePage() {
    const [user, setUser] = useState({});
  const [editField, setEditField] = useState(null);
  const [editedValues, setEditedValues] = useState({
    name: user.name,
    currentPossition: user.currentPossition,
    industry: user.industry,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("token");
  const supabase = createClient(
  "https://vojolyfgpatvtplddwpq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvam9seWZncGF0dnRwbGRkd3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNjg5MDIsImV4cCI6MjA2MTc0NDkwMn0.ZjD4NDDd2DSLDd810jSOYAfQqeBikcJsNt-HELa-ts0"
  );

  function validatePassword(newPassword) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(newPassword);
  }

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setPreview(response.data.user.profilePicture);
        setEditedValues({
          name: response.data.user.name,
          currentPossition: response.data.user.currentPossition,
          industry: response.data.user.industry,
        });
        console.log(response.data.user);
      });
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/profile",
        editedValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setUser(prevUser => ({
        ...prevUser,
        ...editedValues
      }));
      
      toast.success("Profile updated successfully");
      setEditField(null);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    setEditedValues((prev) => ({
      ...prev,
      [editField]: e.target.value,
    }));
  };

  function handleUpdatePassword() {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    if (!validatePassword(newPassword))
      return toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
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

  const handleUploadPhoto = async () => {
  if (!profileImage) {
    toast.error("Please select an image first");
    return;
  }

  try {
    setUploading(true);

    const fileExt = profileImage.name.split('.').pop();
    const fileName = `${user.id || 'user'}_${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('formprofile')
      .upload(fileName, profileImage, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      toast.error("Failed to upload image to Supabase");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("formprofile")
      .getPublicUrl(fileName);

    const publicURL = urlData.publicUrl;
    console.log("Image URL:", publicURL);
    setImage(publicURL);
    console.log("Profile image uploaded successfully");

    await axios.put(
      import.meta.env.VITE_BACKEND_URL + "/api/users/profile",
      { profilePicture: publicURL },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser((prev) => ({ ...prev, profilePicture: publicURL }));
    setPreview(publicURL);
    setProfileImage(null);
    toast.success("Profile picture updated!");
  } catch (error) {
    console.error("Upload failed:", error);
    toast.error(error.message || "Failed to upload image");
  } finally {
    setUploading(false);
  }
};


const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  }
};

  return (
    <div className="bg-[#F4F7FC] min-h-screen pt-20 font-[poppins]">
      <Navbar />
      
        <h1 className="text-black text-xl md:text-2xl font-bold mb-6  font-[poppins] px-4 md:px-10 mt-6" >Admin Profile</h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 bg-white border border-gray-100 rounded-[10px]
      min-h-screen text-sm mt-2 mb-10">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full ">
              <div className="relative">
              <img
                src={preview}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-3 border-blue-500
                shadow-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute bottom-0 right-0 w-full h-full opacity-0 cursor-pointer"
                title="Change photo"
              />
              {profileImage && (
                <button
                  onClick={handleUploadPhoto}
                  disabled={uploading}
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
                >
                  <FaSave className="text-blue-800 cursor-pointer" size={18} />
                </button>
              )}
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-[24px] sm:text-[30px] font-bold flex items-center justify-center
              sm:justify-start gap-2">
        {editField === "name" ? (
          <>
            <input
              type="text"
              value={editedValues.name}
              onChange={handleChange}
              className="border-b border-[#0A66C2] focus:outline-none px-1"
            />
            <FaSave
              className="text-[15px] text-[#0A66C2] cursor-pointer"
              onClick={handleSave}
            />
          </>
        ) : (
          <>
            {user.name}
            <FaPencilAlt
              className="text-[15px] text-gray-500 cursor-pointer"
              onClick={() => setEditField("name")}
            />
          </>
        )}
      </h1>
              <p className="text-gray-500 text-[15px]">{user.email}</p>
              <p className="text-gray-500 text-[15px] flex items-center gap-1">
                <User className="text-sm text-gray-500" />
                {user.role}
                
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


        <div className="border-t-4 border-[#0A66C2] pt-6 mb-6">
          <h2 className="font-bold text-[20px] mb-4">Professional Details</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Current Position</label>
            <div className="relative">
        {editField === "currentPossition" ? (
          <>
            <input
              type="text"
              value={editedValues.currentPossition}
              onChange={handleChange}
              className="w-full h-10 border-b border-[#0A66C2]  p-2 pr-10"
            />
            <FaSave
              className="absolute right-3 top-3 text-[#0A66C2] focus:outline-none cursor-pointer"
              onClick={handleSave}
            />
          </>
        ) : (
          <>
            <p className="w-full h-10 border-b border-[#0A66C2]  p-2 pr-10 cursor-not-allowed">
              {user.currentPossition}
            </p>
            <FaPencilAlt
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setEditField("currentPossition")}
            />
          </>
        )}
      </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Your Industry</label>
             <div className="relative">
        {editField === "industry" ? (
          <>
            <input
              type="text"
              value={editedValues.industry}
              onChange={handleChange}
              className="w-full h-10 border-b border-[#0A66C2] focus:outline-none  p-2 pr-10"
            />
            <FaSave
              className="absolute right-3 top-3 text-[#0A66C2] cursor-pointer"
              onClick={handleSave}
            />
          </>
        ) : (
          <>
            <p className="w-full h-10 border-b border-[#0A66C2]   p-2 pr-10 cursor-not-allowed">
              {user.industry}
            </p>
            <FaPencilAlt
              className="absolute right-3 top-3 text-[#0A66C2] cursor-pointer"
              onClick={() => setEditField("industry")}
            />
          </>
        )}
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
              className="w-full border-b border-[#0A66C2] focus:outline-none  p-2"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full border-b border-[#0A66C2] focus:outline-none  p-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b border-[#0A66C2] focus:outline-none p-2"
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
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
}