import Login from "./Components/auth/Login"
import Signup from "./Components/auth/Signup"
import Home from "./Components/Home"
import Main from "./Components/Main"
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
            path='/main'
            element={
              <Main />}
          />
      </Routes>
    </div>
  );
}

export default App;
