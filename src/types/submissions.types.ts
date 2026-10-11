import type { PaginatedResponse } from "./common.types"


export type Submission = {
    id: string,
    name: string,
    url: string,
    activity_status: boolean
    created: string
}

export type SubmissionsTableProps = {
    submissions: PaginatedResponse<Submission> | null
    page: number
    onPageChange: React.Dispatch<React.SetStateAction<number>>
}