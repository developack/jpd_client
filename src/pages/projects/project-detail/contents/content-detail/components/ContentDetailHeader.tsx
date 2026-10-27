import { Link } from "react-router"
import { MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ContentDetailHeaderProps } from "@/types/contents.types"


export const ContentDetailHeader = ({ content }: ContentDetailHeaderProps) => {
    return (
        <header>
            <div className="flex items-center justify-between">
                <Button variant="ghost">
                    <Link to={`/projects/${content?.project.id}/contents`} className="flex items-center gap-1.5">
                        <MoveRight />
                        بازگشت به محتواها
                    </Link>
                </Button>
            </div>
        </header>
    )
}