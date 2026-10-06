import { Link } from "react-router"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { FileText, FolderClosed, Calendar, EllipsisVertical, Pencil, MoveRight } from "lucide-react"


export const ContentDetailHeaderSkeleton = () => {
    return (
        <header>
            <div className="flex items-center justify-between">
                <Button variant="ghost">
                    <Link to="/projects" className="flex items-center gap-1.5">
                        <MoveRight />
                        بازگشت به محتواها
                    </Link>
                </Button>
                <Button>
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
                            <h1 className="text-xl font-bold"><Skeleton className="h-[26px] w-[70%]" /></h1>
                            <Skeleton className="h-[18px] w-full max-w-[60rem]" />
                        </div>
                        <div className="mt-5 flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-secondary">
                            <div className="flex min-w-0 items-center gap-1">
                                <FolderClosed className="size-4 shrink-0" />
                                <p className="flex items-center gap-2">پروژه:<Skeleton className="h-5 w-[72px]" /></p>
                            </div>
                            <div className="flex min-w-0 items-center gap-1">
                                <Calendar className="size-4 shrink-0" />
                                <p className="flex items-center gap-2">تاریخ ایجاد:<Skeleton className="h-5 w-[72px]" /></p>
                            </div>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <Button variant="outline" size="icon">
                            <EllipsisVertical className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}