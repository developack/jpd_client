import { Link, useParams, useSearchParams } from "react-router"
import { Badge } from "@/components/ui/badge"
import { FileText, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table/DataTablePagination"
import type { ContentsTableProps } from "@/types/contents.types"
import { formatDate } from "@/utils/date"


export const ContentsTable = ({ contents, page, onPageChange }: ContentsTableProps) => {
    const { projectId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const handleOrderingChange = () => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            const ordering = params.get("ordering")

            if (ordering === "asc") {
                params.set("ordering", "desc")
            } else {
                params.set("ordering", "asc")
            }

            params.delete("page")

            return params
        })
    }
    console.log(searchParams.get("ordering"))
    return (
        <div className="bg-surface overflow-hidden rounded-lg border">
            <Table className="overflow-hidden">
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[50%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[20%]">منبع محتوا</TableHead>
                        <TableHead className="text-right font-bold w-[20%]">رسانه</TableHead>
                        <TableHead className="text-right font-bold w-[10%]">
                            <div onClick={handleOrderingChange} className="flex items-center gap-1.5 cursor-pointer">
                                تاریخ ایجاد
                                {searchParams.get("ordering") === "asc" && <ChevronUp className="size-4" />}
                                {searchParams.get("ordering") === "desc" && <ChevronDown className="size-4" />}
                                {searchParams.get("ordering") === null && <ChevronsUpDown className="size-4" />}
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contents?.data.map((content) => (
                        <TableRow key={content.id}>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className="flex items-center gap-2" to={`/projects/${projectId}/contents/${content.id}/`}>
                                            <FileText className="size-4 shrink-0" />
                                            <span className="block truncate max-w-100 hover:underline">
                                                {content.title}
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>{content.title}</TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{content.receipt_status_config__reference_config__name}</TableCell>
                            <TableCell>
                                <Badge className="select-none" variant={content.has_media ? 'active' : 'destructive'}>
                                    {content.has_media ? 'دارد' : 'ندارد'}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatDate(content.created)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DataTablePagination
                pagination={{
                    page_size: contents?.meta.page_size ?? 0,
                    count: contents?.meta.count ?? 0,
                    next: contents?.meta.next ?? null,
                    previous: contents?.meta.previous ?? null
                }}
                page={page}
                onPageChange={onPageChange}
            />
        </div>
    )
}