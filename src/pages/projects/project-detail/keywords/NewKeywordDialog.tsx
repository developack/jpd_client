import { useEffect, useState } from "react"
// import { toast } from "@/components/ui/toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Spinner } from "@/components/ui/spinner"
// import { ApiError } from "@/services/api/ApiError"
// import { Checkbox } from "@/components/ui/checkbox"
import { TagInput } from "@/components/ui/tag-input"
import { Field, FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { useLanguage } from "@/hooks/use-language"
import type { KeywordType, NewKeywordDialogProps } from "@/types/keyword.types"
// import type { Language } from "@/types/common.types"
import { getApi } from "@/services/api/api"


export const NewKeywordDialog = ({ open, onOpenChange }: NewKeywordDialogProps) => {
    // const [error, setError] = useState()
    // const { languages, languageItems } = useLanguage()
    const [keywords, setKeywords] = useState<string[]>([])
    // const [keyWordloading, setKeywordLoading] = useState(false)
    const [keywordTypes, setKeywordTypes] = useState<KeywordType[]>([])
    // const [formData, setFormData] = useState({ name: "", activity_status: true })

    const fetchKeywordTypes = async (): Promise<void> => {
        try {
            const data = await getApi<KeywordType[]>("/keyword-types/")
            setKeywordTypes(data)

        } catch (error) {
            console.log(error)
            onOpenChange(false)
        }
    }

    const keywordTypeItems = keywordTypes.map((keywordType) => ({
        value: keywordType.id,
        label: keywordType.name
    }))

    useEffect(() => {
        fetchKeywordTypes()
    }, [])

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl" data-lang="rtl">
                <form onSubmit={handleSubmit} id="CreateForm">
                    <DialogHeader>
                        <DialogTitle>افزودن کلیدواژه جدید</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className="py-5">
                        <Field data-invalid="">
                            <Label htmlFor="name">نام</Label>
                            <Input id="name" name="name" />
                            {/* {error?.name && <FieldDescription className="text-right">{error?.name}</FieldDescription>} */}
                        </Field>
                        <Field>
                            <Label>زبان</Label>
                            {/* <Select items={languageItems}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="انتخاب زبان" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {languageItems.map((language) => (
                                            <SelectItem key={language.value} value={language.value}>
                                                {language.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select> */}
                        </Field>
                        <Field>
                            <Label>نوع</Label>
                            <Select items={keywordTypeItems}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="انتخاب نوع" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {keywordTypeItems.map((keywordType) => (
                                            <SelectItem key={keywordType.value} value={keywordType.value}>
                                                {keywordType.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label>کلمات</Label>
                            <TagInput value={keywords} onChange={setKeywords} placeholder="وارد کردن کلمات..." />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">بستن</Button>
                        </DialogClose>
                        {/* <Button type="submit" className="w-32" disabled={keyWordloading}>
                            {keyWordloading && <Spinner data-icon="inline-start" />}
                            {keyWordloading ? 'در حال ثبت ...' : 'ثبت کلیدواژه'}
                        </Button> */}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}