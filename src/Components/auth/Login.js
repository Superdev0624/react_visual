import React, { useState } from 'react'
import { Link } from "react-router-dom"
import '../assets/Login.css'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase-config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  let navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then(authUser => {
      navigate('/main')
      sessionStorage.setItem('Auth Token', authUser.user.refreshToken)
    }).catch((error) => {
      if(error.code === 'auth/wrong-password') {
        toast.error('Please check the Password');
      }
      if(error.code === 'auth/user-not-found'){
        toast.error('Please check the Email');
      }
    })
  }
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col app">
    <ToastContainer />
    <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="bg-white px-8 py-4 rounded shadow-md text-black w-full">
        <div className="mb-6 flex justify-center">
          <img
            alt="logo"
            className="object-between w-100 h-8"
            src="../logo.png"
          />
        </div>
        <hr />
        <label
          className="mb-6 block text-3xl font-sans text-gray-600">
          Login to WEPULL
        </label>
        <form onSubmit={handleSubmit}>
          <label
              className="mb-1 block text-lg pl-3 text-gray-600">
              Email:
          </label>
          <input
            type="text"
            className="block border border-grey-light w-full p-1 pl-3 rounded mb-4"
            placeholder="WorkEmail"
            value={email}
            onChange={handleEmail}
          />
          <label
            className="mb-1 block text-lg pl-3 text-gray-600">
            Password:
          </label>
          <input
            type="password"
            className="block border border-grey-light w-full p-1 pl-3 rounded mb-4"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />

          <div className="flex items-center justify-between">
            <div className="flex item-center">
              <Link class="font-medium text-green-500 hover:text-xl" to="/reset">
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
          type="submit"
            className="mt-6 mb-2 flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Log In
          </button>
        </form>
        <div class="text-grey-dark mt-1  flex justify-center">
          Don't have an account?
          <Link class="font-medium text-green-500 hover:text-xl"  to="/auth/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
