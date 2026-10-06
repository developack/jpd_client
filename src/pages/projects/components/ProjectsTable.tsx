import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderClosed, Pencil, EllipsisVertical } from "lucide-react"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import type { ProjectsTableProps } from "@/types/project.types"
import { formatDate } from "@/utils/date"


export const ProjectTable = ({ projects }: ProjectsTableProps) => {

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
                    {projects.map((project) => (
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