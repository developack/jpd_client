import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, SquareArrowOutUpRight } from "lucide-react"
import { ExpandableText } from "@/components/ui/expandable-text"
import { ContentDetailMainSkeleton } from "./ContentDetailMainSkeleton"
import type { ContentDetailProps } from "@/types/contents.types"


export const ReceiptContentSection = ({ content, loading }: ContentDetailProps) => {
    return (
        <div className="bg-surface rounded-lg border">
            <div className="flex items-center justify-between p-5 border-b gap-1.5">
                <div className="flex items-start sm:items-center gap-2">
                    <span className="rounded-full p-2 border border-primary hidden sm:flex">
                        <Bot className="shrink-0 stroke-primary stroke-2" />
                    </span>
                    <div className="flex flex-col gap-1.5">
                        <h4 className="font-semibold flex items-center gap-2">
                            <span>محتوای خزش‌شده</span>
                            <Badge className="hidden lg:flex">نسخه اصلی از منبع</Badge>
                        </h4>
                        <p className="text-xs text-text-secondary">این محتوا توسط خزشگر از منبع جمع‌آوری شده است.</p>
                    </div>
                </div>
                <Button variant="outline" disabled>
                    <SquareArrowOutUpRight />
                    <span className="hidden sm:flex">مشاهده منبع</span>
                </Button>
            </div>
            {loading ? (<ContentDetailMainSkeleton />) : (
                <div className="p-5">
                    <h5 className="font-semibold">{content?.title}</h5>
                    <div className="flex flex-col gap-5 mt-5 text-justify">
                        <div className="relative">
                            <span className="text-sm absolute bg-surface px-2.5 top-[-8px] right-[10px] z-[1]">خلاصه</span>
                            <ExpandableText className="text-text-secondary text-sm border p-4 rounded-lg leading-7" text={content?.summary} />
                        </div>
                        <div className="relative">
                            <span className="text-sm absolute bg-surface px-2.5 top-[-8px] right-[10px] z-[1]">محتوای اصلی</span>
                            <ExpandableText className="text-text-secondary text-sm border p-4 rounded-lg leading-7" text={content?.details} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}