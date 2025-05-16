import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Landing from './pages/landingpage' 
import RegisterPage from './pages/register'
import Home from './pages/home'
import LoginPage from './pages/login'
import UserProfile from './pages/UserProfile';
import ChekerProfile from './pages/ChekerProfile';
import NotFound from './pages/NotFound';
import CreateForm from './pages/Forms/createForm';
import IoDocument from './pages/IoDocument';
import PreviewForm from './pages/Forms/PriviewForm';
import AdminProfile from './pages/AdminProfile';
import FormDetails from './pages/Forms/FormView';
import MyForms from './pages/Forms/MyForms';
import GetMyAllForms from './pages/Forms/GetMyAllForms';
import MyFormView from './pages/Forms/MyFormView';
import FormResponse from './pages/Forms/FormResponse';






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
          <Route path='/cheker-profile/*' element={<ChekerProfile />} />
          <Route path='/io-document/*' element= {<IoDocument />} />
          <Route path='/my-forms/*' element= {<MyForms />} />
          <Route path="/*" element={<NotFound />} />
          <Route path='/preview' element={<PreviewForm />} />
          <Route path='admin-profile' element={<AdminProfile />} />
          <Route path="/form/:id" element={<FormDetails />} />
          <Route path="/get-my-forms" element={<GetMyAllForms />} />
          <Route path='/my-forms/:id' element={<MyFormView />} />
          <Route path='/form-response/:id' element={<FormResponse />} />
          

      
        </Routes>
    </BrowserRouter>
  )
}

export default App