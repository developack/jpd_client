import type { PaginatedResponse } from "./common.types"


export type Keyword = {
    id: string,
    project: string,
    language: string,
    keyword_type: string,
    name: string,
    words: {
        list?: string[]
    },
    created: string,
}

export type KeywordType = {
    id: string,
    name: string
}

export type NewProjectErrors = {
    name?: string
}

export type NewKeywordDialogProps = {
    open: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
    onKeywordCreated: React.Dispatch<React.SetStateAction<Keyword | null>>,
}

export type KeywordDetailDialogProps = {
    open: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
    keyword: Keyword | null
}

export type KeywordsTableProps = {
    keywords: PaginatedResponse<Keyword> | null
    page: number
    onPageChange: React.Dispatch<React.SetStateAction<number>>
}