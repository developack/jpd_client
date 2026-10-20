import type { Project } from "./project.types"
import type { PaginatedResponse } from "./api"


export type Content = {
    id: string,
    title: string,
    receipt_status_config__reference_config__name: string,
    has_media: boolean,
    created: string
}

export type AIContent = {
    id: string,
    language: string,
    title: string,
    summary?: string,
    details?: string,
    has_media?: boolean,
    status: boolean,
    created: string
}

export type ReferenceConfig = {
    name: string,
    url: string,
    activity_status: boolean
}

export type ReceiptContentDetail = {
    id: string,
    title: string,
    summary: string,
    details: string,
    thumbnail: string | null,
    receipt_status_config__reference_config__name: string,
    created: string,
    updated: string,
    ai_contents: AIContent[],
    related_keywords: string[] | [],
    project: Project,
    reference_config: ReferenceConfig,
}

export type ContentsTableProps = {
    contents: PaginatedResponse<Content> | null
    page: number
    onPageChange: React.Dispatch<React.SetStateAction<number>>
}

export type AIContentTableProps = {
    ai_contents: PaginatedResponse<AIContent> | null
    page: number
    onPageChange: React.Dispatch<React.SetStateAction<number>>
}

export type ContentDetailProps = {
    content: ReceiptContentDetail | null
    loading: boolean
}

export type ContentDetailHeaderProps = {
    content: ReceiptContentDetail | null
}

export type ContentDetailSidebarProps = {
    content: ReceiptContentDetail | null
    loading: boolean
}

export type AIContentDetailDialogProps = {
    open: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
    content: AIContent | null
}