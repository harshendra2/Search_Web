import React from "react";

function Pagination({handlePageChange,currentPage,totalPages}){
    return(
        <div className="flex justify-between px-6 py-4 bg-white border-t border-gray-200">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm font-medium leading-5 text-gray-500 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:text-gray-700 hover:bg-gray-100'}`}
          >
            Previous
          </button>
          <div className="text-sm leading-5 text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm font-medium leading-5 text-gray-500 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:text-gray-700 hover:bg-gray-100'}`}
          >
            Next
          </button>
          </div>
    )
}

export default Pagination