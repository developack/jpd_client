import { Badge } from "@/components/ui/badge"
import { CircleDot, Calendar, Image } from "lucide-react"
import { ExpandableText } from "@/components/ui/expandable-text"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { AIContentDetailDialogProps } from "@/types/contents.types"
import { formatDate } from "@/utils/date"


export const AIContentDetailDialog = ({ open, onOpenChange, content }: AIContentDetailDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl" data-lang="rtl" className="w-[calc(100%-2rem)] !max-w-4xl">
                <DialogHeader>
                    <DialogTitle>جزئیات محتوا</DialogTitle>
                </DialogHeader>
                <div className="my-1">
                    <h2 className="font-bold text-lg">{content?.title}</h2>
                    <div className="text-sm text-text-secondary flex items-center gap-5 my-5 flex-wrap">
                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                تاریخ انتشار:
                            </div>
                            {formatDate(content?.created)}
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-1">
                                <Image className="size-4" />
                                رسانه:
                            </div>
                            <Badge className="select-none" variant={content?.has_media ? 'active' : 'destructive'}>
                                {content?.has_media ? 'دارد' : 'ندارد'}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-1">
                                <CircleDot className="size-4" />
                                وضعیت:
                            </div>
                            <Badge className="select-none" variant={content?.status ? 'active' : 'destructive'}>
                                {content?.status ? 'فعال' : 'غیرفعال'}
                            </Badge>
                        </div>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto pt-1">
                        <div className="flex flex-col gap-5 ml-2.5 leading-7 text-justify">
                            <div className="relative">
                                <span className="text-sm absolute bg-surface px-2.5 top-[-8px] right-[10px] z-[1]">خلاصه</span>
                                <p className="border p-3 rounded-lg text-text-secondary">{content?.summary}</p>
                            </div>
                            <div className="relative">
                                <span className="text-sm absolute bg-surface px-2.5 top-[-8px] right-[10px] z-[1]">محتوای اصلی</span>
                                <p className="border p-3 rounded-lg text-text-secondary">{content?.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}