import { Skeleton } from "@/components/ui/skeleton"
import { PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"


export const TableFooterSkeleton = () => {
    return (
        <div className="flex items-center justify-between border-t p-3">
            <div className="flex items-center gap-0.5">
                <PaginationItem className="cursor-pointer list-none">
                    <PaginationPrevious className="pointer-events-none opacity-50" text="قبلی" />
                </PaginationItem>
                <PaginationItem className="cursor-pointer list-none">
                    <PaginationNext className="pointer-events-none opacity-50" text="بعدی" />
                </PaginationItem>
            </div>
            <Skeleton className="w-30 h-5" />
        </div>
    )
}