import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landingpage' // Import the Landing component
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          
          <Route path ="/dashboard" element={<Home />}/>
          
          
        </Routes>
      </div>
    </Router>
  )
}

export default App