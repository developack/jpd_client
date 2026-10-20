export type Language = {
    id: string,
    name: string
}

// export type PaginatedResponse<T> = {
//     page_size: number,
//     count: number,
//     next: string | null,
//     previous: string | null,
//     results: T[]
// }

export type PaginationEntry = number | "..."