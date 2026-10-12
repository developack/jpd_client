import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { toast } from "@/components/ui/toast"
import { PanelLayout } from "@/components/layout/PanelLayout"
import { ProjectTabs } from "@/pages/projects/project-detail/ProjectTabs"
import { ProjectHeader } from "@/pages/projects/project-detail/ProjectDetailHeader"
import { ProjectHeaderSkeleton } from "./project-detail/ProjectDetailHeaderSkeleton"
import type { Project } from "@/types/project.types"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export const ProjectDetailPage = () => {
    const {projectId} = useParams()
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState<Project | null>(null)

    const fetchProject = async (): Promise<void> => {
        setLoading(true)

        try {
            const project = await getApi<Project>(`/projects/${projectId}/`)
            setProject(project)
            
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
        fetchProject()
    }, [])

    return (
        <PanelLayout>
            <section>
                {loading ? <ProjectHeaderSkeleton /> : <ProjectHeader project={project} />}
                <ProjectTabs />
            </section>
        </PanelLayout>
    )
}