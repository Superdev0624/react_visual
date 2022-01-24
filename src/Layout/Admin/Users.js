import React, { useEffect, useState } from 'react'
import '../../Components/assets/main.css'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase-config'
import 'firebase/auth';
import 'firebase/firestore';
import { toast } from 'react-toastify';
// import Pagination from '../../Components/pages/Pagination'
function Users() {
  const [usersdata, setUsersData] = useState([]);
  const authID = sessionStorage.getItem('UID')
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] =('5');
  useEffect(() => {
    db.collection("UserRole").where("userId", "==", authID)
      .get()
      .then(doc => {
        const users = doc.docs;
        const companyRole = users[0].data().companyId
        db.collection("UserRole").where("companyId", "==", companyRole)
          .get()
          .then(async doc => {
            var arr = [];
            for (let i = 0; i < doc.docs.length; i++) {
              var userId = doc.docs[i].data().userId
              db.collection("UserRole").where("userId", "==", userId)
                .get()
                .then(async doc => {
                  var roledata = doc.docs[0].data().Role
                  var partdata = doc.docs[0].data().Partname
                  var mainId = doc.docs[0].data().userId
                  const doc1 = await db.collection("Users")
                    .doc(mainId)
                    .get();
                  var users = doc1.data()
                  arr.push({
                    ...users,
                    role: roledata,
                    part: partdata
                  });
                  var alldatas = arr.map((word) => {
                    return { ...word }
                  })
                  setUsersData(alldatas)
                })
            }
          })
      })
    // eslint-disable-next-line
  }, [])
  let navigate = useNavigate();
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = usersdata.slice(indexOfFirstPost, indexOfLastPost);

  // const paginateFront = () => setCurrentPage(currentPage + 1);
  // const paginateBack = () => setCurrentPage(currentPage - 1);
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  function onDelete(event) {
    console.log('delete')
    if (window.confirm('Are you sure you want to delete this user?')) {
      db.collection("UserRole").where("userId", "==", authID)
        .get()
        .then(doc => {
          const adminrole = doc.docs[0].data().Role
          db.collection("Users").where("useremail", "==", event)
            .get()
            .then(doc => {
              const conditionrole = doc.docs[0].id
              db.collection("UserRole").where("userId", "==", conditionrole)
                .get()
                .then(doc => {
                  const removerole = doc.docs[0].data().Role
                  if (adminrole === removerole) {
                    toast.warn("You can't delete this user data, because same user.")
                    return
                  } else {
                    db.collection("UserRole").where("userId", "==", conditionrole)
                      .get()
                      .then(doc => {
                        const removeId = doc.docs[0].id
                        db.collection("UserRole")
                          .doc(removeId)
                          // .get()
                          .delete()
                          .then(() => {
                            window.location.reload();
                            db.collection("Users").where("useremail", "==", event)
                              .get()
                              .then(doc => {
                                const id = doc.docs[0].id
                                db.collection("Users")
                                  .doc(id)
                                  .delete()
                                toast.info("User Deleted")
                              })
                          })
                      })
                  }
                })
            })
        })
    }
  }
  function onEdit(event) {
    console.log("Edit")
    db.collection("Users").where("useremail", "==", event)
      .get()
      .then(doc => {
        const editroleId = doc.docs[0].id
        navigate(`/edituser/${editroleId}`)
      })

  }
  return (
    <div>
      <div className="min-w-screen flex justify-center px-5 py-5">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-6">
          <div className="flex justify-between">
            <p className="text-5xl themeusercolor font-medium italic ">Users</p>
            <Link
              to='/createuser'
              className="uppercase text-xl usecolor flex justify-between hover:bg-green-700 text-white py-3 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              + add User
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
                        phone</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Role</th>
                      <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Department</th>
                      <th
                        className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersdata.length > 0 ? (
                      usersdata.map((part, id) => (

                        <tr key={id} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{id + 1}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{part.firstname}{""}{part.lastname}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{part.useremail}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{part.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{part.role}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xl leading-5 text-gray-500 text-center">{part.part}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 textstylecolor hover:text-blue-600 cursor-pointer" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                onClick={() => onEdit(part.useremail)}
                              />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 deletestylecolor hover:text-red-500 cursor-pointer" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                onClick={() => onDelete(part.useremail)}
                              />
                            </svg>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td>No Data</td></tr>
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