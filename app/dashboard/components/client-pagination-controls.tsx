"use client";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    feedType: string;
}

export default function ClientPaginationControls({
    currentPage,
    totalPages,
    feedType,
}: PaginationControlsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Create a new URLSearchParams instance to preserve other parameters
    const createQueryString = (page: number, feedType: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        params.set("feedType", feedType);
        return params.toString();
    };

    const handlePageChange = (newPage: number): void => {
        // Update URL without page reload
        router.push(`${pathname}?${createQueryString(newPage, feedType)}`);
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
