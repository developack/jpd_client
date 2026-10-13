import { useState, useEffect } from "react"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { FolderCode, PlusIcon } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { PanelLayout } from "@/components/layout/PanelLayout"
import { ProjectTable } from "@/pages/projects/components/ProjectsTable"
import { DataTableEmpty } from "@/components/data-table/DataTableEmpty"
import { DataTableError } from "@/components/data-table/DataTableError"
import { NewProjectDialog } from "@/pages/projects/components/NewProjectDialog"
import { ProjectsTableSkeleton } from "@/pages/projects/components/ProjectsTableSkeleton"
import type { Project } from "@/types/project.types"
import type { PaginatedResponse } from "@/types/common.types"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const ProjectsPage = () => {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const [projectCreated, setProjectCreated] = useState<Project | null>(null)
    const [projects, setProjects] = useState<PaginatedResponse<Project> | null>(null)

    const fetchProjects = async (): Promise<void> => {
        setLoading(true)
        setError(null)
        
        try {
            const data = await getApi<PaginatedResponse<Project>>(`/projects/?page=${page}`)
            setProjects(data)

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
        fetchProjects()
    }, [page, projectCreated])

    const renderProjectsContent = () => {
        if (loading) {
            return <ProjectsTableSkeleton />
        }
        if (error) {
            return <DataTableError onRetry={fetchProjects} />
        }
        if (projects?.count === 0) {
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
                        <DialogTrigger>
                            <Button>
                                <PlusIcon className="size-4" />
                                افزودن پروژه
                            </Button>
                        </DialogTrigger>
                    </header>
                    <main className="mt-5">
                        {renderProjectsContent()}
                    </main>
                </section>
                <NewProjectDialog onProjectCreated={setProjectCreated} onDialogOpen={setDialogOpen} />
            </Dialog>
        </PanelLayout>
    )
} 