import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { TableFooterSkeleton } from "@/components/skeleton/TableFooterSkeleton"


export const ProjectsTableSkeleton = () => {
    return (
        <div className="rounded-md border bg-surface">
            <Table>
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[60%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[30%]">وضعیت</TableHead>
                        <TableHead className="text-right font-bold w-[10%]">تاریخ ایجاد</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-5 w-32" />
                            </TableCell>

                            <TableCell>
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </TableCell>

                            <TableCell>
                                <Skeleton className="h-5 w-24" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TableFooterSkeleton />
        </div>
    )
}