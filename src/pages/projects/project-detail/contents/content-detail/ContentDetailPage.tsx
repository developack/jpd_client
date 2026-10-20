import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { toast } from "@/components/ui/toast"
import { PanelLayout } from "@/components/layout/PanelLayout"
import { ContentDetailMain } from "./components/ContentDetailMain"
import { ContentDetailHeader } from "./components/ContentDetailHeader"
import { ContentDetailSidebar } from "./components/content-detail-sidebar/ContentDetailSidebar"
import type { ApiResponse } from "@/types/api"
import type { ReceiptContentDetail } from "@/types/contents.types"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const ContentDetailPage = () => {
    const {contentId} = useParams()
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState<ReceiptContentDetail | null>(null)

    const fetchContent = async (): Promise<void> => {
        setLoading(true)

        try {
            const response = await getApi<ApiResponse<ReceiptContentDetail>>(`/receipt-content/${contentId}/`)
            setContent(response.data)

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
                <ContentDetailHeader content={content} />
                <div className="grid grid-cols-1 items-start gap-5 mt-5 xl:grid-cols-[3fr_1fr]">
                    <ContentDetailMain content={content} loading={loading} />
                    <ContentDetailSidebar content={content} loading={loading} />
                </div>
            </section>
        </PanelLayout>
    )
}