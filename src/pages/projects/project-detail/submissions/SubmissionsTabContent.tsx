import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { PlusIcon, DatabaseArrowUp } from "lucide-react"
import { DataTableEmpty } from "@/components/data-table/DataTableEmpty"
import { DataTableError } from "@/components/data-table/DataTableError"
import { SubmissionsTable } from "@/pages/projects/project-detail/submissions/SubmissionsTable"
import { SubmissionsTableSekeleton } from "@/pages/projects/project-detail/submissions/SubmissionsTableSekeleton"
import type { Submission } from "@/types/submissions.types"
import type { PaginatedResponse } from "@/types/api"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const SubmissionsTabContent = () => {
    const { projectId } = useParams()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    // const [dialogOpen, setDialogOpen] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const [submissions, setSubmissions] = useState<PaginatedResponse<Submission> | null>(null)

    const fetchSubmissions = async (): Promise<void> => {
        setLoading(true)

        try {
            const response = await getApi<PaginatedResponse<Submission>>(`/submissions/${projectId}/?page=${page}`)
            setSubmissions(response)

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
        fetchSubmissions()
    }, [page])

    const renderSubmissionsContent = () => {
        if (loading) {
            return <SubmissionsTableSekeleton />
        }

        if (error) {
            return <DataTableError onRetry={fetchSubmissions} />
        }

        if (submissions?.meta.count === 0) {
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
                {/* <Button onClick={() => setDialogOpen(true)} disabled>
                    <PlusIcon className="size-4" />
                    افزودن منبع
                </Button> */}
                <Button disabled>
                    <PlusIcon className="size-4" />
                    افزودن منبع
                </Button>
            </header>
            {/* <NewSubmissionDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmissionCreated={handleReceiptCreated} /> */}
            <main className="mt-5">
                {renderSubmissionsContent()}
            </main>
        </section>
    )
}