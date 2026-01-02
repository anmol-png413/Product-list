import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg ${
            canGoPrevious
              ? 'text-gray-700 bg-white hover:bg-gray-50'
              : 'text-gray-400 bg-gray-50 cursor-not-allowed'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg ${
            canGoNext
              ? 'text-gray-700 bg-white hover:bg-gray-50'
              : 'text-gray-400 bg-gray-50 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!canGoPrevious}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 text-sm font-medium ${
                canGoPrevious
                  ? 'text-gray-700 bg-white hover:bg-gray-50'
                  : 'text-gray-400 bg-gray-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-1">Previous</span>
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!canGoNext}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 text-sm font-medium ${
                canGoNext
                  ? 'text-gray-700 bg-white hover:bg-gray-50'
                  : 'text-gray-400 bg-gray-50 cursor-not-allowed'
              }`}
            >
              <span className="mr-1">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
