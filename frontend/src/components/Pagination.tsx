import React from 'react';
import { PaginationProps } from '@/app/types/interfaces';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
}) => {
  return (
    <div className='flex justify-center mt-4 gap-3'>
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className='bg-blue-600 text-white w-32 px-4 py-2 rounded disabled:opacity-50'
      >
        Previous
      </button>
      <span className='self-center'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className='bg-blue-600 text-white w-32 px-4 py-2 rounded disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

