export type ApiResponse<T> = {
    data: T
    message?: string
}

export type PaginationMeta = {
    count: number
    page_size: number
    next: string | null
    previous: string | null
}

export type PaginatedResponse<T> = {
    data: T[]
    meta: PaginationMeta
}

export type ApiErrorResponse = {
    error: {
        code: string
        message: string
        fields?: Record<string, string[]>
        non_field_errors?: string[]
    }
}

export type HandleApiErrorResponse = {
    fields: Record<string, string>
    general: string
}