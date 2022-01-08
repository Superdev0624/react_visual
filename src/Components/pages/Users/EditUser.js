import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { db } from '../../../firebase-config'
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/main.css'
export default function EditUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [companynum, setCompanynum] = useState("");
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [part, setPart] = useState([]);
  // const [error, setError] = useState("")
  let navigate = useNavigate();
  const authID = sessionStorage.getItem('UID')
  const edituserID = useParams().id
  function cancelButton(e) {
    e.preventDefault();
    navigate('/user');
    toast.info("User Edit has been cancelled.")
  }
  useEffect(() => {
    db.collection("Users")
      .get()
      .then(doc => {
        const users = doc.docs;
        const result = users.filter(user => user.id === authID)[0]
        setCompanyname(result.data().companyname)
      })
    db.collection("users")
      .doc(edituserID)
      .get()
      .then(doc => {
        const editData = doc.data()
        setFirstname(editData.firstname)
        setLastname(editData.lastname)
        setPassword(editData.password)
        setCompanynum(editData.companynum)
        setDepartment(editData.department)
        setRole(editData.Role)
        setPhone(editData.phone)
      })
    db.collection("departments")
      .get()
      .then(doc =>{
        for(let i = 0; i< doc.docs.length; i++) {
          const partdata = doc.docs[i]
          const itemdata = partdata.data().departmentname
          setPart(arr =>[...arr, itemdata])      
        }
      })  
  }, [authID, edituserID])

  const handlefirstName = (e) => {
    // const value = e.target.value;
    setFirstname(e.target.value)
    // if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+?/i.test(value)) {
    //   setError("Invalid value")
    // } else {
    //   setError("")
    // }
  };
  const handlelastName = (e) => {
    setLastname(e.target.value);
  };
  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };
  const handlephone = (e) => {
    setPhone(e.target.value);
  };
  const handlerole = (e) => {
    setRole(e.target.value);
  };
  const handlecompanyNum = (e) => {
    setCompanynum(e.target.value)
  };
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(firstname, lastname, password, department, companynum, role, phone)
    db.collection("users")
      .doc(edituserID)
      .update({
        firstname: firstname,
        lastname: lastname,
        department: department,
        role: role,
        phone: phone,
        // password: password,
        companynum: companynum
      })
      .then(() => {
        toast.success("Edit Success!")
        navigate('/user')
      })
      .catch((error) => {
        console.log(error)
      })

  }

  return (
    <div className="flex justify-center items-center bg-indigo-50">
      <div className="container max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-xl overflow-hidden sm:max-w-xl pt-3 mt-10 pb-3  flex-1 flex flex-col items-center justify-center">
        <div className="px-2 py-1">
          <span className="block tracking-wide text-gray-400 text-4xl text-center font-medium italic">COMPANY  :   {companyname} </span>
          <div className="uppercase text-3xl textstylecolor font-semibold text-center">Edit User</div>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="john"
                  value={firstname}
                  onChange={handlefirstName}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Doe"
                  value={lastname}
                  onChange={handlelastName}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="******************"
                  value={password}
                  onChange={handlePassword}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 ">
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1 mb-1">
                  Department name
                </label>
                <select 
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="IT Department"
                  value={department}
                  onChange={handleDepartment}
                >
                  {part.map((e, id) =><option key={id}>{e}</option>)}
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1 mb-1">
                  number of company
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1 mb-1">
                  Role
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={role}
                    onChange={handlerole}
                  >
                    <option selected>Select Role</option>
                    <option>Accountant</option>
                    <option>User</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="+1 999-234-5678"
                  value={phone}
                  onChange={handlephone}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <button type="submit" className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-blue-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <span className="mr-2 uppercase">Edit</span>
                </button>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <button type="button" className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-blue-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onClick={cancelButton}>
                  <span className="mr-2 uppercase">Cancel</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
