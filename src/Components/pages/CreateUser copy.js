import React, { useState }from 'react'
import '../assets/main.css'
import { db, auth } from '../../firebase-config'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
export default function CreateUser() {
  const [fname, setFirst] = useState('');
  const [lname, setSecond] = useState('');
  const [email, setEmail] = useState('');
  const [companyname, setCompany] = useState('');
  const [companynum, setCompanynum] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fnamevalid, setFnameValid] = useState(false);
  const [lnamevalid, setLnameValid] = useState(false);
  const [emailvalid, setEmailValid] = useState(false);
  const [passvalid, setPassValid] = useState(false);
  const [companynamevalid, setCompanynameValid] = useState(false);
  const [companynumvalid, setCompanyNumValid] = useState(false);
  const [phonevalid, setPhoneValid] = useState(false);
  const [rolevalid, setRoleValid] = useState(false);
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
    setEmail(e.target.value);
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
  const handlecompanyNum = (e) => {
    setCompanynum(e.target.value)
    setCompanyNumValid(false);
  };
  const handleRole = (e) => {
    setRole(e.target.value)
    setRoleValid(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if(fname === '' || lname === '' || companyname === '' || companynum === ''|| phone === ''|| role === '') {
      setCompanyNumValid(true);
      setCompanynameValid(true);
      setEmailValid(true);
      setPassValid(true);
      setFnameValid(true);
      setLnameValid(true);
      setPhoneValid(true);
      setRoleValid(true);
      toast.error('All fields required!')
      return
    }
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => { 
      db.collection("users")
      .doc(authUser.user.uid)
      .set({
        useremail: email,
        firstname: fname,
        lastname: lname,
        companyname: companyname,
        companynum: companynum,
        phone: phone,
        role: role
      })
      .then(() => {
        navigate('/user')
        toast("create member successfully");
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
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-indigo-50">
        <div className="max-w-5xl mx-auto bg-gray-50 rounded-xl shadow-md overflow-hidden sm:max-w-2xl">
          <div className="px-5 py-3 text-center">
            <div className="uppercase text-4xl textstylecolor font-semibold text-center">Add User</div>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1" for="grid-first-name">
                    First Name
                  </label>
                  <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name" 
                    type="text" 
                    placeholder="Jone"
                    value={fname}
                    onChange={handlefirstName}
                  />
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1" for="grid-last-name">
                    Last Name
                  </label>
                  <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-last-name" 
                    type="text" 
                    placeholder="Doe"
                    value={lname}
                    onChange={handlelastName}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Password
                  </label>
                  <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-password" 
                    type="password" 
                    placeholder="******************"
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Workemail
                  </label>
                  <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    type="email" 
                    placeholder="**@example.example"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1" for="grid-city">
                    Company name
                  </label>
                  <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-city" 
                    type="text" 
                    placeholder="Albuquerque"
                    value={companyname}
                    onChange={handlecompanyName}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1" for="grid-state">
                    number of company
                  </label>
                  <div className="relative">
                    <select 
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-state"
                      value={companynum}
                      onChange={handlecompanyNum}
                    >
                      <option>1-3</option>
                      <option>4-10</option>
                      <option>11-20</option>
                      <option>20+</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1" for="grid-state">
                    Role
                  </label>
                  <div className="relative">
                    <select 
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-state"
                      value={role}
                      onChange={handleRole}
                    >
                      <option disabled selected>select role</option>
                      <option>Accountant</option>
                      <option>Department Manager</option>
                      <option>User</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1" for="grid-city">
                    Phone Number
                  </label>
                  <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-city" 
                    type="text" 
                    placeholder="+1 234-567-8989"
                    value={phone}
                    onChange={handlePhone}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <button type="submit" className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-blue-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <span className="mr-2 uppercase">Add</span>
                  </button>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Link to="/user" className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-blue-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <span className="mr-2 uppercase">Cancel</span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
}