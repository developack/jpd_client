import { useParams } from "react-router"
import { useNavigate } from "react-router"
import { Building, Database, FileText, Tag, DatabaseArrowUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTabContent } from "@/pages/projects/project-detail/overview/OverviewTabContent"
import { KeywordsTabContent } from "@/pages/projects/project-detail/keywords/KeywordsTabContent"
import { ReceiptsTabContent } from "@/pages/projects/project-detail/receipts/ReceiptsTabContent"
import { SubmissionsTabContent } from "@/pages/projects/project-detail/submissions/SubmissionsTabContent"
import { ContentsTabContent } from "@/pages/projects/project-detail/contents/ContentsTabContent"


export const ProjectTabs = () => {
    const navigate = useNavigate()
    const { projectId, tab } = useParams()

    const handleTabChange = (value: string) => {
        navigate(`/projects/${projectId}/${value}/`)
    }

    return (
        <div className="mt-5">
            <Tabs defaultValue={tab || "overview"} onValueChange={handleTabChange}>
                <div className="border-b overflow-x-auto overflow-y-hidden">
                    <TabsList variant="line" className="h-12!">
                        <TabsTrigger value="overview" className="px-5 py-3 text-sm">
                            <Building />
                            نمای کلی
                        </TabsTrigger>
                        <TabsTrigger value="keywords" className="px-5 py-3 text-sm">
                            <Tag />
                            کلیدواژه‌ها
                        </TabsTrigger>
                        <TabsTrigger value="receipts" className="px-5 py-3 text-sm">
                            <Database />
                            منابع خزش
                        </TabsTrigger>
                        <TabsTrigger value="submissions" className="px-5 py-3 text-sm">
                            <DatabaseArrowUp />
                            منابع انتشار
                        </TabsTrigger>
                        <TabsTrigger value="contents" className="px-5 py-3 text-sm">
                            <FileText />
                            محتواها
                        </TabsTrigger>
                    </TabsList>
                </div>
                <div className="mt-5">
                    <TabsContent value="overview"><OverviewTabContent /></TabsContent>
                    <TabsContent value="keywords"><KeywordsTabContent /></TabsContent>
                    <TabsContent value="receipts"><ReceiptsTabContent /></TabsContent>
                    <TabsContent value="submissions"><SubmissionsTabContent /></TabsContent>
                    <TabsContent value="contents"><ContentsTabContent /></TabsContent>
                </div>
            </Tabs>
        </div>
    )
}