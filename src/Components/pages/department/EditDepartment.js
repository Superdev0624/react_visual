import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase-config'
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/main.css'

export default function EditDepartment() {
  const [partname, setPartname] = useState('');
  const [partmanage, setPartmanage] = useState('');
  const [budget, setBudget] = useState('');
  const [superpartname, setSuperPartname] = useState('');
  const [selectmanager, setSelectManager] = useState([]);
  const [depart, setDepart] = useState([]);
  const editID = useParams().id
  const authID = sessionStorage.getItem('UID')
  let navigate = useNavigate();
  useEffect(() =>{
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
    db.collection("Departmentdata")
    .doc(editID)
    .get()
    .then(doc =>{
      const editData = doc.data()
      setPartname(editData.partname)
      setPartmanage(editData.partmanager)
      setSuperPartname(editData.superpart)
      setBudget(editData.partbudget)
    })
    db.collection("UserRole").where('userId',"==",authID).where('Role',"==","Admin")
    .get()
    .then(doc=>{
      const currentusercompany = doc.docs[0].data().companyId
      db.collection("UserRole").where("companyId","==", currentusercompany)
      .get()
      .then(doc=>{
        var arr = [];
        for(let i = 0; i<doc.docs.length; i++) {
          const useruid = doc.docs[i].data().userId
          db.collection("Users")
          .doc(useruid)
          .get()
          .then(doc=>{
            const users = doc.data()
            arr.push(users)      
          })
        }
        setSelectManager(arr)    
      })
    })
    // eslint-disable-next-line
  },[])
  function onCancel (e) {
    e.preventDefault();
    navigate('/department');
  }
  const handlepartName =(e) =>{
    setPartname(e.target.value);
  }
  const handleBudget =(e) =>{
    setBudget(e.target.value);
  }
  const handlepartmanage = (e) => {
    setPartmanage(e.target.value);
  }
  const handlesuperpart = (e) => {
    setSuperPartname(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    db.collection("Departmentdata")
    .doc(editID)
    .update({
      partname:partname,
      partmanager:partmanage,
      superpart: superpartname,
      partbudget:budget
    })
    .then(() =>{
      navigate('/department')
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return(
    <div className="bg-blue-50 flex justify-center items-center px-5 py-5">
      <div className="py-2 flex justify-center align-top bg-blue-50">
        <div className="px-2 py-1">
        <div className="uppercase text-5xl textstylecolor font-Medium text-center mb-3 italic">Edit Department</div>
          <form className="w-full max-w-lg object-center" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
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
                </div>
                <input 
                  type="text"
                  className="appearance-none block w-full text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200"
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
                  value={budget}
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
            </div>
            <div className="flex flex-wrap -mx-3 mt-3">
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <button type="submit" className="appearance-none block w-full backcustomcolor text-white font-medium hover:bg-blue-700 border border-gray-200 rounded py-2 px-4 leading-tight">
                  <span className="mr-2 uppercase">SAVE</span>
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