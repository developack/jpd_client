import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FolderClosed, FolderOpen, ChevronLeft } from "lucide-react"
import type { ContentDetailSidebarProps } from "@/types/contents.types"
import { formatDate } from "@/utils/date"


export const SidebarProjectSection = ({ content, loading }: ContentDetailSidebarProps) => {
    return (
        <div className="bg-surface rounded-lg border">
            <div className="border-b p-4 flex items-center gap-2 font-bold text-sm">
                <FolderClosed className="size-5" />
                پروژه
            </div>
            <div className="flex items-start justify-between p-4">
                <div className="flex items-center gap-2">
                    <span className="bg-primary rounded-lg p-2 flex w-fit">
                        <FolderOpen className="size-8=7 stroke-white" />
                    </span>
                    <div className="flex flex-col gap-1">
                        {loading ? (<Skeleton className="w-[100px] h-5" />) : (
                            <h5 className="font-semibold text-sm">{content?.project.name}</h5>
                        )}
                        <p className="text-text-secondary text-xs flex items-center gap-1.5">تاریخ ایجاد: {loading ? (
                            <Skeleton className="w-[50px] h-4" />
                        ) : (
                            <span>{formatDate(content?.created)}</span>
                        )}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={content?.project?.activity_status ? 'active' : 'destructive'} className="select-none">
                        <span className={`rounded-full w-[5px] h-[5px] ${content?.project?.activity_status ? 'bg-success' : 'bg-destructive'}`}></span>
                        {content?.project?.activity_status ? 'فعال' : 'غیرفعال'}
                    </Badge>
                    <Button variant="secondary" size="icon-xs">
                        <Link to={`/projects/${content?.project.id}/`}>
                            <ChevronLeft />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}