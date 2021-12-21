import Login from "./Components/auth/Login"
import Signup from "./Components/auth/Signup"
import ConfirmEmail from './Components/auth/ConfirmEmail'
import Profile from './Components/pages/Profile'
import Layout from './Components/Layout'
import Sidebar from './Components/pages/Sidebar'
import { Routes, Route } from 'react-router-dom'
import './App.css';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/' element={ <Login /> } />
        <Route path='/confirmEmail' element={ <ConfirmEmail /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/layout' element={ <Layout /> } />
        <Route path='/sidebar' element={ <Sidebar />} />
      </Routes>
    </div>
  );
}

export default App;
