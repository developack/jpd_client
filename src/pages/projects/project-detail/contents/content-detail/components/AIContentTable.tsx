import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, EllipsisVertical, FileText, Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import type { AIContentTableProps } from "@/types/contents.types"
import { formatDate } from "@/utils/date"



export const AIContentTable = ({ ai_contents }: AIContentTableProps) => {
    return (
        <div className="bg-surface overflow-hidden rounded-lg border">
            <Table className="overflow-hidden">
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[40%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">زبان</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">وضعیت</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">تاریخ ایجاد</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">عملیات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ai_contents.map((ai_content) => (
                        <TableRow key={ai_content.id}>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className="flex items-center gap-2" to="">
                                            <FileText className="size-4 shrink-0" />
                                            <span className="block truncate max-w-[300px]">
                                                {ai_content.title}
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>{ai_content.title}</TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{ai_content.language}</TableCell>
                            <TableCell>
                                <Badge className="select-none" variant={ai_content.status ? 'active' : 'destructive'}>
                                    {ai_content.status ? 'فعال' : 'غیرفعال'}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatDate(ai_content.created)}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button size="icon-sm" variant="outline">
                                    <Eye />
                                </Button>
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