import { SidebarInfoSection } from "./SidebarInfoSection"
import { SidebarThumbnailSection } from "./SidebarThumbnailSection"
import { SidebarRelatedKeywordsSection } from "./SidebarRelatedKeywordsSection"
import { SidebarProjectSection } from "./SidebarProjectSection"
import type { ContentDetailSidebarProps } from "@/types/contents.types"


export const ContentDetailSidebar = ({ content, loading }: ContentDetailSidebarProps) => {

    return (
        <aside className="sticky top-[81px]">
            <div className="flex flex-col gap-5">
                <SidebarInfoSection content={content} loading={loading} />
                <SidebarThumbnailSection content={content} loading={loading} />
                <SidebarRelatedKeywordsSection content={content} loading={loading} />
                <SidebarProjectSection content={content} loading={loading} />
            </div>
        </aside>
    )
}