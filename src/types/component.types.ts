import type { LucideIcon } from "lucide-react"


export type DataTableEmptyProps = {
    title: string,
    description: string,
    icon: LucideIcon
}

export type DataTableErrorProps = {
    onRetry: () => void
}

export type TagInputProps = {
    value: string[],
    onChange: (tags: string[]) => void,
    placeholder: string
}

export type ExpandableTextProps = {
    className?: string,
    text: string | undefined
}