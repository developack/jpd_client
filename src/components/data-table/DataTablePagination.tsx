import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { getPaginationItems } from "@/utils/pagination"
import type { PaginationData } from "@/types/component.types"


export const DataTablePagination = ({ pagination, page, onPageChange }: PaginationData) => {
    const start = (page - 1) * pagination.page_size + 1
    const end = Math.min(page * pagination.page_size, pagination.count)
    const totalPages = Math.ceil(pagination.count / pagination.page_size)
    const items = getPaginationItems(page, totalPages)

    return (
        <div className="flex items-center justify-between border-t p-3">
            <Pagination className="w-fit m-0" dir="rtl">
                <PaginationContent>
                    <PaginationItem className="cursor-pointer">
                        <PaginationPrevious className={`${page === 1 && 'pointer-events-none opacity-50'}`}
                            onClick={() => onPageChange(page - 1)} text="قبلی" aria-disabled={page === 1} />
                    </PaginationItem>
                    
                    {totalPages > 1 && items.map((item, index) => (
                        <PaginationItem key={`${item}-${index}`}>
                            {item === "..." ? (<PaginationEllipsis />
                            ) : (
                                <PaginationLink isActive={page === item} onClick={() => onPageChange(item)}>
                                    {item}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem className="cursor-pointer">
                        <PaginationNext className={`${page === totalPages && 'pointer-events-none opacity-50'}`}
                            onClick={() => onPageChange(page + 1)} text="بعدی" aria-disabled={page === 1} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <span className="text-sm text-text-secondary">نمایش {start} تا {end} از {pagination.count} مورد</span>
        </div>
    )
}