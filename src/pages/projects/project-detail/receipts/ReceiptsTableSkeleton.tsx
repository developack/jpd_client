import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { TableFooterSkeleton } from "@/components/skeleton/TableFooterSkeleton"


export const ReceiptsTableSkeleton = () => {
    return (
        <div className="rounded-md border bg-surface">
            <Table>
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[39%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[25%]">آدرس</TableHead>
                        <TableHead className="text-right font-bold w-[25%]">وضعیت</TableHead>
                        <TableHead className="text-right font-bold w-[11%]">تاریخ ایجاد</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-5 w-62.5" />
                            </TableCell>
                            <TableCell><Skeleton className="h-5 w-32 rounded-full" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-15" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TableFooterSkeleton />
        </div>
    )
}