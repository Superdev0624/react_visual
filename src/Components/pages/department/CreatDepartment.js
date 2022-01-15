import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase-config'
import '../../assets/main.css'
export default function CreateDepartment() {
  const [partname, setPartname] = useState('');
  const [buget, setBudget] = useState('');
  const [partmanage, setPartmanage] = useState('');
  const [superpartname, setSuperPartname] = useState('');
  const [description, setDescription] = useState('');
  const [partnamevalid, setPartnameValid] = useState(false);
  const [superpartnamevalid, setSuperpartnameValid] = useState(false);
  const [selectmanager, setSelectManager] = useState([]);
  const [depart, setDepart] = useState([]);
  let navigate=useNavigate();
  const authID = sessionStorage.getItem('UID')
  useEffect(() => {
    db.collection("UserRole").where('userId',"==",authID).where('Role',"==","Admin")
    .get()
    .then(doc=>{
      const currentusercompany = doc.docs[0].data().companyId
      db.collection('UserRole').where('companyId',"==", currentusercompany)
      .get()
      .then(async doc=>{
        var arr = [];
        for(let i = 0; i<doc.docs.length; i++) {
          var useruid = doc.docs[i].data().userId
          const doc1 = await db.collection("Users")
          .doc(useruid)
          .get()
          var users = doc1.data()
          if (!!users) arr.push(users);
        }
        setSelectManager(arr)
      })
    })
    db.collection('departments').where('Basic',"==", "0")
    .get()
    .then(doc=>{
      var superarr = [];
      for(let i = 0; i < doc.docs.length; i++){
        const partdata = doc.docs[i].data().departmentname
        superarr.push(partdata)
      }
      setDepart(superarr)
    })
    // eslint-disable-next-line 
  },[])
  function onCancel (e) {
    e.preventDefault();
    navigate('/department');
  }
  const handlepartName =(e) =>{
    setPartname(e.target.value);
      setPartnameValid(false);
  }
  const handlepartmanage = (e) => {
    setPartmanage(e.target.value);
  }
  const handleBudget = (e) =>{
    setBudget(e.target.value);
  } 
  const handlesuperpart = (e) => {
    setSuperPartname(e.target.value);
    setSuperpartnameValid(false);
  }
  const handleDescription =(e) =>{
    setDescription(e.target.value);
  }
  function handleSubmit (e) {
    e.preventDefault();
    if(superpartname === '' || partname === ''|| partmanage ===''){
      if( superpartname === '') {
        setSuperpartnameValid(true);
      }
      if( partname === ''){
        setPartnameValid(true);
      }
      return
    }
      db.collection("UserRole").where("userId","==",authID)
      .get()
      .then(doc=>{
        const companyRole= doc.docs[0].data().companyId
          db.collection("departments").where("departmentname","==",partname)
          .get()
          .then(doc=>{
            if(doc.docs.length === 0) {
                db.collection("departments")
                .doc()
                .set({
                  Basic:"1",
                  departmentname: partname,
                  departmentmanager: partmanage,
                  description: description
                })
                db.collection("departments").where("departmentname","==", partname)
                .get()
                .then(doc=>{
                  const departmentrole = doc.docs[0].id
                  db.collection("DepartmentRole")
                  .doc()
                  .set({
                    companyId:companyRole,
                    departmentId: departmentrole
                  })
                })
                db.collection("Departmentdata")
                .doc()
                .set({
                  superpart: superpartname,
                  partname: partname,
                  partmanager: partmanage,
                  partbudget: buget
                })
                navigate("/department")
            } else{
              return
            }
          })
      })
    }
  return(
    <div className="bg-blue-50 flex justify-center items-center px-5 py-5">
      <div className="py-2 flex justify-center align-top bg-blue-50">
        <div className="px-2 py-1">
        <div className="uppercase text-5xl textstylecolor font-Medium text-center mb-3 italic">Create Department</div>
          <form className="w-full max-w-lg object-center" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Department
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (superpartnamevalid ? "visible" : "invisible")}>Department Manager required</p>
                </div>
                <select
                  className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (superpartnamevalid ? "border bordercolor":"border border-gray-200")}
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
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Sub Department
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (partnamevalid ? "visible":"invisible")}>Department Name required</p>
                </div>
                <input 
                  type="text"
                  className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (partnamevalid ? "border bordercolor":"border border-gray-200")}
                  placeholder="IT Department"
                  value={partname}
                  onChange={handlepartName}
                />
              </div>
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Budget
                  </label>
                </div>
                <input 
                  type="text"
                  className="appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200"
                  placeholder="ex: 9999"
                  value={buget}
                  onChange={handleBudget}
                />
              </div>
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    department manager
                  </label>
                </div>
                <select
                  className="appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200"
                  value={partmanage}
                  onChange={handlepartmanage}
                >
                  <option selected>Select Manager</option>
                  {selectmanager.length > 0 ? (
                      selectmanager.map((part ,id) => (
                        <option key={id}>{part.firstname}{" "}{part.lastname}</option>
                      ))
                    ) : (
                      <option>Select Manager</option>
                    )
                    }
                </select>
              </div>
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Description
                  </label>
                </div>
                <textarea 
                  className="appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200"
                  rows="5" 
                  minLength="20"
                  maxLength="1000"
                  size="150"
                  placeholder="Write about department..."
                  value={description}
                  onChange={handleDescription}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mt-3">
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <button type="submit" className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-blue-700 border border-gray-200 rounded py-2 px-4 leading-tight">
                  <span className="mr-2 uppercase">Create</span>
                </button>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <button className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-blue-700 border border-gray-200 rounded py-2 px-4 leading-tight" onClick={onCancel}>
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