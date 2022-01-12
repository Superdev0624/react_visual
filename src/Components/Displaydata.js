import React,{useState} from 'react'
import '../Components/assets/main.css'
import { db } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
export default function Displaydata() {
  const [ roleData, setRoleData ] = useState([])
  let navigate = useNavigate();
  const authID = sessionStorage.getItem('UID') 
  db.collection("UserRole").where("userId","==",authID)
  .get()
  .then((doc) =>{
    setRoleData(
      doc.docs.map(doc => doc.data())
    )
  })
  function onChooseRoute(event) {
    sessionStorage.setItem('Role', event)
    if(event === "Admin"){
      db.collection("UserRole").where("userId","==",authID).where("Role","==",event)
    .get()
    .then(doc=>{
        const conditionusers = doc.docs[0].data().companyId
        sessionStorage.setItem('conditionusers', conditionusers)
    })
     navigate('/admindashboard')
  }else if(event === "Accountant"){
      db.collection("UserRole").where("userId","==",authID).where("Role","==",event)
    .get()
    .then(doc=>{
        const conditionusers = doc.docs[0].data().companyId
        sessionStorage.setItem('conditionusers', conditionusers)
    })
     navigate('/accountantdashboard')
   } else if ( event === "User") {
    db.collection("UserRole").where("userId","==",authID).where("Role","==",event)
    .get()
    .then(doc=>{
        const conditionusers = doc.docs[0].data().companyId
        sessionStorage.setItem('conditionusers', conditionusers)
    })
     navigate('/userdashboard')
   }
  }
  return(
    <div className="bg-grey-lighter min-h-screen flex flex-col app">
        <div className="max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-8 py-4 rounded shadow-md text-black w-full">
            <div className="mb-6 flex justify-center">
                <span>You are a registered user in a multi-company.
Please select which company you would like to view the data from from the following companies.</span>
                    {roleData.map((e, id) =>
                      <button 
                        className="bg-white mb-5 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
                        key={id}
                        onClick={() => onChooseRoute(e?.Role)}
                      >
                        Company:{e?.companyId}
                      </button>)}
             </div>
           </div>
         </div>
       </div>
  )
}