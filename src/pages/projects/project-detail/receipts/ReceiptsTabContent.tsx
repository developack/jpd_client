import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Database } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { DataTableEmpty } from "@/components/data-table/DataTableEmpty"
import { DataTableError } from "@/components/data-table/DataTableError"
import { ReceiptsTable } from "@/pages/projects/project-detail/receipts/ReceiptsTable"
import { ReceiptsTableSkeleton } from "@/pages/projects/project-detail/receipts/ReceiptsTableSkeleton"
import type { Receipt } from "@/types/receipt.types"
import type { PaginatedResponse } from "@/types/api"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const ReceiptsTabContent = () => {
    const [page, setPage] = useState(1)
    const [receipts, setReceipts] = useState<PaginatedResponse<Receipt> | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const { projectId } = useParams()

    const fetchReceipts = async (): Promise<void> => {

        setLoading(true)
        try {
            const response = await getApi<PaginatedResponse<Receipt>>(`/receipts/${projectId}/?page=${page}`)
            setReceipts(response)

        } catch (e) {
            if (e instanceof ApiError) {
                setError(e)
            } else {
                setError(
                    new ApiError("خطا در برقراری ارتباط با سرور", 0, {
                            error: {
                                code: "network_error",
                                message: "خطا در برقراری ارتباط با سرور",
                            },
                        }
                    )
                )
                
                toast.add({
                    type: "error",
                    description: "دریافت لیست پروژه‌ها با مشکل مواجه شد.",
                })
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReceipts()
    }, [page])

    const renderReceiptsContent = () => {
        if (loading) {
            return <ReceiptsTableSkeleton />
        }

        if (error) {
            return <DataTableError onRetry={fetchReceipts} />
        }

        if (receipts?.meta?.count === 0) {
            return <DataTableEmpty title="هنوز منبع خزشی ایجاد نکرده‌اید" description="برای شروع، اولین منبع خزش خود را ایجاد کنید." icon={Database} />
        }

        return <ReceiptsTable receipts={receipts} page={page} onPageChange={setPage} />
    }

    return (
        <section className="bg-surface rounded-lg p-5 border">
            <header className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">منابع خزش</h2>
                    <p className="text-text-secondary text-sm">منابع خزش را برای این پروژه مدیریت کنید</p>
                </div>
            </header>
            <main className="mt-5">
                {renderReceiptsContent()}
            </main>
        </section>
    )
}