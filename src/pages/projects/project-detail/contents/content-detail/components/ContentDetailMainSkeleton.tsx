import { Skeleton } from "@/components/ui/skeleton"


export const ContentDetailMainSkeleton = () => {
    return (
        <div className="bg-surface rounded-lg border">
            <div className="p-5">
                <Skeleton className="h-6 w-[70%]" />
                <div className="flex flex-col gap-5 mt-5">
                    <div className="relative">
                        <span className="text-sm absolute bg-surface px-2.5 top-[-8px] right-[10px]">خلاصه</span>
                        <div className="text-text-secondary text-sm border p-4 rounded-lg leading-7 flex flex-col gap-2.5">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <Skeleton key={index} className="h-5 w-full" />
                            ))}
                            <Skeleton className="h-5 w-[65%]" />
                        </div>
                    </div>
                    <div className="relative">
                        <span className="text-sm absolute bg-surface px-2.5 top-[-8px] right-[10px]">محتوای اصلی</span>
                        <div className="text-text-secondary text-sm border p-4 rounded-lg leading-7 flex flex-col gap-2.5">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className="h-5 w-full" />
                            ))}
                            <Skeleton className="h-5 w-[65%]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}