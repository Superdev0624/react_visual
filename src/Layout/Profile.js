import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase-config';
import '../Components/assets/main.css'
export default function Profile() {
  // const [useinfo, setUseInfo ] = useState([]);
  // let Info = sessionStorage.getItem('Info');
  // db.collection("users").where("useremail", "==", Info)
  // .get()
  // .then(doc =>{
  //   console.log(doc.docs[0].data())
  //    setUseInfo(doc.docs[0].data()) 
  // })
  return (
    // <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden sm:max-w-xl">
    //   <div className="p-10 text-center">
    //     <div className="uppercase text-4xl text-indigo-500 font-semibold">sdfgh</div>
    //       <div className="flex flex-col">
    //         <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    //             <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
    //                 <div className="overflow-hidden shadow-md sm:rounded-lg">
    //                     <table className="min-w-full font-mono italic text-lg">
    //                         <thead className="bg-gray-100 dark:bg-gray-700 text-lg">
    //                             <tr>
    //                                 <th scope="col" className="py-3 px-6 font-bold tracking-wider text-blue-700 uppercase dark:text-gray-400">
    //                                     Property
    //                                 </th>
    //                                 <th scope="col" className="py-3 px-6 font-bold tracking-wider text-blue-700 uppercase dark:text-gray-400">
    //                                     Value
    //                                 </th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-600">
    //                                 <td className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                                     FirstName
    //                                 </td>
    //                                 <td className="py-4 px-6  text-gray-500 whitespace-nowrap dark:text-gray-400">
    //                                    asdfgh
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-gray-100 border-b dark:bg-gray-700 dark:border-gray-600">
    //                                 <td className="py-4 px-6   font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                                     LastName
    //                                 </td>
    //                                 <td className="py-4 px-6   text-gray-500 whitespace-nowrap dark:text-gray-400">
    //                                     sdfghj
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-600">
    //                                 <td className="py-4 px-6   font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                                     CompanyName
    //                                 </td>
    //                                 <td className="py-4 px-6   text-gray-500 whitespace-nowrap dark:text-gray-400">
    //                                   xcvgh
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-gray-100 border-b dark:bg-gray-700 dark:border-gray-600">
    //                                 <td className="py-4 px-6   font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                                     Number of Company
    //                                 </td>
    //                                 <td className="py-4 px-6   text-gray-500 whitespace-nowrap dark:text-gray-400">
    //                                    dfgh
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-600">
    //                                 <td className="py-4 px-6   font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                                     PhoneNumber
    //                                 </td>
    //                                 <td className="py-4 px-6   text-gray-500 whitespace-nowrap dark:text-gray-400">
    //                                dfghj
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-gray-100 border-b dark:bg-gray-700 dark:border-gray-600">
    //                                 <td className="py-4 px-6   font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                                     LastName
    //                                 </td>
    //                                 <td className="py-4 px-6   text-gray-500 whitespace-nowrap dark:text-gray-400">
    //                                    dfgh
    //                                 </td>
    //                             </tr>
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>
    //         </div>
    //       </div>
    //     </div>
    // </div>
    <h1>sdfsdf</h1>
  )
}