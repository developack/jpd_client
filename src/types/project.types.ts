import type { PaginatedResponse } from "./api"


export type Project = {
    id: string,
    name: string,
    activity_status: boolean,
    created: string,
}

export type NewProjectErrors = {
    name?: string
}

export type ProjectHeaderProps = {
    project: Project | null
}

export type ProjectsTableProps = {
    projects: PaginatedResponse<Project> | null
    page: number,
    onPageChange: React.Dispatch<React.SetStateAction<number>>
}

export type NewProjectDialogProps = {
    onProjectCreated: React.Dispatch<React.SetStateAction<Project | null>>,
    onDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type ProjectDetailPageTabs = "overview" | "keywords" | "receipts" | "submissions" | "contents"