import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { TableFooterSkeleton } from "@/components/skeleton/TableFooterSkeleton"


export const ContentsTableSkeleton = () => {
    return (
        <div className="rounded-md border bg-surface">
            <Table>
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[39.2%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[20%]">منبع محتوا</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">رسانه</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">تاریخ ایجاد</TableHead>
                        <TableHead className="text-right font-bold w-[10.8%]">عملیات</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-5 w-[400px]" />
                            </TableCell>
                            <TableCell><Skeleton className="h-5 w-32 rounded-full" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-10.5" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Skeleton className="h-7 w-7 rounded-md" />
                                    <Skeleton className="h-7 w-7 rounded-md" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TableFooterSkeleton />
        </div>
    )
}