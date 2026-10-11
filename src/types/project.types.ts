import type { PaginatedResponse } from "./common.types"


export type Project = {
    id: string,
    name: string,
    activity_status: boolean,
    created: string,
}

export type NewProjectErrors = {
    name?: string
}

export type NewProjectDialogProps = {
    onProjectCreated: (project: Project) => void,
    onDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type ProjectsTableProps = {
    projects: PaginatedResponse<Project> | null
    page: number,
    onPageChange: React.Dispatch<React.SetStateAction<number>>
}

export type ProjectHeaderProps = {
    project: Project | null
}

export type ProjectDetailPageTabs = "overview" | "keywords" | "receipts" | "submissions" | "contents"