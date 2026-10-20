import type { PaginatedResponse } from "./api"


export type Receipt = {
    id: string,
    name: string, 
    url: string,
    activity_status: boolean,
    created: string
}

export type ReceiptsTableProps = {
    page: number,
    onPageChange: React.Dispatch<React.SetStateAction<number>>
    receipts: PaginatedResponse<Receipt> | null
}