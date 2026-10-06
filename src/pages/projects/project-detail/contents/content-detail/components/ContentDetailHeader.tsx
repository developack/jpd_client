import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { MoveRight, FileText, EllipsisVertical, Calendar, Pencil, FolderClosed } from "lucide-react"
import type { ContentDetailHeaderProps } from "@/types/contents.types"
import { formatDate } from "@/utils/date"


export const ContentDetailHeader = ({ content }: ContentDetailHeaderProps) => {
    return (
        <header>
            <div className="flex items-center justify-between">
                <Button variant="ghost">
                    <Link to={`/projects/${content?.project.id}/contents`} className="flex items-center gap-1.5">
                        <MoveRight />
                        بازگشت به محتواها
                    </Link>
                </Button>
                <Button disabled>
                    <Pencil />
                    ویرایش محتوا
                </Button>
            </div>
            <div className="bg-surface rounded-lg mt-5 border p-5 grid grid-cols-[60px_auto] gap-5 items-start">
                <span className="bg-primary rounded-lg p-2.5 flex w-fit">
                    <FileText className="size-10 stroke-white" />
                </span>
                <div className="flex min-w-0 items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 flex-col gap-2">
                            <h1 className="text-xl font-bold truncate">{content?.title}</h1>
                            <p className="min-w-0 truncate text-sm text-text-secondary">{content?.summary}</p>
                        </div>
                        <div className="mt-5 flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-secondary">
                            <div className="flex min-w-0 max-w-full items-center gap-1">
                                <FolderClosed className="size-4 shrink-0" />
                                <p className="min-w-0 truncate">
                                    پروژه: <span>{content?.project.name}</span>
                                </p>
                            </div>

                            <div className="flex min-w-0 max-w-full items-center gap-1">
                                <Calendar className="size-4 shrink-0" />
                                <p className="min-w-0 truncate">
                                    تاریخ ایجاد: <span>{formatDate(content?.created)}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" size="icon" disabled className="shrink-0">
                        <EllipsisVertical className="size-4" />
                    </Button>
                </div>
            </div>
        </header>
    )
}