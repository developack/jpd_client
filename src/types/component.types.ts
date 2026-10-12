import type { LucideIcon } from "lucide-react"


export type TagInputProps = {
    value: string[],
    onChange: (tags: string[]) => void,
    placeholder: string
}

export type ExpandableTextProps = {
    className?: string,
    text: string | undefined
}

export type DataTableEmptyProps = {
    title: string,
    description: string,
    icon: LucideIcon
}

export type DataTableErrorProps = {
    onRetry: () => void
}

export type Pagination = {
    page_size: number
    count: number,
    next: string | null,
    previous: string | null,
}

export type PaginationData = {
    pagination: Pagination
    page: number,
    onPageChange: React.Dispatch<React.SetStateAction<number>>
}