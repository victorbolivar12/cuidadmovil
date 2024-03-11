import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./pages/Authentication/Login"
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Register } from './pages/Authentication/Register'
  

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
