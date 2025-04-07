"use client";

import { useRouter, usePathname } from "next/navigation";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}

export default function ClientPaginationControls({
    currentPage,
    totalPages,
}: PaginationControlsProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (newPage: number): void => {
        // Update URL without page reload
        router.push(`${pathname}?page=${newPage}`);
    };

    return (
        <div className="flex justify-center mt-6 space-x-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}
