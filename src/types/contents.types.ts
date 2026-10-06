export type Content = {
    id: string,
    title: string,
    receipt_status_config__reference_config__name: string,
    has_media: boolean,
    created: string
}

export type ContentsTableProps = {
    contents: Content[]
}

export type AiContent = {
    id: string,
    language: string,
    title: string,
    summary?: string,
    details?: string,
    has_media?: boolean,
    status: boolean,
    created: string
}

export type Project = {
    id: string,
    name: string,
    activity_status: boolean,
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
    receipt_status_config__reference_config__name: string,
    created: string,
    updated: string,
    ai_contents: AiContent[],
    related_keywords: string[] | [],
    project: Project,
    reference_config: ReferenceConfig,
}

export type ContentDetailHeaderProps = {
    content: ReceiptContentDetail | null
}

export type ContentDetailSidebarProps = {
    content: ReceiptContentDetail | null
    loading: boolean
}

export type ContentDetailMainProps = {
    content: ReceiptContentDetail | null
    loading: boolean
}

export type AIContentTableProps = {
    ai_contents: AiContent[]
}