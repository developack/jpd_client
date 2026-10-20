import type { ApiErrorResponse } from "@/types/api"


export class ApiError extends Error {
    status: number
    data: ApiErrorResponse

    constructor(message: string, status: number, data: ApiErrorResponse) {
        super(message)
        this.name = "ApiError"
        this.status = status
        this.data = data
    }
}