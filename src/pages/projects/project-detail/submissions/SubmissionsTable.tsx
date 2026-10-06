import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, EllipsisVertical, DatabaseArrowUp } from "lucide-react"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import type { SubmissionsTableProps } from "@/types/submissions.types"
import { formatDate } from "@/utils/date"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"


export const SubmissionsTable = ({ submissions }: SubmissionsTableProps) => {
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
                    {submissions.map((submission) => (
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
            <div className="flex items-center justify-between border-t p-3">
                <div className="flex items-center gap-2">
                    <Button variant="outline" disabled>قبلی</Button>
                    <Button variant="outline" disabled>بعدی</Button>
                </div>
                <span className="text-sm text-text-secondary">نمایش 1 تا 6 از 6 مورد</span>
            </div>
        </div>
    )
}