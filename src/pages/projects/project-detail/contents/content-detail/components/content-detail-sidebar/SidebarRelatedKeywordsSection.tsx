import { Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { ContentDetailSidebarProps } from "@/types/contents.types"


export const SidebarRelatedKeywordsSection = ({ content, loading }: ContentDetailSidebarProps) => {
    return (
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
    )
}