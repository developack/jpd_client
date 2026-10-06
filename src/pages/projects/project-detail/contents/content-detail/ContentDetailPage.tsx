import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { toast } from "@/components/ui/toast"
import { PanelLayout } from "@/components/layout/PanelLayout"
import { ContentDetailHeader } from "./components/ContentDetailHeader"
import { ContentDetailHeaderSkeleton } from "./components/ContentDetailHeaderSkeleton"
import { ContentDetailSidebar } from "./components/ContentDetailSidebar"
import { ContentDetailMain } from "./components/ContentDetailMain"
import type { ReceiptContentDetail } from "@/types/contents.types"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const ContentDetailPage = () => {

    const [content, setContent] = useState<ReceiptContentDetail | null>(null)
    const [loading, setLoading] = useState(false)
    const { contentId } = useParams()

    const fetchContent = async (): Promise<void> => {

        setLoading(true)
        try {
            const data = await getApi<ReceiptContentDetail>(`/receipt-content/${contentId}/`)
            setContent(data)

        } catch (error) {
            let message = "خطا در برقراری ارتباط با سرور"

            if (error instanceof ApiError) {
                message = error.message
            }
            toast.add({
                type: "error",
                description: message,
            })

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContent()
    }, [])

    return (
        <PanelLayout>
            <section>
                {loading ? <ContentDetailHeaderSkeleton /> : <ContentDetailHeader content={content} />}
                <div className="grid grid-cols-1 items-start gap-5 mt-5 xl:grid-cols-[3fr_1fr]">
                    <ContentDetailMain content={content} loading={loading} />
                    <ContentDetailSidebar content={content} loading={loading} />
                </div>
            </section>
        </PanelLayout>
    )
}