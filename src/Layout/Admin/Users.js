import React, { useEffect, useState } from 'react'
import '../../Components/assets/main.css'
import { Link, useNavigate} from 'react-router-dom'
import { db } from '../../firebase-config'
import { toast } from 'react-toastify';
function Users() {
  const [usersdata, setUsersData] = useState('');
  const authID = sessionStorage.getItem('UID')
  useEffect(() =>{
    db.collection("users")
    .get()
    .then(doc =>{
      const users = doc.docs;
      const result = users.filter(user => user.id === authID)[0]
      const finaldata = result.data().companyname
      db.collection("users").where("companyname","==", finaldata)
      .get()
      .then((doc) =>{
        const users = doc.docs.map((word) => {
          return{...word.data(), id:word.id}
        })
        setUsersData(users)
      })
    })
  },[authID])
  let navigate = useNavigate();
  function onDelete(event) {
    if(window.confirm('Are you sure to delete this user?')) {
      if(authID !== event){
        db.collection("users")
        .doc(event)
        .delete().then(() => {
          toast.info("delete successfully!")
          window.location.reload();
        }).catch((error) => {
          console.log("delete", error)
        })
      }else {
        toast.error("you can't delete this user, becasue same user!")
      }
    }
  }
  function onEdit(event) {
    const userId= usersdata[event].id
    db.collection("users")
    .doc(userId)
    .get()
    .then((res) =>{
      navigate(`/edituser/${userId}`)
    })
  }
  
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="flex lg:justify-between mb-2 mt-2">
              <h2 className="text-3xl text-gray-500 font-medoum ml-10 italic ">All Users</h2>
              <input 
                type="text" 
                className="w-1/3 py-2 border-b-2 border-blue-600 outline-none focus:border-yellow-400" 
                placeholder="Search..."
              />
              <Link 
                to='/createuser' 
                className="uppercase mr-3 text-sm bg-green-500 text-center hover:bg-green-700 text-white py-3 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                + Add User
              </Link>
            </div>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg px-2 py-2 mx-3 my-3 bg-indigo-50">
              <table className="min-w-full divide-y divide-gray-200 border ">
                <thead className="bg-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-center text-gray-500 uppercase">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-center text-gray-500 uppercase">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-center text-gray-500 uppercase">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-center text-gray-500 uppercase">
                      phone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-center text-gray-500 uppercase">
                      Company Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-center text-gray-500 uppercase">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-center text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usersdata.length > 0 ? (
                     usersdata.map((user, id) =>(
                      <tr key ={id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {id+1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-center text-gray-900">
                              {user.firstname}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.useremail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {user.companyname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                        {user.Role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex justify-end">
                        <button type="button" className="text-sm bg-blue-500 mr-5 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick ={() =>onEdit(id)}>
                          <span className="uppercase">Edit</span>
                        </button>
                        <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => onDelete(user.id)}>
                          <span className="uppercase">Delete</span>
                        </button>
                      </td>
                    </tr>
                     ))
                  ) :(
                    <tr>
                      <td>No Users</td>
                    </tr>
                  )
                  } 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Users