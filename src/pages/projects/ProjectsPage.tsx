import { useState, useEffect } from "react"
import { FolderCode } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { Dialog } from "@/components/ui/dialog"
import { PanelLayout } from "@/components/layout/PanelLayout"
import { ProjectTable } from "@/pages/projects/components/ProjectsTable"
import { DataTableEmpty } from "@/components/data-table/DataTableEmpty"
import { DataTableError } from "@/components/data-table/DataTableError"
import { ProjectsTableSkeleton } from "@/pages/projects/components/ProjectsTableSkeleton"
import type { Project } from "@/types/project.types"
import type { PaginatedResponse } from "@/types/api"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const ProjectsPage = () => {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const [projects, setProjects] = useState<PaginatedResponse<Project> | null>(null)

    const fetchProjects = async (): Promise<void> => {
        setLoading(true)
        setError(null)
        
        try {
            const data = await getApi<PaginatedResponse<Project>>(`/projects/?page=${page}`)
            setProjects(data)

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
        fetchProjects()
    }, [page])

    const renderProjectsContent = () => {
        if (loading) {
            return <ProjectsTableSkeleton />
        }
        if (error) {
            return <DataTableError onRetry={fetchProjects} />
        }
        if (projects?.meta.count === 0) {
            return <DataTableEmpty title="هنوز پروژه‌ای ایجاد نکرده‌اید" description="برای شروع، اولین پروژه خود را ایجاد کنید." icon={FolderCode} />
        }
        return <ProjectTable projects={projects} page={page} onPageChange={setPage} />
    }

    return (
        <PanelLayout>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <section>
                    <header className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">پروژه‌ها</h1>
                    </header>
                    <main className="mt-5">
                        {renderProjectsContent()}
                    </main>
                </section>
            </Dialog>
        </PanelLayout>
    )
} 