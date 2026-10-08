import { Skeleton } from "@/components/ui/skeleton"
import { Image, Images } from "lucide-react"
import type { ContentDetailSidebarProps } from "@/types/contents.types"
import { BASE_API_URL } from "@/config/api"


export const SidebarThumbnailSection = ({ content, loading }: ContentDetailSidebarProps) => {

    const renderThumbnail = () => {
        if (loading) {
            return <Skeleton className="h-[180px] w-full bg-amber-300 rounded-lg" />
        }

        if (content?.thumbnail) {
            return <img className="rounded-lg h-[180px] object-cover" src={`${BASE_API_URL}${content?.thumbnail}`} alt={`تصویر ${content?.title}`} />
        }

        return (
            <div className="flex items-start gap-2">
                <span className="bg-primary rounded-lg p-2 flex w-fit">
                    <Image className="size-8=7 stroke-white" />
                </span>
                <div>
                    <h5 className="font-medium text-sm">بدون تصویر شاخص</h5>
                    <span className="text-xs text-text-secondary">تصویر شاخصی برای این پست ثبت نشده است.</span>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-surface rounded-lg border">
            <div className="border-b p-4 flex items-center gap-2 font-bold text-sm">
                <Images className="size-5" />
                تصویر شاخص
            </div>
            <div className="flex items-start justify-between p-4">
                <figure>
                    {renderThumbnail()}
                </figure>
            </div>
        </div>
    )
}