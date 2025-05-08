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
import CreateForm from './pages/Forms/createForm';
import IoDocument from './pages/IoDocument';
import MyResearches from './pages/MyResearches';






function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Landing />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/create-form/*" element={<CreateForm />} />
          <Route path='/user-profile/*' element={<UserProfile />} />
          <Route path='/admin-profile/*' element={<AdminProfile />} />
          <Route path='/cheker-profile/*' element={<ChekerProfile />} />
          <Route path='/io-document/*' element= {<IoDocument />} />
          <Route path='/my-researches/*' element= {<MyResearches />} />
          <Route path="/*" element={<NotFound />} />
          

      
        </Routes>
    </BrowserRouter>
  )
}

export default App