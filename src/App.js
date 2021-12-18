import Login from "./Components/auth/Login"
import Signup from "./Components/auth/Signup"
import User from "./Components/pages/User"
import SuperAdmin from './Components/pages/SuperAdmin'
import Manager from './Components/pages/Manager'
import ConfirmEmail from './Components/auth/ConfirmEmail'
import Profile from './Components/pages/Profile'
import EditAccount from './Components/pages/EditAccount'
import { Routes, Route } from 'react-router-dom'
import './App.css';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/' element={ <Login /> } />
        <Route path='/user' element={ <User /> } />
        <Route path='/admin' element={ <SuperAdmin /> } />
        <Route path='/manager' element={ <Manager /> } />
        <Route path='/confirmEmail' element={ <ConfirmEmail /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/editaccount' element={ <EditAccount/>} />
      </Routes>
    </div>
  );
}

export default App;
