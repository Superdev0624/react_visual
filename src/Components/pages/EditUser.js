import React,{ useState, useEffect , useRef}from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { db } from '../../firebase-config'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/main.css'
export default function EditUser() {
 const [firstname, setFirstname] = useState("");
 const [lastname, setLastname] = useState("");
 const [companyname, setCompanyname] = useState("");
 const [companynum, setCompanynum] = useState("");
 const [role, setRole] = useState("");
 const [phone, setPhone] = useState("");
 const [error, setError] = useState("")
  let navigate = useNavigate();
  function cancelButton (e) {
    e.preventDefault();
    navigate('/user');
    toast.info("User Edit has been cancelled.")
  }
 const paras = useParams().id 
  useEffect(() =>{
    db.collection("users")
    .doc(paras)
    .get()
    .then(docpar =>{
      const editData = docpar.data()
      setFirstname(editData.firstname)
      setLastname(editData.lastname)
      setCompanyname(editData.companyname)
      setCompanynum(editData.companynum)
      setRole(editData.Role)
      setPhone(editData.phone)
    })
  })

  const handlefirstName = (e) => {
    const value = e.target.value;  
    setFirstname(e.target.value)
    if ( !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+?/i.test(value)) {
      setError("Invalid value")
    } else {
      setError("")
    }
  };
  const handlelastName = (e) => {
    setLastname(e.target.value);
  };
  const handlecompanyName = (e) => {
    setCompanyname(e.target.value);
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

  function onSubmit(e) {
    e.preventDefault();
    console.log(firstname, lastname, companyname, companynum, role, phone)
    db.collection("users")
    .doc(paras)
    .update({
      firstname:firstname,
      lastname:lastname,
      companyname:companyname,
      companynum:companynum,
      role:role,
      phone: phone
    }).then(() =>{
     navigate('/user')
     toast.success("edit success!")
    })

  }

  return(
    <>
    <ToastContainer />
    <div className="flex justify-center items-center bg-indigo-50">
        <div className="container max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-xl overflow-hidden sm:max-w-xl pt-3 mt-10 pb-3  flex-1 flex flex-col items-center justify-center">
          <div className="px-2 py-1">
            <div className="uppercase text-4xl textstylecolor font-semibold text-center">Edit User</div>
              <form className="w-full max-w-lg" onSubmit={onSubmit}>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    First Name
                  </label>
                  <input 
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="john"
                    value={firstname}
                    onChange={handlefirstName}
                  />
                  <p className="text-red-500 text-xs italic">{error && error}</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    placeholder="Doe"
                    value={lastname}
                    onChange={handlelastName}
                  />
                  <p className="text-red-500 text-xs italic">{error && error}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Department
                  </label>
                  <input 
                    type="text" 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    placeholder="department"
                  />
                  <p className="text-red-500 text-xs italic">{error && error}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 ">
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Company name
                  </label>
                  <input 
                    type="text" 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Albuquerque"
                    value={companyname}
                    onChange={handlecompanyName}
                  />
                  <p className="text-red-500 text-xs italic">{error && error}</p>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1" >
                    number of company
                  </label>
                  <div className="relative">
                    <select 
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={companynum}
                      onChange={handlecompanyNum}
                    >
                        <option selected className="opacity 0.7">select number</option>
                        <option>1-3</option>
                        <option>4-10</option>
                        <option>11-20</option>
                        <option>20+</option>
                    </select>
                    <p className="text-red-500 text-xs italic">{error && error}</p>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1" >
                    Role
                  </label>
                  <div className="relative">
                    <select 
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={role}
                      onChange={handlerole}
                    >
                        {/* <option selected className="opacity 0.7">none</option> */}
                        <option>Admin</option>
                        <option>Accountant</option>
                        <option>Department Manager</option>
                        <option>User</option>
                    </select>
                    <p className="text-red-500 text-xs italic">{error && error}</p>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1" >
                    Phone Number
                  </label>
                  <input 
                    type="text" 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="+1 999-234-5678"
                    value={phone}
                    onChange={handlephone}
                  />
                  <p className="text-red-500 text-xs italic">{error && error}</p>
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
    </>
  )
}