import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Tag, PlusIcon } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { DataTableEmpty } from "@/components/data-table/DataTableEmpty"
import { DataTableError } from "@/components/data-table/DataTableError"
import { KeywordsTable } from "@/pages/projects/project-detail/keywords/KeywordsTable"
import { NewKeywordDialog } from "@/pages/projects/project-detail/keywords/NewKeywordDialog"
import { KeywordsTableSkeleton } from "@/pages/projects/project-detail/keywords/KeywordsTableSkeleton"
import type { Keyword } from "@/types/keyword.types"
import type { PaginatedResponse } from "@/types/common.types"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const KeywordsTabContent = () => {
    const {projectId} = useParams()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const [keywordCreated, setKeywordCreated] = useState<Keyword | null>(null)
    const [keywords, setKeywords] = useState<PaginatedResponse<Keyword> | null>(null)

    const fetchKeywords = async (): Promise<void> => {
        setLoading(true)
        setError(null)

        try {
            const keywords = await getApi<PaginatedResponse<Keyword>>(`/keywords/${projectId}/?page=${page}`)
            setKeywords(keywords)

        } catch (error) {
            if (error instanceof ApiError) {
                setError(error)
            } else {
                setError(new ApiError("خطا در برقراری ارتباط با سرور", 0, ""))
            }
            toast.add({
                type: "error",
                description: "خطا در برقراری ارتباط با سرور",
            })

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchKeywords()
    }, [page, keywordCreated])

    const renderKeywordsContent = () => {
        if (loading) {
            return <KeywordsTableSkeleton />
        }

        if (error) {
            return <DataTableError onRetry={fetchKeywords} />
        }

        if (keywords?.count === 0) {
            return <DataTableEmpty title="هنوز کلیدواژه‌ای ایجاد نکرده‌اید" description="برای شروع، اولین کلیدواژه خود را ایجاد کنید." icon={Tag} />
        }

        return <KeywordsTable keywords={keywords} page={page} onPageChange={setPage} />
    }

    return (
        <section className="bg-surface rounded-lg p-5 border">
            <header className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">کلیدواژه‌ها</h2>
                    <p className="text-text-secondary text-sm">کلیدواژه‌ها را برای این پروژه مدیریت کنید</p>
                </div>
                <Button onClick={() => setDialogOpen(true)} disabled>
                    <PlusIcon className="size-4" />
                    افزودن کلیدواژه
                </Button>
            </header>
            <NewKeywordDialog open={dialogOpen} onOpenChange={setDialogOpen} onKeywordCreated={setKeywordCreated} />
            <main className="mt-5">
                {renderKeywordsContent()}
            </main>
        </section>
    )
}