import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FolderClosed, FolderOpen, ChevronLeft, Tag, CircleDot, Clock, Layers, MapPinSearch, CircleCheck, Image, Images } from "lucide-react"
import type { ContentDetailSidebarProps } from "@/types/contents.types"
import { BASE_API_URL } from "@/config/api"
import { formatDate } from "@/utils/date"


export const ContentDetailSidebar = ({ content, loading }: ContentDetailSidebarProps) => {

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
        <aside className="sticky top-[81px]">
            <div className="flex flex-col gap-5">
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

                <div className="bg-surface rounded-lg border">
                    <div className="border-b p-4 flex items-center gap-2 font-bold text-sm">
                        <Tag className="size-5" />
                        کلیدواژه‌های مرتبط
                    </div>
                    <div className="flex items-start justify-between p-4">
                        <div className="flex flex-wrap gap-3 max-h-[150px] overflow-y-auto">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <Skeleton key={index} className="h-5 w-[65px]" />
                                ))
                            ) : (
                                content?.related_keywords.map((keyword) => (
                                    <Badge variant="secondary">{keyword}</Badge>
                                ))
                            )}
                        </div>
                    </div>
                </div>

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
            </div>
        </aside>
    )
}