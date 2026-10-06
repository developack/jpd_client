import { useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Pencil, EllipsisVertical, Tag, Eye } from "lucide-react"
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from "@/components/ui/table"
import { KeywordDetailDialog } from "@/pages/projects/project-detail/keywords/KeywordDetailDialog"
import type { Keyword, KeywordsTableProps } from "@/types/keyword.types"
import { formatDate } from "@/utils/date"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"


export const KeywordsTable = ({ keywords }: KeywordsTableProps) => {
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
                        <TableHead className="text-right font-bold w-[29.2%]">عنوان</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">پروژه</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">نوع کلیدواژه</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">زبان</TableHead>
                        <TableHead className="text-right font-bold w-[15%]">تاریخ ایجاد</TableHead>
                        <TableHead className="text-right font-bold w-[10.8%]">عملیات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {keywords.map((keyword) => (
                        <TableRow key={keyword.id}>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-2">
                                        <Tag className="size-4 shrink-0" />
                                        <span className="block truncate max-w-[350px]">
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
            <KeywordDetailDialog open={dialogOpen} onOpenChange={setDialogOpen} keyword={selectedKeyword} />
        </div>
    )
}