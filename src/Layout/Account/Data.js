import React from 'react'
import '../../Components/assets/main.css'
export default function AccountantDashboard() {
  return (
    <div>
    <div className="min-w-screen flex justify-center px-5 py-5">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-6">
        <div className="flex justify-between">
          <h2 className="text-5xl themeusercolor font-medium italic ">Data</h2>
        </div>
        <div className="flex flex-col mt-2">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-6 lg:px-6">
            <div className="inline-block min-w-full overflow-hidden align-middle border border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full shadow-xl">
                <thead className="bg-gray-500">
                  <tr>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Supplier Name</th>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Department/Sub-Department</th>
                    <th
                      className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Expense Type(OPEX/CAPEX)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100 border-b border-gray-200 py-10">
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-xl leading-5 text-gray-500 text-center">sdfwef</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-xl leading-5 text-gray-500 text-center">wefwe</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-xl leading-5 text-gray-500 text-center">werwr</div>
                    </td>
                  </tr>
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


