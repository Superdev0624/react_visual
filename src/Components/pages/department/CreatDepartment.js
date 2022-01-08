import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase-config'
import { toast } from 'react-toastify';
import '../../assets/main.css'
export default function CreateDepartment() {
  const [partname, setPartname] = useState('');
  const [partmanage, setPartmanage] = useState('');
  const [description, setDescription] = useState('');
  const [partnamevalid, setPartnameValid] = useState(false);
  const [partmanagevalid, setPartmanageValid] = useState(false);
  const [descriptionvalid, setDescriptionValid] = useState(false);
  let navigate=useNavigate();
  const authID = sessionStorage.getItem('UID')
  function onCancel (e) {
    e.preventDefault();
    navigate('/department');
    toast.info("Department create has been cancelled.")
  }
  const handlepartName =(e) =>{
    setPartname(e.target.value);
    setPartnameValid(false);
  }
  const handlepartmanage = (e) => {
    setPartmanage(e.target.value);
    setPartmanageValid(false);
  }
  const handleDescription =(e) =>{
    setDescription(e.target.value);
    setDescriptionValid(false);
  }
  function handleSubmit (e) {
    e.preventDefault();
    let isValid = true;
    if (partname === '') {
      setPartnameValid(true);
      toast.error("Department Name required")
      isValid = false;
    }
    if (partmanage === '') {
      setPartmanageValid(true);
      toast.error("Department Manager required")
      isValid = false;
    }
    if (description === '') {
      setDescriptionValid(true);
      toast.error("About department description required")
      isValid = false;
    }
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
        db.collection("departments").where("departmentname","==",partname)
        .get()
        .then(ref=>{
          const departmentrole = ref.docs[0].id
          db.collection("UserRole").where("userId", "==", authID)
          .get()
          .then(doc=>{
            const users = doc.docs;
            const companyRole=users[0].data().companyId
            db.collection("DepartmentRole")
            .doc()
            .set({
              companyId:companyRole,
              departmentId: departmentrole
            })
          })
        })
        .then(() =>{
          toast.success("create Department Successfully")
          navigate("/department")
        })
      } else{
        toast.warn("Same Department already exist")
        return
      }
    })
  }
  return(
    <div className="min-w-screen min-h-screen bg-blue-50 flex justify-center px-5 py-5">
      <div className="py-2 flex justify-center align-top bg-blue-50">
        <div className="px-2 py-1">
        <div className="uppercase text-5xl textstylecolor font-Medium text-center mb-3 italic">Create Department</div>
          <form className="w-full max-w-lg object-center" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-1">
                    Department name
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (partnamevalid ? "visible" : "invisible")}>Department Name required</p>
                </div>
                <input 
                  type="text"
                  className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (partnamevalid ? "border bordercolor" : "border border-gray-200")}
                  placeholder="IT Department"
                  value={partname}
                  onChange={handlepartName}
                />
              </div>
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    department manager
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (partmanagevalid ? "visible" : "invisible")}>Department manager required</p>
                </div>
                <input 
                  type="text"
                  className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (partmanagevalid ? "border bordercolor" : "border border-gray-200")}
                  placeholder="Jack Smith"
                  value={partmanage}
                  onChange={handlepartmanage}
                />
              </div>
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Description
                  </label>
                  <p className={"inputcolor text-xs italic ml-1 " + (descriptionvalid ? "visible" : "invisible")}>Description required</p>
                </div>
                <textarea 
                  className={"appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (partmanagevalid ? "border bordercolor" : "border border-gray-200")}
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