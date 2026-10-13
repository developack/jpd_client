import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FolderOpen, Calendar, EllipsisVertical, Pencil, MoveRight } from "lucide-react"


export const ProjectHeaderSkeleton = () => {
    return (
        <header>
            <div className="flex items-center justify-between">
                <Button variant="ghost">
                    <Link to="/projects" className="flex items-center gap-1.5">
                        <MoveRight />
                        بازگشت به پروژه‌ها
                    </Link>
                </Button>
                <Button disabled>
                    <Pencil />
                    ویرایش پروژه
                </Button>
            </div>
            <div className="bg-surface rounded-lg mt-5 border p-5 grid grid-cols-[60px_auto] gap-5 items-start">
                <span className="bg-primary rounded-lg p-2.5 flex w-fit">
                    <FolderOpen className="size-10 stroke-white" />
                </span>
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <Skeleton className="w-50 h-7" />
                                <Skeleton className="w-10 h-5 rounded-full" />
                            </h1>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-text-secondary mt-2">
                            <Calendar className="size-4" />
                            <p className="flex items-center gap-2">تاریخ ایجاد: <Skeleton className="w-18 h-5" /></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <EllipsisVertical className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}