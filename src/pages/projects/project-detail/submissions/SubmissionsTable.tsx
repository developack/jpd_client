import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, EllipsisVertical, DatabaseArrowUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table/DataTablePagination"
import type { SubmissionsTableProps } from "@/types/submissions.types"
import { formatDate } from "@/utils/date"


export const SubmissionsTable = ({ submissions, page, onPageChange }: SubmissionsTableProps) => {
    return (
        <div className="bg-surface overflow-hidden rounded-lg border">
            <Table className="overflow-hidden">
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[40%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[25%]">آدرس</TableHead>
                        <TableHead className="text-right font-bold w-[25%]">وضعیت</TableHead>
                        <TableHead className="text-right font-bold w-[10%]">تاریخ ایجاد</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions?.data.map((submission) => (
                        <TableRow key={submission.id}>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-2">
                                        <DatabaseArrowUp className="size-4 shrink-0" />
                                        <span className="block truncate max-w-87.5">
                                            {submission.name}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>{submission.name}</TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{submission.url}</TableCell>
                            <TableCell>
                                <Badge className="select-none" variant={submission.activity_status ? 'active' : 'destructive'}>
                                    {submission.activity_status ? 'فعال' : 'غیرفعال'}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatDate(submission.created)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DataTablePagination
                pagination={{
                    page_size: submissions?.meta.page_size ?? 0,
                    count: submissions?.meta.count ?? 0,
                    next: submissions?.meta.next ?? null,
                    previous: submissions?.meta.previous ?? null
                }}
                page={page}
                onPageChange={onPageChange}
            />
        </div>
    )
}