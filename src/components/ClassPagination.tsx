import {ChevronLeft, ChevronRight} from "lucide-react";
import {Link} from "react-router";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function ClassPagination({currentPage, totalPages, onPageChange}: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="h-5 w-5"/>
            </button>

            <div className="flex gap-1">
                {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                    <Link
                        to={`/classes/${page}`}
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                                ? "bg-purple-500 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                    >
                        {page}
                    </Link>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight className="h-5 w-5"/>
            </button>
        </div>
    );
}