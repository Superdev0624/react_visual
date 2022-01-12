import React,{ useEffect,useState }from 'react';
import '../assets/main.css';
import { db } from '../../firebase-config'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(props) {
  const Roll = sessionStorage.getItem('UID')
  const companyname = sessionStorage.getItem('conditionusers')
  const [partmanage, setPartmanage] = useState('');
  const [ roleData, setRoleData ] = useState([]);
  let navigate = useNavigate()
  useEffect(() => { 
    db.collection("UserRole").where("userId","==",props.userID)
    .get()
    .then((doc) =>{
      var arr= [];
        for(let i = 0; i < doc.docs.length; i++){
          const cominfo = doc.docs[i].data().companyId
          arr.push(cominfo)
        }
        setRoleData(arr)
    })
    db.collection("UserRole").where('userId',"==",props.userID).where('companyId',"==",companyname)
    .get()
    .then((doc) =>{
     
    })
   // eslint-disable-next-line 
  }, [])
  const handlepartmanage = (e) =>{
    setPartmanage(e.target.value)
    db.collection('UserRole').where('companyId',"==",partmanage).where('userId',"==",Roll)
    .get()
    .then(doc=>{
      const comparevalue = doc.docs[0].data().Role
      if(comparevalue === "Admin") {
        navigate('/admindashboard')
        console.log("admin")
      } else if(comparevalue === "Accountant") {
        navigate('/accountantdashboard')
        console.log("accountant")
      } else if(comparevalue === "User") {
        navigate('/userdashboard')
        console.log("User")
      }
      return
    })
  }
  const adminShow = () => {
    if (Roll === 'Admin') {
      return (
        <Link to="/admindashboard">
          <img
            alt="logo"
            className="object-between w-100 h-6 mt-2 mb-1"
            src="../logo.png"
          />
        </Link>
      )
    } else if (Roll === 'Accountant') {
      return (
        <Link to="/accountantdashboard">
          <img
            alt="logo"
            className="object-between w-100 h-6 mt-2 mb-1"
            src="../logo.png"
          />
        </Link>
      )
    } else if (Roll === 'User') {
      return (
        <Link to="/userdashboard">
          <img
            alt="logo"
            className="object-between w-100 h-6 mt-2 mb-1"
            src="../logo.png"
          />
        </Link>
      )
    }
  }
  return (
    <div>
      <nav className="w-full mx-auto bg-white shadow">
        <div className="flex justify-between h-16">
          <div className="h-full flex items-center">
            <div className="ml-5 flex items-center">
              {adminShow()}
            </div>
          </div>
          <div className="flex justify-between">
          <span className="flex justify-center items-center textstylecolor font-medium text-lg mr-4">Join Other Company</span>
          <select
             value={partmanage}
             onChange={handlepartmanage} 
             className="appearance-none block text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200">
            {roleData.length > 0 ?(
            roleData.map((part,id) => (
                  <option key={id}>{part}</option>
                ))
                ) : (
                  <option>Select other join company</option>
                )
            }
          </select>
          </div>
          <div className="mr-5 h-full xl:flex items-center justify-end hidden">
            <div className="w-full h-full flex items-center">
              <div className="w-full h-full flex">
                <div className="w-32 h-full flex items-center justify-center cursor-pointer">
                  <span className="relative inline-block mr-3 ">
                    <svg
                      className="h-12 w-15 p-1  mr-3"
                      fill="none"
                      viewBox="0 0 22 22"
                      stroke="currentColor"
                      style={{ color: '#41CCAD' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span
                      className="absolute top-4 right-7 inline-flex items-center justify-center px-1 py-1 text-xs font-light leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                    >
                      99
                    </span>
                  </span>
                  <svg
                    onClick={props.sidebarShow}
                    aria-label="Main Menu"
                    aria-haspopup="true"
                    className="h-12 w-15 p-1 "
                    viewBox="0 0 22 22"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: '#41CCAD' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="visible xl:hidden flex items-center relative">
            <svg
              onClick={props.sidebarShow}
              aria-label="Main Menu"
              aria-haspopup="true"
              className="h-12 w-15 p-1"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              style={{ color: '#41CCAD' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
      </nav>
    </div>
  )
}

