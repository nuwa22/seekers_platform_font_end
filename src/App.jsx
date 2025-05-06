import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Landing from './pages/landingpage' 
import RegisterPage from './pages/register'
import Home from './pages/home'
import LoginPage from './pages/login'
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';
import ChekerProfile from './pages/ChekerProfile';
import NotFound from './pages/NotFound';
import Quection from './components/Quection';





function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-form" element={<Quection />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/admin-profile' element={<AdminProfile />} />
          <Route path='/cheker-profile' element={<ChekerProfile />} />
          <Route path="" element={<NotFound />} />
          

      
        </Routes>
    </BrowserRouter>
  )
}

export default App