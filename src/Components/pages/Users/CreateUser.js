import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../../firebase-config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/main.css'

export default function CreateUser() {
  const [fname, setFirst] = useState('');
  const [lname, setSecond] = useState('');
  const [email, setEmail] = useState('');
  const [companyname, setCompanyname] =useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [superpartname, setSuperPartname] = useState([]);
  const [fnamevalid, setFnameValid] = useState(false);
  const [lnamevalid, setLnameValid] = useState(false);
  const [emailvalid, setEmailValid] = useState(false);
  const [passvalid, setPassValid] = useState(false);
  const [rolevalid, setRoleValid] = useState(false);
  const [depart, setDepart] = useState([]);
  const [product, setProduct] = useState(false);
  let navigate = useNavigate();
  const authID = sessionStorage.getItem('UID') 
  useEffect(() =>{
  db.collection("UserRole").where("userId", "==", authID)
    .get()
    .then(doc =>{
      var comname=doc.docs[0].data().companyId
      setCompanyname(comname)
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
  },[])
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
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassValid(false);
  };
  const handleRole = (e) => {
    setRole(e.target.value)
    setRoleValid(false);
  }
  const handleCheck = (e) => {
    const value = e.target.value
    var arr = superpartname;
    arr.push(value);
    setSuperPartname(arr)
    console.log(arr)

  }
  async function handleSubmit(e) {
    e.preventDefault();
    if(fname === ''|| lname === ''|| email === ''|| password === ''|| role===''){
      if(fname === ''){
        setFnameValid(true)
      }
      if(lname === ''){
        setLnameValid(true)
      }
      if(email === ''){
        setEmailValid(true)
      }
      if(password === ''){
        setPassValid(true)
      }
      if(role === ''){
        setRoleValid(true)
      }
      return
    }
    db.collection("Users").where("useremail","==", email)
    .get()
    .then(doc=>{
      if(doc.docs.length === 0) {
        auth.createUserWithEmailAndPassword(email, password)
        .then(createuser =>{
          db.collection("Users")
          .doc(createuser.user.uid)
          .set({
            firstname: fname,
            lastname: lname,
            password: password,
            phone:phone,
            useremail: email
          })
          db.collection("UserRole")
          .doc()
          .set({
            Role: role,
            companyId: companyname,
            Partname: superpartname,
            userId: createuser.user.uid
          });
          navigate('/user');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log(error.code)
          }
          if (error.code === 'auth/weak-password') {
            console.log(error.code)
          }
        })
      } else {
        toast.warning("Same user email alredy exist")
        return
      }
    })
  }

  function cancelButton (e) {
    e.preventDefault();
    navigate('/user');
  }
  return (
    <div className="flex justify-center items-center bg-indigo-50">
      <div className="container max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden sm:max-w-xl pt-3 pb-3  flex-1 flex flex-col items-center justify-center">
        <div className="px-2 py-1">
          <div className="uppercase text-3xl textstylecolor font-semibold text-center">Create User</div>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-1">
              <div className="w-full md:w-1/2 px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1 ">
                    First Name
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (fnamevalid ? "visible" : "invisible")}>firstname required.</p>
                </div>
                <input 
                  type="text"  
                  className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (fnamevalid ? "border bordercolor" : "border border-gray-200")}
                  placeholder="Jone"
                  value={fname}
                  onChange={handlefirstName}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                  Last Name
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (lnamevalid ? "visible" : "invisible")}>LastName required.</p>
                </div>
                <input 
                  type="text"
                  className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (lnamevalid ? "border bordercolor" : "border border-gray-200")}
                  placeholder="Doe"
                  value={lname}
                  onChange={handlelastName}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-1">
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold px-1 uppercase block py-1">
                  Password
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (lnamevalid ? "visible" : "invisible")}>Password required.</p>
                </div>
                <input 
                  type="password"
                  className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (passvalid ? "border bordercolor" : "border border-gray-200")}
                  placeholder="******************"
                  value={password}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,20}$"
                  onChange={handlePassword}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full px-3 mb-1">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                  Email
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (emailvalid ? "visible" : "invisible")}>Email required.</p>
                </div>
                <input 
                  type="email"
                  className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (emailvalid ? "border bordercolor" : "border border-gray-200")}
                  placeholder="Enter user email address"
                  pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                  value={email}
                  onChange={handleEmail}
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
                <li className="flex flex-row items-center h-5 justify-center transform cursor-pointer text-gray-800">
                  <span className="uppercase ml-1 text-xl m-2 font-medium" onClick={() => setProduct(!product)}>Available Department List</span>
                </li>
                {product ? (
                  <ul
                  className="appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200">
                
                  {depart.length > 0 ? (
                      depart.map((part, id) => (
                        <div key={id} className="flex justify-between">
                          <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">{part}</label>
                          <input 
                            type="checkbox" 
                            className="form-checkbox h-3 w-3 text-blue-600"
                            value={part}
                            onChange={handleCheck}/>
                        </div>
                      ))
                    ) : (
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">No Department</label>
                    )
                    }
                </ul>
                ) : ("")}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                  Role
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (rolevalid ? "visible" : "invisible")}>Role required.</p>
                </div>
                <div className="relative">
                  <select 
                    className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (rolevalid ? "border bordercolor" : "border border-gray-200")}
                    value={role}
                    onChange={handleRole}
                  > 
                    <option select="true" >Select Role</option>
                    <option>User</option>
                    <option>Accountant</option>
                    <option>Admin</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0 ">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                  Phone
                  </label>
                </div>
                <input 
                  type="text"
                  className="appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200"
                  placeholder="+1 234-567-5678"
                  pattern="^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$"
                  value={phone}
                  onChange={handlePhone}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mt-3">
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <button type="submit"className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-green-500 border border-gray-200 rounded py-2 px-4 leading-tight">
                  <span className="mr-2 uppercase">Add</span>
                </button>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <button className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-green-500 border border-gray-200 rounded py-2 px-4 leading-tight" onClick={cancelButton}>
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