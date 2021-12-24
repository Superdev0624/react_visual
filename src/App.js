import Login from "./Components/auth/Login"
import Signup from "./Components/auth/Signup"
import ConfirmEmail from './Components/auth/ConfirmEmail'
import Layout from './Components/Layout'
import AdminDashboard from './Layout/Admin/AdminDashboard'
import Accountantdashboard from './Layout/Account/Accountantdashboard'
import Company from './Layout/Admin/Company'
import Department from './Layout/Admin/Department'
import Users from './Layout/Admin/Users'
import Bill from './Layout/Admin/Bill'
import Apps from './Layout/Admin/Application'
import Profile from './Layout/User/Profile'
import Edit from './Layout/User/Edit'
import { Routes, Route } from 'react-router-dom'
import AdminNotification from "./Layout/Admin/AdminNotification"
import CreateUser from './Components/pages/CreateUser'
import EditUser from './Components/pages/EditUser'
import './App.css';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/confirmEmail' element={ <ConfirmEmail /> } />

        <Route path='/admindashboard' element={ <Layout child={<AdminDashboard />} />} />
        <Route path='/company' element={ <Layout child={<Company />} />} />
        <Route path='/department' element={ <Layout child={<Department />} />} />
        <Route path='/billSub' element={ <Layout child={<Bill />} />} />
        <Route path='/app' element={ <Layout child={<Apps />} />} />
        <Route path='/adminnotification' element={ <Layout child={<AdminNotification />} />} />
        <Route path='/user' element={ <Layout child={<Users />} />} />
        <Route path='/createuser' element={<Layout child={<CreateUser />} /> } />
        <Route path='/edituser/:id' element={<Layout child={<EditUser/>} /> } />

        <Route path='/accountantdashboard' element={ <Layout child={<Accountantdashboard />} />} />
        
        <Route path='/userdashboard' element={ <Layout child={<userDashboard />} />} />
        <Route path='/profile' element={ <Layout child={<Profile />} />} />
        <Route path='/edit' element={ <Layout child={<Edit />} />} />
        
      </Routes>
    </div>
  );
}

export default App;
