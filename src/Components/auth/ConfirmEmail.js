import React, { useState } from 'react'
import { Link } from "react-router-dom"
import '../assets/Login.css'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase-config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Reset () {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailborder, setEmailBorder] = useState(false);
  let navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setEmailBorder(false);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if ( email === '') {
      setEmailBorder(true);
      toast.error('Cannot be empty', {position: toast.POSITION.TOP_CENTER, autoClose:3000});
    } 
    db.collection("users").where("useremail", "==", email )
    .get()
    .then(doc => {
      if( doc.docs.length ==0 ) {
        toast.error(`Email doesn't exist`);
      }
    })
 
    auth.sendPasswordResetEmail(email)
    .then(() =>{
      toast.info("Password reset email sent!")
    }).catch(error =>{
      console.log(error)
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
          className="mb-1 block text-2xl font-sans text-center text-black">
          Confirm Email
        </label>
        <form onSubmit={handleSubmit}>
          <label
              className="mb-6 block text-xm text-center pl-3 text-gray-600">
              Enter your email and we'll confirm your email in Database.
          </label>
          <input
            type="text"
            className={"block w-full p-1 pl-3 rounded " + (emailborder ? "border-2 bordercolor" : "border border-gray-light")} 
            placeholder="Email address"
            value={email}
            onChange={handleEmail}
          />
          <p className={"inputcolor text-xm text-center italic mb-1 mt-1 ml-1 " + (emailborder ? "visible" : "invisible")}>please choose email</p>
          <button
          type="submit"
            className="mb-2 flex justify-center py-2 px-4 text-md w-full font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800"
          >
            Reset your password
          </button>
        </form>
        <div className="text-grey-dark mt-1  flex justify-center">
          Don't have an account? &nbsp;&nbsp;
          <Link className="font-medium text-blue-900 hover:text-xl"  to="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
