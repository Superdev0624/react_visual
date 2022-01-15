import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { db } from '../../../firebase-config'
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/main.css'
export default function EditUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [superpartname, setSuperPartname] = useState('');
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  let navigate = useNavigate();
  const [depart, setDepart] = useState([]);
  const authID = sessionStorage.getItem('UID')
  const edituserID = useParams().id
  function cancelButton(e) {
    e.preventDefault();
    navigate('/user');
  }
  useEffect(() => {
    db.collection("UserRole").where("userId", "==", authID)
    .get()
    .then(doc =>{
      var comname=doc.docs[0].data().companyId
      setCompanyname(comname)
    })
    db.collection("Users")
    .doc(edituserID)
    .get()
    .then(doc =>{
      db.collection("UserRole").where("userId","==",edituserID)
      .get()
      .then(doc=>{
        setRole(doc.docs[0].data().Role)
      })
      const editUserData = doc.data()
      setFirstname(editUserData.firstname)
      setLastname(editUserData.lastname)
      setPhone(editUserData.phone)
    })
    db.collection('Departmentdata')
    .get()
    .then(doc=>{
      var superarr = [];
      for(let i = 0; i < doc.docs.length; i++){
        const partdata = doc.docs[i].data().partname
        superarr.push(partdata)
      }
      setDepart(superarr)
    })
    // eslint-disable-next-line 
  }, [])

  const handlefirstName = (e) => {
    setFirstname(e.target.value)
  };
  const handlelastName = (e) => {
    setLastname(e.target.value);
  };
  const handlephone = (e) => {
    setPhone(e.target.value);
  };
  const handlerole = (e) => {
    setRole(e.target.value);
  };
  const handlesuperpart = (e) => {
    setSuperPartname(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    db.collection("UserRole").where("userId","==", edituserID)
    .get()
    .then(doc=>{
     const userroleId = doc.docs[0].id
     db.collection("UserRole")
     .doc(userroleId)
     .update({
       Role: role,
       Partname: superpartname
     })
     .then(()=>{
       db.collection("Users")
       .doc(edituserID)
       .update({
         firstname:firstname,
         lastname: lastname,
         phone:phone,
       })
        .then(()=>{
         navigate('/user')
        })
      })
    })
    .catch((error) =>{
      console.log(error)
    })
  }
  return (
    <div className="flex justify-center flex-col bg-indigo-50">
      <div className="container max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-xl overflow-hidden sm:max-w-xl pt-3  pb-3 flex justify-center items-center">
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
            <div className="flex flex-wrap -mx-3">
              <div className="w-full px-3 mb-1">
              <div className="flex justify-between">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                  Department
                </label>
              </div>
                <select
                  className="appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200"
                  value={superpartname}
                  onChange={handlesuperpart}
                >
                  <option selected>Select Department</option>
                  {depart.length > 0 ? (
                      depart.map((part, id) => (
                        <option key={id}>{part}</option>
                      ))
                    ) : (
                      <option>Select Department</option>
                    )
                    }
                </select>
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
                    <option>Admin</option>
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
                  <span className="mr-2 uppercase">Save</span>
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
