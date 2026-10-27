import { Link, useParams } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, EllipsisVertical, FileText } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table/DataTablePagination"
import type { ContentsTableProps } from "@/types/contents.types"
import { formatDate } from "@/utils/date"


export const ContentsTable = ({ contents, page, onPageChange }: ContentsTableProps) => {
    const { projectId } = useParams()

    return (
        <div className="bg-surface overflow-hidden rounded-lg border">
            <Table className="overflow-hidden">
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[50%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[20%]">منبع محتوا</TableHead>
                        <TableHead className="text-right font-bold w-[20%]">رسانه</TableHead>
                        <TableHead className="text-right font-bold w-[10%]">تاریخ ایجاد</TableHead>
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