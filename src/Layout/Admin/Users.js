import React, { useEffect, useState } from 'react'
import '../../Components/assets/main.css'
import { Link, useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase-config'
import { toast } from 'react-toastify';
import Pagination from '../../Components/pages/Pagination'
function Users() {
  const [usersdata, setUsersData] = useState('');
  const authID = sessionStorage.getItem('UID')
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  useEffect(() => {
    db.collection("users")
      .get()
      .then(doc => {
        const users = doc.docs;
        const result = users.filter(user => user.id === authID)[0]
        const finaldata = result.data().companyname
        db.collection("users").where("companyname", "==", finaldata)
          .get()
          .then((doc) => {
            const users = doc.docs.map((word) => {
              return { ...word.data(), id: word.id }
            })
            setUsersData(users)
          })
      })
  }, [])
  let navigate = useNavigate();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = usersdata.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  function onDelete(event) {
    if (window.confirm('Are you sure to delete this user?')) {
      if (authID !== event) {
        db.collection("users")
          .doc(event)
          .delete().then(() => {
            toast.info("delete successfully!")
            window.location.reload();
          }).catch((error) => {
            console.log("delete", error)
          })
      } else {
        toast.error("you can't delete this user, becasue same user!")
      }
    }
  }
  function onEdit(event) {
    const userId = usersdata[event].id
    navigate(`/edituser/${userId}`)
  }
  return (
    <div>
      <div className="min-w-screen min-h-screen flex justify-center px-5 py-5">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-6">
          <div className="flex justify-between w-full">
            <p className="ml-3 font-medium text-5xl text-blue-500">Users Table</p>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={usersdata.length}
              paginateBack={paginateBack}
              paginateFront={paginateFront}
              paginate={paginate}
              currentPage={currentPage}
            />
            <Link
              to='/createuser'
              className="uppercase text-xl bg-green-500 hover:bg-green-700 text-white py-3 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              <svg className="h-8 w-8 justify-center items-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </Link>
          </div>
          <div className="flex flex-col mt-2">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-6 lg:px-6">
              <div className="inline-block min-w-full overflow-hidden align-middle border border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full shadow-xl">
                  <thead className="bg-gray-500">
                    <tr>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        No</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Name</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Email</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Department</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        phone</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Companyname</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Role</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Edit</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.length > 0 ? (
                      currentPosts.map((user, id) => (
                        <tr key={id} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{id + 1}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{user.firstname}{" "}{user.lastname}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{user.useremail}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{user.department}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{user.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{user.companyname}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{user.role}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-400 hover:text-blue-600 cursor-pointer" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                onClick={() => onEdit(id)}
                              />
                            </svg>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-400 hover:text-red-600 cursor-pointer" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                onClick={() => onDelete(user.id)}
                              />
                            </svg>
                          </td>
                        </tr>
                      ))
                    ) : (
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
      </div>
    </div>
  )
  }

  export default Users