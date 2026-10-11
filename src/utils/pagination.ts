import type { PaginationEntry } from "@/types/common.types";


export const getPaginationItems = (page: number, totalPages: number): PaginationEntry[] => {
    if (totalPages <= 7) {
        return Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );
    }

    if (page <= 4) {
        return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (page >= totalPages - 3) {
        return [
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "...",
        page - 1,
        page,
        page + 1,
        "...",
        totalPages,
    ];
}