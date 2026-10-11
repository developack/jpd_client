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
                        <TableHead className="text-right font-bold w-[29.2%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[20%]">آدرس</TableHead>
                        <TableHead className="text-right font-bold w-[20%]">وضعیت</TableHead>
                        <TableHead className="text-right font-bold w-[20%]">تاریخ ایجاد</TableHead>
                        <TableHead className="text-right font-bold w-[10.8%]">عملیات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions?.results.map((submission) => (
                        <TableRow key={submission.id}>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-2">
                                        <DatabaseArrowUp className="size-4 shrink-0" />
                                        <span className="block truncate max-w-[350px]">
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
                            <TableCell className="flex items-center gap-2">
                                <Button size="icon-sm" variant="outline" disabled>
                                    <Link to="/project">
                                        <Pencil />
                                    </Link>
                                </Button>
                                <Button size="icon-sm" variant="ghost" disabled>
                                    <EllipsisVertical />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DataTablePagination
                pagination={{
                    page_size: submissions?.page_size ?? 0,
                    count: submissions?.count ?? 0,
                    next: submissions?.next ?? null,
                    previous: submissions?.previous ?? null
                }}
                page={page}
                onPageChange={onPageChange}
            />
        </div>
    )
}