import { SERVER_BASE_URL } from "@/config/api"
import { Image, Images } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { ContentDetailSidebarProps } from "@/types/contents.types"


export const SidebarThumbnailSection = ({ content, loading }: ContentDetailSidebarProps) => {

    const renderThumbnail = () => {
        if (loading) {
            return <Skeleton className="h-45 w-full rounded-lg" />
        }

        if (content?.thumbnail) {
            return <img className="rounded-lg w-85 h-45 object-cover" src={`${SERVER_BASE_URL}${content?.thumbnail}`} alt={`تصویر ${content?.title}`} />
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
            <div className={`flex items-start justify-between p-4 ${content?.thumbnail && 'justify-center'}`}>
                <figure>
                    {renderThumbnail()}
                </figure>
            </div>
        </div>
    )
}