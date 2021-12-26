import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase-config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/Login.css'

export default function Signup() {
  const [fname, setFirst] = useState('');
  const [lname, setSecond] = useState('');
  const [email, setEmail] = useState('');
  const [companyname, setCompany] = useState('');
  const [companynum, setCompanynum] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [fnamevalid, setFnameValid] = useState(false);
  const [lnamevalid, setLnameValid] = useState(false);
  const [emailvalid, setEmailValid] = useState(false);
  const [passvalid, setPassValid] = useState(false);
  const [companynamevalid, setCompanynameValid] = useState(false);
  const [companynumvalid, setCompanyNumValid] = useState(false);
  const [phonevalid, setPhoneValid] = useState(false);
  const [checkvalid, setCheckValid] = useState(false);
  let navigate = useNavigate();
  const handlefirstName = (e) => {
    setFirst(e.target.value);
    setFnameValid(false);
  };
  const handlelastName = (e) => {
    setSecond(e.target.value);
    setLnameValid(false);
  };
  const handleEmail = (e) => {
    const correctval = e.target.value
    setEmail(correctval);
    setEmailValid(false);
  };
  const handlecompanyName = (e) => {
    setCompany(e.target.value);
    setCompanynameValid(false);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setPhoneValid(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassValid(false);
  };
  const hadlecompanyNum = (e) => {
    setCompanynum(e.target.value)
    setCompanyNumValid(false);
  };
  const handleCheck = (e) => {
    e.preventDefault();
    if (check === true) {
      setCheck(false)
      setCheckValid(false)
    } else
      setCheck(true)
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (fname === '') {
      setFnameValid(true);
      toast.error("firstname required")
    }
    if (lname === '') {
      setLnameValid(true);
      toast.error("Lastname required")
    } 
    if (companyname === '') {
      setCompanynameValid(true);
      toast.error("Companyname required")
    }
    if (companynum === '') {
      setCompanyNumValid(true);
      toast.error("Number of company required")
    }
    if (phone === '') {
      setPhoneValid(true);
      toast.error("Phone number required")
    }
    if (check === '') {
      setCheckValid(true);
      toast.error("Please agree terms and services")
    }
    if(email === '') {
      setEmailValid(true);
      toast.error("Email required")
    }
    if(password === ''){
      setPassValid(true);
      toast.error("Password required")
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        db.collection("users").where("companyname", "==", companyname)
          .get()
          .then(doc => {
            if (doc.docs.length === 0) {
              db.collection("users")
                .doc(authUser.user.uid)
                .set({
                  useremail: email,
                  password: password,
                  firstname: fname,
                  lastname: lname,
                  companyname: companyname,
                  companynum: companynum,
                  department: "",
                  phone: phone,
                  Role: "Admin"
                })
            } else if (doc.docs.length === 1) {
              db.collection("users")
                .doc(authUser.user.uid)
                .set({
                  useremail: email,
                  password: password,
                  firstname: fname,
                  lastname: lname,
                  companyname: companyname,
                  companynum: companynum,
                  department: "",
                  phone: phone,
                  Role: "Accountant"
                })
            } else if (doc.docs.length > 1) {
              db.collection("users")
                .doc(authUser.user.uid)
                .set({
                  useremail: email,
                  password: password,
                  firstname: fname,
                  lastname: lname,
                  companyname: companyname,
                  companynum: companynum,
                  department: "",
                  phone: phone,
                  Role: "User"
                })
            }
          })
          .then(() => {
            navigate('/')
            sessionStorage.setItem('Auth Token', authUser.user.refreshToken)
          })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('email already exist');
        }
        if (error.code === 'auth/weak-password') {
          toast.warning('Strong Password!');
        }
      })
  }
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col app">
      <ToastContainer />
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className=" bg-gray-50 px-8 py-4 rounded shadow-md text-black w-full">
          <div className="mb-6 flex justify-center">
            <img
              alt="logo"
              className="object-between w-100 h-8"
              src="../logo.png"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex mb-2">
              <div className="w-1/2 mr-1">
                <div className="flex justify-between">
                  <label for="" className="text-xs font-semibold px-1">First name</label>
                  <p className={"inputcolor text-xs italic ml-1 " + (fnamevalid ? "visible" : "invisible")}>firstname required</p>
                </div>
                <div className="flex">
                  <div
                    className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    className={"w-full -ml-10 pl-10 pr-3 py-1 rounded border-2 border-gray-200 outline-none focus:border-indigo-500 " + (fnamevalid ? "border bordercolor" : "border border-gray-light")}
                    id="first_name"
                    type="text"
                    placeholder="John"
                    value={fname}
                    onChange={handlefirstName}
                  />
                </div>
              </div>
              <div className="w-1/2 ml-1">
                <div className="flex justify-between">
                  <label for="" className="text-xs font-semibold px-1">Last name</label>
                  <p className={"inputcolor text-xs italic ml-1 " + (lnamevalid ? "visible" : "invisible")}>lastname required</p>
                </div>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    className={"w-full -ml-10 pl-10 pr-3 py-1 rounded border-2 border-gray-200 outline-none focus:border-indigo-500 " + (lnamevalid ? "border bordercolor" : "border border-gray-light")}
                    id="first_name"
                    type="text"
                    placeholder="Doe"
                    value={lname}
                    onChange={handlelastName}
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-2">
              <div className="flex justify-between">
                  <label for="" className="text-xs font-semibold px-1">Email</label>
                  <p className={"inputcolor text-xs italic ml-1 " + (emailvalid ? "visible" : "invisible")}>Email required</p>
                </div>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className={"w-full -ml-10 pl-10 pr-3 py-1 rounded border-2 border-gray-200 outline-none focus:border-indigo-500 " + (emailvalid ? "border bordercolor" : "border border-gray-light")}
                    name="Workemail"
                    placeholder="workemail"
                    value={email}
                    pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                    onChange={handleEmail}
                  >
                  </input>
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-2">
                <div className="flex justify-between">
                  <label for="" className="text-xs font-semibold px-1">Company name</label>
                  <p className={"inputcolor text-xs italic ml-1 " + (companynamevalid ? "visible" : "invisible")}>Companyname required</p>

                </div>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  </div>
                  <input
                    type="text"
                    className={"w-full -ml-10 pl-10 pr-3 py-1 rounded border-2 border-gray-200 outline-none focus:border-indigo-500 " + (companynamevalid ? "border bordercolor" : "border border-gray-light")}
                    name="Company Name"
                    placeholder="Company Name"
                    value={companyname}
                    onChange={handlecompanyName}
                  >
                  </input>
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-2">
                <div className="flex justify-between">
                  <label for="" className="text-xs font-semibold px-1">Number of Company</label>
                  <p className={"inputcolor text-xs italic ml-1 " + (companynumvalid ? "visible" : "invisible")}>choose Number of company</p>
                </div>
                <select
                  className={"block w-full p-1 pl-3 rounded py-1 px-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (companynumvalid ? "border bordercolor" : "border border-gray-light")}
                  value={companynum}
                  onChange={hadlecompanyNum}
                >
                  <option>1-3</option>
                  <option>4-10</option>
                  <option>11-20</option>
                  <option>20+</option>
                </select>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
            <div className="flex justify-between">
              <label for="" className="text-xs font-semibold px-1">Phone Number</label>
              <p className={"inputcolor text-xs italic ml-1 " + (phonevalid ? "visible" : "invisible")}>phone number required</p>
            </div>
            <div className="flex mb-2">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              </div>
              <input
                className={"w-full -ml-10 pl-10 pr-3 py-1 rounded border-2 border-gray-200 outline-none focus:border-indigo-500 " + (lnamevalid ? "border bordercolor" : "border border-gray-light")}
                name="phone"
                placeholder="Phone number"
                pattern="((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))"
                value={phone}
                onChange={handlePhone}
              />
            </div>
            <div className="flex justify-between">
              <label for="" className="text-xs font-semibold px-1">Password</label>
              <p className={"inputcolor text-xs italic ml-1 " + (passvalid ? "visible" : "invisible")}>password required</p>
            </div>
            <div className="flex mb-3">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
              </svg>
              </div>
              <input
                password="password"
                className={"w-full -ml-10 pl-10 pr-3 py-1 rounded border-2 border-gray-200 outline-none focus:border-indigo-500 " + (passvalid ? "border bordercolor" : "border border-gray-light")}
                name="password"
                placeholder="*************"
                value={password}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,20}$"
                onChange={handlePassword}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 bordercolor"
                  value={check}
                  onChange={handleCheck}
                />
                <label
                  for="remember-me"
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
            <p className={"inputcolor text-xs ml-1 " + (checkvalid ? "visible" : "invisible")}>check required</p>
            <button
              type="submit"
              className="mb-2 w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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

