import { useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, EllipsisVertical, FileText, Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { AIContentDetailDialog } from "./AIContentDetailDialog"
import { DataTablePagination } from "@/components/data-table/DataTablePagination"
import type { AIContentTableProps, AIContent } from "@/types/contents.types"
import { formatDate } from "@/utils/date"


export const AIContentTable = ({ ai_contents, page, onPageChange }: AIContentTableProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedContent, setSelectedContent] = useState<AIContent | null>(null)

    const handleViewDetails = (aiContent: AIContent): void => {
        setSelectedContent(aiContent)
        setDialogOpen(true)
    }

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
                    {ai_contents?.results.map((ai_content) => (
                        <TableRow key={ai_content.id}>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-2">
                                        <FileText className="size-4 shrink-0" />
                                        <span className="block truncate max-w-[300px]">
                                            {ai_content.title}
                                        </span>
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
                                <Button onClick={() => handleViewDetails(ai_content)} size="icon-sm" variant="outline">
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
            <DataTablePagination
                pagination={{
                    page_size: ai_contents?.page_size ?? 0,
                    count: ai_contents?.count ?? 0,
                    next: ai_contents?.next ?? null,
                    previous: ai_contents?.previous ?? null
                }}
                page={page}
                onPageChange={onPageChange}
            />
            <AIContentDetailDialog open={dialogOpen} onOpenChange={setDialogOpen} content={selectedContent} />
        </div>
    )
}