import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { PlusIcon, DatabaseArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { DataTableEmpty } from "@/components/data-table/DataTableEmpty"
import { DataTableError } from "@/components/data-table/DataTableError"
import { SubmissionsTable } from "@/pages/projects/project-detail/submissions/SubmissionsTable"
import { NewSubmissionDialog } from "@/pages/projects/project-detail/submissions/NewSubmissionDialog"
import { SubmissionsTableSekeleton } from "@/pages/projects/project-detail/submissions/SubmissionsTableSekeleton"
import type { Submission } from "@/types/submissions.types"
import type { PaginatedResponse } from "@/types/common.types"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const SubmissionsTabContent = () => {
    const [page, setPage] = useState(1)
    const [submissions, setSubmissions] = useState<PaginatedResponse<Submission> | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { projectId } = useParams()

    const fetchSubmissions = async (): Promise<void> => {

        setLoading(true)
        try {
            const data = await getApi<PaginatedResponse<Submission>>(`/submissions/${projectId}/?page=${page}`)
            setSubmissions(data)

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
        fetchSubmissions()
    }, [page])

    const renderSubmissionsContent = () => {
        if (loading) {
            return <SubmissionsTableSekeleton />
        }

        if (error) {
            return <DataTableError onRetry={fetchSubmissions} />
        }

        if (submissions?.count === 0) {
            return <DataTableEmpty title="هنوز منبع انتشاری ایجاد نکرده‌اید" description="برای شروع، اولین منبع انتشار خود را ایجاد کنید." icon={DatabaseArrowUp} />
        }

        return <SubmissionsTable submissions={submissions} page={page} onPageChange={setPage} />
    }

    return (
        <section className="bg-surface rounded-lg p-5 border">
            <header className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">منابع انتشار</h2>
                    <p className="text-text-secondary text-sm">منابع انتشار را برای این پروژه مدیریت کنید</p>
                </div>
                <Button onClick={() => setDialogOpen(true)} disabled>
                    <PlusIcon className="size-4" />
                    افزودن منبع
                </Button>
            </header>
            {/* <NewSubmissionDialog open={dialogOpen} onOpenChange={setDialogOpen} onReceiptCreated={handleReceiptCreated} /> */}
            <main className="mt-5">
                {renderSubmissionsContent()}
            </main>
        </section>
    )
}