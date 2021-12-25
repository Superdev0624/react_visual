import React, { useState, useEffect } from "react";
import '../assets/main.css'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase-config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/main.css'

export default function CreateUser() {
  const [fname, setFirst] = useState('');
  const [lname, setSecond] = useState('');
  const [email, setEmail] = useState('');
  const [companyname, setCompanyname] =useState('');
  const [companynum, setCompanynum] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [fnamevalid, setFnameValid] = useState(false);
  const [lnamevalid, setLnameValid] = useState(false);
  const [emailvalid, setEmailValid] = useState(false);
  const [passvalid, setPassValid] = useState(false);
  const [departmentvalid, setDepartmentValid] = useState(false);
  const [companynumvalid, setCompanyNumValid] = useState(false);
  const [phonevalid, setPhoneValid] = useState(false);
  const [rolevalid, setRoleValid] = useState(false);
  let navigate = useNavigate();
  const authID = sessionStorage.getItem('UID') 
  useEffect(() =>{
  db.collection("users")
    .get()
    .then(doc =>{
      const users = doc.docs;
      const result = users.filter(user => user.id === authID)[0]
      setCompanyname(result.data().companyname)
    })
  },[authID])
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
  }
  const handleDepartment=(e) => {
    setDepartment(e.target.value)
    setDepartmentValid(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(fname === '' || lname === '' || companynum === ''|| phone === ''|| role === '' || department === '') {
      setCompanyNumValid(true);
      setEmailValid(true);
      setPassValid(true);
      setFnameValid(true);
      setLnameValid(true);
      setPhoneValid(true);
      setRoleValid(true);
      setDepartmentValid(true);
      toast.error('All fields required!')
      return
    }
    auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      db.collection("users").where("useremail", "==" , email)
      .get()
      .then(doc =>{
        if(doc.docs.length === 0) {
          db.collection("users")
          .doc(res.user.uid)
          .set({
            firstname: fname,
            lastname: lname,
            companyname: companyname,
            companynum: companynum,
            phone: phone,
            department:department,
            useremail: email,
            Role: role
          })
          .then(() =>{
            toast.success("add member successfully!")
            navigate('/user')
          })
        }
      })
    })
  }


  function cancelButton (e) {
    e.preventDefault();
    navigate('/user');
    toast.info("User addition has been cancelled.")
  }
  return (
    <div>
    <ToastContainer />
      <div className="flex justify-center items-center bg-indigo-50">
        <div className="container max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-xl overflow-hidden sm:max-w-xl pt-3 mt-10 pb-3  flex-1 flex flex-col items-center justify-center">
          <div className="px-2 py-1">
          <span className="block tracking-wide text-gray-400 text-4xl text-center font-medium italic">COMPANY  :   { companyname } </span>
            <div className="uppercase text-3xl textstylecolor font-semibold text-center">Add User</div>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    First Name
                  </label>
                  <input 
                    type="text"
                    className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (fnamevalid ? "border bordercolor" : "border border-gray-200")}
                    placeholder="Jone"
                    value={fname}
                    onChange={handlefirstName}
                   />
                   <p className={"text-red-500 text-xs italic " + (fnamevalid ? "visible" : "invisible")}>Please fill out this field.</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Last Name
                  </label>
                  <input 
                    type="text"
                    className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (lnamevalid ? "border bordercolor" : "border border-gray-200")}
                    placeholder="Doe"
                    value={lname}
                    onChange={handlelastName}
                  />
                  <p className={"text-red-500 text-xs italic " + (lnamevalid ? "visible" : "invisible")}>Please fill out this field.</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input 
                    type="password"
                    className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (passvalid ? "border bordercolor" : "border border-gray-200")}
                    placeholder="******************"
                    value={password}
                    onChange={handlePassword}
                  />
                  <p className={"text-red-500 text-xs italic " + (passvalid ? "visible" : "invisible")}>Please fill out this field.</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Workemail
                  </label>
                  <input 
                    type="email"
                    className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (emailvalid ? "border bordercolor" : "border border-gray-200")}
                    placeholder="**@example.example"
                    value={email}
                    onChange={handleEmail}
                  />
                  <p className={"text-red-500 text-xs italic " + (emailvalid ? "visible" : "invisible")}>Please fill out this field.</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-center text-xs font-bold py-1">
                    Department name
                  </label>
                  <input 
                    type="text"
                    className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (phonevalid ? "border bordercolor" : "border border-gray-200")}
                    placeholder="IT Department"
                    value={department}
                    onChange={handleDepartment}
                  />
                  <p className={"text-red-500 text-xs italic " + (departmentvalid ? "visible" : "invisible")}>Please fill out this field.</p>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    number of company
                  </label>
                  <div className="relative">
                    <select 
                      className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (companynumvalid ? "border bordercolor" : "border border-gray-200")}
                      value={companynum}
                      placeholder="select number"
                      onChange={handlecompanyNum}
                    >
                      <option>1-3</option>
                      <option>4-10</option>
                      <option>11-20</option>
                      <option>20+</option>
                    </select>
                    <p className={"text-red-500 text-xs italic " + (companynumvalid ? "visible" : "invisible")}>Please fill out this field.</p>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Role
                  </label>
                  <div className="relative">
                    <select 
                      className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (rolevalid ? "border bordercolor" : "border border-gray-200")}
                      value={role}
                      onChange={handleRole}
                    >
                      <option>Accountant</option>
                      <option>Department Manager</option>
                      <option>User</option>
                    </select>
                    <p className={"text-red-500 text-xs italic " + (rolevalid ? "visible" : "invisible")}>Please fill out this field.</p>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Phone Number
                  </label>
                  <input 
                    type="text"
                    className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (phonevalid ? "border bordercolor" : "border border-gray-200")}
                    placeholder="+1 234-567-5678"
                    value={phone}
                    onChange={handlePhone}
                  />
                  <p className={"text-red-500 text-xs italic " + (phonevalid ? "visible" : "invisible")}>Please fill out this field.</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <button type="submit"className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-blue-700 border border-gray-200 rounded py-2 px-4 leading-tight">
                    <span className="mr-2 uppercase">Add</span>
                  </button>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <button className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-blue-700 border border-gray-200 rounded py-2 px-4 leading-tight" onClick={cancelButton}>
                    <span className="mr-2 uppercase">Cancel</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}