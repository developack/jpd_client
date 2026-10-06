import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Bot, WandSparkles, SquareArrowOutUpRight, FileText } from "lucide-react"
import { AIContentTable } from "./AIContentTable"
import { ExpandableText } from "@/components/ui/expandable-text"
import { AIContentTableSkeleton } from "./AIContentTableSkeleton"
import { ContentDetailMainSkeleton } from "./ContentDetailMainSkeleton"
import { DataTableEmpty } from "@/components/data-table/DataTableEmpty"
import { DataTableError } from "@/components/data-table/DataTableError"
import type { ContentDetailMainProps, AiContent } from "@/types/contents.types"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const ContentDetailMain = ({ content, loading }: ContentDetailMainProps) => {
    const { contentId } = useParams()
    const [aiContents, setAiContents] = useState<AiContent[]>([])
    const [aiContentsLoading, setAiContentsLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)

    const fetchAiContents = async (): Promise<void> => {

        setAiContentsLoading(true)
        try {   
            const data = await getApi<AiContent[]>(`/ai-contents/${contentId}/`)
            setAiContents(data)

        } catch (error) {
            if (error instanceof ApiError) {
                setError(error)
            } else {
                setError(new ApiError("خطا در برقراری ارتباط با سرور", 0, ""))
            }
            toast.add({
                type: "error",
                description: "خطا در برقراری ارتباط با سرور"
            })

        } finally {
            setAiContentsLoading(false)
        }
    }

    useEffect(() => {
        fetchAiContents()
    }, [])

    const renderAiContents = () => {
        if (aiContentsLoading) {
            return <AIContentTableSkeleton />
        }

        if (error) {
            return <DataTableError onRetry={fetchAiContents} />
        }

        if (aiContents.length === 0) {
            return <DataTableEmpty title="متاسافانه محتوایی یافت نشد" description="برای شروع، اولین محتوای خود را ایجاد کنید." icon={FileText} />
        }

        return <AIContentTable ai_contents={aiContents} />
    }

    return (
        <div className="flex flex-col gap-5">
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
                        <div className="flex flex-col gap-5 mt-5">
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

            <div className="bg-surface rounded-lg border">
                <div className="flex items-center justify-between p-5 border-b gap-1.5">
                    <div className="flex items-start sm:items-center gap-2">
                        <span className="rounded-full p-2 border border-primary hidden sm:flex">
                            <WandSparkles className="shrink-0 stroke-primary stroke-2" />
                        </span>
                        <div className="flex flex-col gap-1.5">
                            <h4 className="font-semibold flex items-center gap-2">
                                <span>محتوای تولیدشده با هوش مصنوعی</span>
                                <Badge className="hidden lg:flex">تولیدشده با هوش مصنوعی</Badge>
                            </h4>
                            <p className="text-xs text-text-secondary">این محتوا بر اساس محتوای اصلی، توسط هوش مصنوعی تولید و بهینه‌سازی شده است.</p>
                        </div>
                    </div>
                    <Button variant="outline" disabled>
                        <SquareArrowOutUpRight />
                        <span className="hidden sm:flex">مشاهده جزئیات</span>
                    </Button>
                </div>
                <div className="p-5">
                    {renderAiContents()}
                </div>
            </div>
        </div>
    )
}