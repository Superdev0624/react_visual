import Login from "./Components/auth/Login"
import Signup from "./Components/auth/Signup"
import ConfirmEmail from './Components/auth/ConfirmEmail'
import Layout from './Components/Layout'
import AdminDashboard from './Layout/AdminDashboard'
import Company from './Layout/Company'
import Department from './Layout/Department'
import User from './Layout/Users'
import Bill_Sub from './Layout/Bill_Sub'
import Apps from './Layout/Application'
import Profile_Data from './Layout/Profile'
import Edit from './Layout/Edit'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import userDashboard from "./Layout/UserDashboard"
function App() {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/' element={ <Login /> } />
        <Route path='/confirmEmail' element={ <ConfirmEmail /> } />
        <Route path='/admindashboard' element={ <Layout child={AdminDashboard} />} />
        <Route path='/company' element={ <Layout child={Company} />} />
        <Route path='/department' element={ <Layout child={Department} />} />
        <Route path='/user' element={ <Layout child={User} />} />
        <Route path='/billSub' element={ <Layout child={Bill_Sub} />} />
        <Route path='/app' element={ <Layout child={Apps} />} />
        <Route path='/userdashboard' element={ <Layout child={userDashboard} />} />
        <Route path='/profile' element={ <Layout child={Profile_Data} />} />
        <Route path='/edit' element={ <Layout child={Edit} />} />
      </Routes>
    </div>
  );
}

export default App;
