import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderClosed, Pencil, EllipsisVertical } from "lucide-react"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table/DataTablePagination"
import type { ProjectsTableProps } from "@/types/project.types"
import { formatDate } from "@/utils/date"


export const ProjectTable = ({ projects, page, onPageChange }: ProjectsTableProps) => {

    return (
        <div className="bg-surface overflow-hidden rounded-lg border">
            <Table className="overflow-hidden">
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[40%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[30%]">وضعیت</TableHead>
                        <TableHead className="text-right font-bold w-[20%]">تاریخ ایجاد</TableHead>
                        <TableHead className="text-right font-bold w-[10%]">عملیات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects?.results.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>
                                <Link to={`/projects/${project.id}`} className="flex items-center gap-2 text-text hover:underline">
                                    <FolderClosed className="size-4" />
                                    {project.name}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Badge className="select-none" variant={project.activity_status ? 'active' : 'destructive'}>
                                    {project.activity_status ? 'فعال' : 'غیرفعال'}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatDate(project.created)}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button size="icon-sm" variant="outline" disabled>
                                    <Link to="/project"><Pencil /></Link>
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
                    page_size: projects?.page_size ?? 0,
                    count: projects?.count ?? 0,
                    next: projects?.next ?? null,
                    previous: projects?.previous ?? null
                }}
                page={page}
                onPageChange={onPageChange}
            />
        </div>
    )
}