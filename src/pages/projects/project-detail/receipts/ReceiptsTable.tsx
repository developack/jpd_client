import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, EllipsisVertical, Database } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table/DataTablePagination"
import type { ReceiptsTableProps } from "@/types/receipt.types"
import { formatDate } from "@/utils/date"


export const ReceiptsTable = ({ receipts, page, onPageChange }: ReceiptsTableProps) => {
    return (
        <div className="bg-surface overflow-hidden rounded-lg border">
            <Table className="overflow-hidden">
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[39%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[25%]">آدرس</TableHead>
                        <TableHead className="text-right font-bold w-[25%]">وضعیت</TableHead>
                        <TableHead className="text-right font-bold w-[11%]">تاریخ ایجاد</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {receipts?.data.map((receipt) => (
                        <TableRow key={receipt.id}>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-2">
                                        <Database className="size-4 shrink-0" />
                                        <span className="block truncate max-w-87.5">
                                            {receipt.name}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>{receipt.name}</TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{receipt.url}</TableCell>
                            <TableCell>
                                <Badge className="select-none" variant={receipt.activity_status ? 'active' : 'destructive'}>
                                    {receipt.activity_status ? 'فعال' : 'غیرفعال'}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatDate(receipt.created)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DataTablePagination
                pagination={{
                    page_size: receipts?.meta.page_size ?? 0,
                    count: receipts?.meta.count ?? 0,
                    next: receipts?.meta.next ?? null,
                    previous: receipts?.meta.previous ?? null
                }}
                page={page}
                onPageChange={onPageChange}
            />
        </div>
    )
}