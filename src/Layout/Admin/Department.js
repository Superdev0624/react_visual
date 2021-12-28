import React, { useEffect, useState } from 'react'
import '../../Components/assets/main.css'
import { Link, useNavigate, useParams} from 'react-router-dom'
import { db } from '../../firebase-config'
import { toast } from 'react-toastify';

export default function Department() {
  const [departmentdata, setDepartmentData] = useState('');
  const [num, setNum] = useState();
  let navigate = useNavigate();
  const editID = useParams().id
  useEffect(() =>{
    db.collection("departments")
    .get()
    .then(async (doc)=>{
      let departments = doc.docs.map((part) =>{
        return{...part.data(), id: part.id}
      })
      for (let i = 0; i<departments.length; i++){
        const partdata = departments[i]
        const doc = await db.collection("users").where("department", "==", partdata.departmentname)
        .get();
        departments[i].usenum = doc.docs.length
      }
      setDepartmentData(departments)
    })
  },[])
  function onEdit(event) {
    const departmentId = departmentdata[event].id
    navigate(`/editdepartment/${departmentId}`)
  }

  function onDelete(event) {
    if (window.confirm('Are you sure to delete this department?')) {
      db.collection("departments")
      .doc(event)
      .delete().then(() => {
        toast.info("delete successfully!")
        window.location.reload();
      }).catch((error) => {
        console.log("delete", error)
      })
    }
  }
  return(
    <div className="min-w-screen min-h-screen flex bg-indigo-50 justify-center px-5 py-5">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="flex justify-between ">
          <h2 className="text-5xl text-gray-500 font-medium italic ">Department Data</h2>
          <Link
            to='/createdepartment'
            className="uppercase text-xl bg-green-500 flex justify-between hover:bg-green-700 text-white py-3 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            + Add Department
          </Link>
        </div>
        <div className="flex flex-col mt-8">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full shadow-xl">
                <thead className="bg-gray-500">
                  <tr>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      No</th>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Department name</th>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Users</th>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Department manager</th>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      About department</th>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Edit</th>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Delete</th>
                  </tr>
                </thead>
                <tbody>
                {departmentdata.length > 0 ? (
                  departmentdata.map((part, id) => (
                  <tr key={id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center text-xl">
                      {id + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                      <div className="text-xl font-medium text-center text-gray-900">{part.departmentname}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-xl leading-5 text-gray-500 text-center">{part.usenum}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-xl leading-5 text-gray-500 text-center">{part.departmentmanager}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-xl leading-5 text-gray-500 text-center">{part.description}</div>
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
                          onClick={() => onDelete(part.id)}
                        />
                      </svg>
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
    </div>
  )
}