import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { toast } from "@/components/ui/toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WandSparkles, SquareArrowOutUpRight, FileText } from "lucide-react"
import { AIContentTable } from "./AIContentTable"
import { AIContentTableSkeleton } from "./AIContentTableSkeleton"
import { DataTableEmpty } from "@/components/data-table/DataTableEmpty"
import { DataTableError } from "@/components/data-table/DataTableError"
import type { AIContent } from "@/types/contents.types"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const AIContentSection = () => {
    const {contentId} = useParams()
    const [aiContents, setAiContents] = useState<AIContent[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)

    const fetchAiContents = async (): Promise<void> => {

        setLoading(true)
        try {   
            const data = await getApi<AIContent[]>(`/ai-contents/${contentId}/`)
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
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAiContents()
    }, [])

    const renderAiContents = () => {
        if (loading) {
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
    )
}