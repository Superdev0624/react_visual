import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase-config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/Login.css'

export default function Signup () {
  const [fname, setFirst] = useState('');
  const [lname, setSecond] = useState('');
  const [email, setEmail] = useState('');
  const [companyname, setCompany] = useState('');
  const [companynum, setCompanynum] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [check, setCheck] = useState(false);
  let navigate = useNavigate();
  const handlefirstName = (e) => {
    setFirst(e.target.value);
    setSubmitted(false);
  };
  const handlelastName = (e) => {
    setSecond(e.target.value);
    setSubmitted(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  const handlecompanyName = (e) => {
    setCompany(e.target.value);
    setSubmitted(false);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  const hadlecompanyNum = (e) => {
    setCompanynum(e.target.value)
    setSubmitted(false);
  };
  const handleCheck = (e) => {
    e.preventDefault();
    if(check === true ){
      setCheck(false)
    } else
    setCheck(true)
   }
  async function handleSubmit(e) {
    e.preventDefault();
    if( check ) {
      if(fname === '' || lname === '' || companyname === '' || companynum === ''|| phone === '') {
        toast.error('All field required!')
        return
      }
      auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        db.collection("users")
        .doc(authUser.user.uid)
        .set({
          firstname: fname,
          lastname: lname,
          companyname: companyname,
          companynum: companynum,
          phone: phone
        })
        .then(() => {
          navigate('/pages/main')
          sessionStorage.setItem('Auth Token', authUser.user.refreshToken)
        })
      })
      .catch((error) => {
        console.log("Email", error);
        if(error.code === 'auth/email-already-in-use') {
          toast.error('email already exist');
        }
        if(error.code === 'auth/weak-password'){
          toast.warning('Strong Password!');
        }
        if(error.code === 'auth/invalid-email'){
          console.log("Invalid Email");
          toast.warning('Invalid Email');
        }
      })
    } else 
     toast.info('Agree Terms & Services');
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
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <div className="w-1/2 mr-1">
                <input
                  className="appearance-none border rounded w-full py-1 px-2 pl-2 text-grey-darker"
                  id="first_name"
                  type="text"
                  placeholder="first name"
                  value={fname}
                  onChange={handlefirstName}
                />
              </div>
              <div className="w-1/2 ml-1">
                <input
                  className="appearance-none border rounded w-full py-1 px-2 pl-2 text-grey-darker"
                  id="last_name"
                  type="text"
                  placeholder="last name"
                  value={lname}
                  onChange={handlelastName}
                />

              </div>
            </div>

            <input
              type="email"
              className="block border border-grey-light w-full p-1 pl-2 rounded mb-4"
              name="Workemail"
              placeholder="workemail"
              value={email}
              onChange={handleEmail}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-1 pl-2 rounded mb-4"
              name="Company Name"
              placeholder="Company Name"
              value={companyname}
              onChange={handlecompanyName}
            />
            <select 
              className="block border border-grey-light w-full p-1 pl-2 rounded mb-4 text-gray-400"
              value={companynum}
              onChange={hadlecompanyNum}
            >
              <option value="1-3">1-3</option>
              <option value="4-10">4-10</option>
              <option value="11-20">11-20</option>
              <option value="20+">20 +</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>

            <input
              type="text"
              className="block border border-grey-light w-full p-1 pl-2 rounded mb-4"
              name="phone"
              placeholder="Phone number"
              value={phone}
              onChange={handlePhone}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-1 pl-2 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  value={check}
                  onChange={handleCheck}
                />
                <label
                  className="ml-2 block text-sm text-gray-900">
                  I agree to the
                  <a
                    className="font-medium text-green-500 hover:text-sm"
                    href="../">
                    &nbsp;Terms of Service&nbsp;
                  </a>
                  and
                  <a
                    className="font-medium text-green-500 hover:text-lg"
                    href="../">
                    &nbsp;Privacy policy&nbsp;
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 mb-2 w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Get Started
            </button>
          </form>
          <div className="text-grey-dark mt-1  flex justify-center">
            Already have an account?
            <Link className="font-medium text-green-500 hover:text-xl" to="/">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

