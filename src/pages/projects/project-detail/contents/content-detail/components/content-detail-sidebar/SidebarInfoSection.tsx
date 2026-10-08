import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CircleDot, Clock, Layers, MapPinSearch, CircleCheck } from "lucide-react"
import type { ContentDetailSidebarProps } from "@/types/contents.types"
import { formatDate } from "@/utils/date"


export const SidebarInfoSection = ({ content, loading }: ContentDetailSidebarProps) => {
    return (
        <div className="bg-surface rounded-lg border">
            <div className="border-b p-4 flex items-center justify-between font-bold text-sm">
                <div className="flex items-center gap-2">
                    <CircleDot className="size-5" />
                    وضعیت و اطلاعات انتشار
                </div>
                <Badge variant="active">منتشر شده</Badge>
            </div>
            <div className="flex flex-col gap-5 p-4">
                <div className="flex items-start gap-2">
                    <Clock className="size-5" />
                    <div className="flex flex-col gap-1 text-sm text-text-secondary">
                        انتشار در تاریخ
                        {loading ? <Skeleton className="w-[85px] h-4" /> : (
                            <span className="text-xs text-text">{formatDate(content?.created)}</span>
                        )}
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Layers className="size-5" />
                    <div className="flex flex-col gap-1 text-sm text-text-secondary">
                        منتشر شده در
                        {loading ? <Skeleton className="w-[85px] h-4" /> : (
                            <span className="text-xs text-text">{content?.reference_config.name}</span>
                        )}
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <MapPinSearch className="size-5" />
                    <div className="flex flex-col gap-1 text-sm text-text-secondary">
                        آدرس منبع
                        {loading ? <Skeleton className="w-[150px] h-5" /> : (
                            content?.reference_config.url && <Link target="_blank" to={content?.reference_config.url}>
                                <Badge variant="secondary">{content?.reference_config.url}</Badge>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <CircleCheck className="size-5" />
                    <div className="flex flex-col gap-1 text-sm text-text-secondary">
                        وضعیت منبع
                        {loading ? <Skeleton className="w-[70px] h-5" /> : (
                            <Badge variant={content?.reference_config?.activity_status ? 'active' : 'destructive'} className="select-none">
                                <span className={`rounded-full w-[5px] h-[5px] ${content?.reference_config?.activity_status ? 'bg-success' : 'bg-destructive'}`}></span>
                                {content?.reference_config?.activity_status ? 'فعال' : 'غیرفعال'}
                            </Badge>
                        )}
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Clock className="size-5" />
                    <div className="flex flex-col gap-1 text-sm text-text-secondary">
                        آخرین بروزرسانی
                        {loading ? <Skeleton className="w-[85px] h-4" /> : (
                            <span className="text-xs text-text">{formatDate(content?.updated)}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}