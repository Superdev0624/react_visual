import React, { useEffect, useState } from 'react'
import '../Components/assets/main.css'
import { Link } from 'react-router-dom'
import { db } from '../firebase-config'
export default function Users() {
  // const[usersdata, setUsersData] = useState([]);
  // useEffect(() => {
  //   db.collection("users")
  //     .get()
  //     .then((doc) =>{
  //       const users = doc.docs.map((word) => word.data())
  //       setUsersData(users);
  //     })
  // }, [])
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1 mb-2 mt-2">
            <h2 className="text-2xl text-gray-500 font-bold ml-5">All Users</h2>
            <input type="text" name="name" placeholder="Search..." className="w-1/3 py-2 border-b-2 border-blue-600 outline-none focus:border-yellow-400" />
            <div>
              <button type="button" className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                All
              </button>

              <button type="button" className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                  Admin
                </button>

              <button type="button" className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                  User
              </button>
            </div>

            <Link to='/createuser' className="uppercase mr-3 text-sm bg-green-500 text-center hover:bg-green-700 text-white py-3 px-2 rounded focus:outline-none focus:shadow-outline">
              + Add User
            </Link>
          </div>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg px-5 py-5">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      phone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Company Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs flex justify-center font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* {usersdata.length > 0 ? (
                     usersdata.map((user) =>( */}
                      <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {/* {user.firstname}{user.lastname} */}
                            </div>
                            <div className="text-sm text-gray-500">
                              {/* {user.useremail} */}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* {user.department} */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* {user.phone} */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* {user.companyname} */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* {user.roll === true ? "Admin":"User"} */}
                        {/* {user.Role} */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex justify-end">
                        <Link to='/edituser' className="uppercase mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</Link>
                        <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                      </td>
                    </tr>
                    {/* ))
                  ) :(
                    <tr>
                      <td>No Users</td>
                    </tr>
                  )
                  } */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}