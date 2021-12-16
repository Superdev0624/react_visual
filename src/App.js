import Login from "./Components/auth/Login"
import Signup from "./Components/auth/Signup"
import Home from "./Components/Home"
import Main from "./Components/pages/Main"
import SuperAdmin from './Components/pages/SuperAdmin'
import Manager from './Components/pages/Manager'

import { Routes, Route } from 'react-router-dom'
import './App.css';
function App() {
  return (
    <div>
      <Routes>
        <Route
          path='/auth/login'
          element={
            <Login />
          }
        />
        <Route
          path='/auth/signup'
          element={
            <Signup />
          }
        />
        <Route
            path='/'
            element={
              <Home />}
          />
        <Route
            path='/pages/main'
            element={
              <Main />}
          />
          <Route
            path='/pages/superadmin'
            element={
              <SuperAdmin />}
          />
          <Route
            path='/pages/manager'
            element={
              <Manager />}
          />
      </Routes>
    </div>
  );
}

export default App;
