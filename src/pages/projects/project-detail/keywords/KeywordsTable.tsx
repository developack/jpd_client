import { useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Pencil, EllipsisVertical, Tag, Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table/DataTablePagination"
import { KeywordDetailDialog } from "@/pages/projects/project-detail/keywords/KeywordDetailDialog"
import type { Keyword, KeywordsTableProps } from "@/types/keyword.types"
import { formatDate } from "@/utils/date"


export const KeywordsTable = ({ keywords, page, onPageChange }: KeywordsTableProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null)

    const handleViewDetails = (keyword: Keyword): void => {
        setSelectedKeyword(keyword)
        setDialogOpen(true)
    }

    return (
        <div className="bg-surface overflow-hidden rounded-lg border">
            <Table className="overflow-hidden">
                <TableHeader className="bg-table-head">
                    <TableRow>
                        <TableHead className="text-right font-bold w-[35%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">پروژه</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">نوع کلیدواژه</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">زبان</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">تاریخ ایجاد</TableHead>
                        <TableHead className="text-right font-bold w-[5%]">عملیات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {keywords?.data.map((keyword) => (
                        <TableRow key={keyword.id}>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-2">
                                        <Tag className="size-4 shrink-0" />
                                        <span className="block truncate max-w-87.5">
                                            {keyword.name}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>{keyword.name}</TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{keyword.project}</TableCell>
                            <TableCell>{keyword.keyword_type}</TableCell>
                            <TableCell>{keyword.language}</TableCell>
                            <TableCell>{formatDate(keyword.created)}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button onClick={() => handleViewDetails(keyword)} size="icon-sm" variant="outline">
                                    <Eye />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DataTablePagination
                pagination={{
                    page_size: keywords?.meta.page_size ?? 0,
                    count: keywords?.meta.count ?? 0,
                    next: keywords?.meta.next ?? null,
                    previous: keywords?.meta.previous ?? null
                }}
                page={page}
                onPageChange={onPageChange}
            />
            <KeywordDetailDialog open={dialogOpen} onOpenChange={setDialogOpen} keyword={selectedKeyword} />
        </div>
    )
}