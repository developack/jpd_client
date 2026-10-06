import { AIContentSection } from "./AIContentSection"
import { ReceiptContentSection } from "./ReceiptContentSection"
import type { ContentDetailProps } from "@/types/contents.types"


export const ContentDetailMain = ({ content, loading }: ContentDetailProps) => {
    return (
        <div className="flex flex-col gap-5">
            <ReceiptContentSection content={content} loading={loading} />
            <AIContentSection />
        </div>
    )
}