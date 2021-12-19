import React, { useState } from 'react'
import { Link } from "react-router-dom"
import '../assets/Login.css'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase-config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailborder, setEmailBorder] = useState(false);
  const [passborder, setPassBorder] = useState(false);
  let navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setEmailBorder(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    setPassBorder(false);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if ( email === '' || password === '') {
      setEmailBorder(true);
      setPassBorder(true);
      toast.error('Cannot be empty', {position: toast.POSITION.TOP_CENTER, autoClose:3000});
    } 
    auth.signInWithEmailAndPassword(email, password)
    .then(authUser => {
      db.collection("users")
        .doc(authUser.user.uid)
        .get()
        .then(doc => {
          const Admin = doc.data().id;
          if ( Admin === 0 ) {
            navigate('/admin')
            sessionStorage.setItem('Auth Token', authUser.user.refreshToken)
            sessionStorage.setItem('UserName', doc.data())
            console.log(doc.data());
          } if ( Admin === 1 ) {
            navigate('/manager')
            sessionStorage.setItem('Auth Token', authUser.user.refreshToken)
            sessionStorage.setItem('UserName', doc.data().firstname)
          } else {
            navigate('/user')
            sessionStorage.setItem('Auth Token', authUser.user.refreshToken)
            sessionStorage.setItem('Info', doc.data().useremail);
          }
        })
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
            className={"block w-full p-1 pl-3 rounded " + (emailborder ? "border-2 bordercolor" : "border border-gray-light")} 
            placeholder="Work Email"
            value={email}
            onChange={handleEmail}
          />
          <p className={"inputcolor text-xm italic mb-1 mt-1 ml-1 " + (emailborder ? "visible" : "invisible")}>please choose email</p>
          <label
            className="mb-1 block text-lg pl-3 text-gray-600">
            Password:
          </label>
          <input
            type="password"
            className={"block w-full p-1 pl-3 rounded " + (passborder ? "border-2 bordercolor" : "border border-gray-light")} 
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <p className={"inputcolor text-xm italic mb-1 mt-1 ml-1 " + (passborder ? "visible" : "invisible")}>please choose password</p>
          <div className="flex items-center justify-between">
            <div className="flex item-center">
              <Link className="font-medium text-green-500 hover:text-xl" to="/confirmEmail">
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
        <div className="text-grey-dark mt-1  flex justify-center">
          Don't have an account? &nbsp;&nbsp;
          <Link className="font-medium text-green-500 hover:text-xl"  to="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
