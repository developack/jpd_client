import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { KeywordDetailDialogProps } from "@/types/keyword.types"
import { formatDate } from "@/utils/date"


export const KeywordDetailDialog = ({ open, onOpenChange, keyword }: KeywordDetailDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl" data-lang="rtl">
                <DialogHeader>
                    <DialogTitle>جزئیات کلیدواژه</DialogTitle>
                </DialogHeader>
                <div>
                    <dl className="divide-y rounded-lg border">
                        <div className="flex items-center justify-between px-4 py-3">
                            <dt className="text-sm text-muted-foreground">عنوان</dt>
                            <dd className="text-sm font-medium">{keyword?.name}</dd>
                        </div>

                        <div className="flex items-center justify-between px-4 py-3">
                            <dt className="text-sm text-muted-foreground">پروژه</dt>
                            <dd className="text-sm font-medium">{keyword?.project}</dd>
                        </div>

                        <div className="flex items-center justify-between px-4 py-3">
                            <dt className="text-sm text-muted-foreground">زبان</dt>
                            <dd className="text-sm font-medium">{keyword?.language}</dd>
                        </div>

                        <div className="flex items-center justify-between px-4 py-3">
                            <dt className="text-sm text-muted-foreground">نوع کلیدواژه</dt>
                            <dd className="text-sm font-medium">{keyword?.keyword_type}</dd>
                        </div>

                        <div className="flex items-center justify-between px-4 py-3">
                            <dt className="text-sm text-muted-foreground">تاریخ ایجاد</dt>
                            <dd className="text-sm font-medium">{formatDate(keyword?.created)}</dd>
                        </div>

                        <div className="px-4 py-3">
                            <dt className="mb-3 text-sm text-muted-foreground">کلمات</dt>
                            <dd className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto">
                                {keyword?.words?.list?.map((word) => (
                                    <span className="rounded-md bg-muted px-2.5 py-1 text-xs">{word}</span>
                                ))}
                            </dd>
                        </div>
                    </dl>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">بستن</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}