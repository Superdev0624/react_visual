import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex text-gray-700">
        <p className='text-sm text-gray-700'>
          Showing
          <span className='font-medium'>
            {" "}
            {(currentPage * postsPerPage - 5) + 1}{" "}
          </span>
          to
          <span className='font-medium'> {currentPage * postsPerPage} </span>
          of
          <span className='font-medium'> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className='block'>
        <ul className='flex pl-0 rounded list-none flex-wrap'>
          <li className={"bg-blue border-red-300 text-red-500 hover:bg-blue-200 mr-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium "+ (currentPage === 1 ? 'disabled' : '')}>
              <a onClick={() => paginate(1)}>First</a>
          </li>
          <li className="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full bg-teal-600 text-white">
            {pageNumbers.map((number) => (
              <a onClick={() => {paginate(number);}} 
                className={
                  currentPage === number
                    ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                }
              >
                {number}
              </a>
            ))}
          </li>
          <li className={"bg-blue border-red-300 text-red-500 hover:bg-blue-200 ml-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium "+ (currentPage === 1 ? 'disabled' : '')}>
              <a onClick={() => paginate(totalPosts)}>Last</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}