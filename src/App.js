import { Routes, Route } from 'react-router-dom'
import Login from "./Components/auth/Login"
import Signup from "./Components/auth/Signup"
import ConfirmEmail from './Components/auth/ConfirmEmail'
import Layout from './Components/Layout'
import AdminDashboard from './Layout/Admin/AdminDashboard'
import AccountantDashboard from './Layout/Account/Accountantdashboard'
import UserDashboard from './Layout/User/UserDashboard'
import Company from './Layout/Admin/Company'
import Department from './Layout/Admin/Department'
import Users from './Layout/Admin/Users'
import Bill from './Layout/Admin/Bill'
import Apps from './Layout/Admin/Application'
import Data from './Layout/Account/Data'
import Profile from './Layout/User/Profile'
import AdminNotification from "./Layout/Admin/AdminNotification"
import CreateUser from './Components/pages/Users/CreateUser'
import EditUser from './Components/pages/Users/EditUser'
import CreateDepartment from './Components/pages/department/CreatDepartment'
import EditDepartment from './Components/pages/department/EditDepartment'
import './App.css';
import Displaydata from './Components/Displaydata'
import Credential from './Components/Credential'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/confirmEmail' element={ <ConfirmEmail /> } />
        <Route path='/displaydata' element={ <Displaydata /> } />
        <Route path='/Credential' element={ <Credential /> } />

        <Route path='/admindashboard' element={ <Layout child={<AdminDashboard />} />} />
        <Route path='/company' element={ <Layout child={<Company />} />} />
        <Route path='/billSub' element={ <Layout child={<Bill />} />} />
        <Route path='/app' element={ <Layout child={<Apps />} />} />
        <Route path='/adminnotification' element={ <Layout child={<AdminNotification />} />} />
        <Route path="/data" element={ <Layout child={<Data />} />} />
        <Route path='/user' element={ <Layout child={<Users />} />} />
        <Route path='/createuser' element={<Layout child={<CreateUser />} /> } />
        <Route path='/edituser/:id' element={<Layout child={<EditUser/>} /> } />
       
        <Route path='/department' element={ <Layout child={<Department />} />} />
        <Route path='/createdepartment' element={<Layout child={<CreateDepartment />} /> } />
        <Route path='/editdepartment/:id' element={<Layout child={<EditDepartment />} /> } />

        <Route path='/accountantdashboard' element={ <Layout child={<AccountantDashboard />} />} />
        
        <Route path='/userdashboard' element={ <Layout child={<UserDashboard />} />} />
        <Route path='/profile' element={ <Layout child={<Profile />} />} />
        
      </Routes>
    </div>
  );
}

export default App;
