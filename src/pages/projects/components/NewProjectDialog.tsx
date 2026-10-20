import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ApiError } from "@/services/api/ApiError"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Project, NewProjectDialogProps, NewProjectErrors } from "@/types/project.types"
import { postApi } from "@/services/api/api"


export const NewProjectDialog = ({ onProjectCreated, onDialogOpen }: NewProjectDialogProps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<NewProjectErrors>()
    const [formData, setFormData] = useState({name: "", activity_status: true})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setError((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleActivityStatusChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, activity_status: checked }))
    }

    const formValidation = (): NewProjectErrors => {
        const errors: NewProjectErrors = {}
        if (!formData.name.trim()) {
            errors.name = "وارد کردن نام پروژه الزامی است"
        }
        return errors
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        const errors = formValidation()
        if (Object.keys(errors).length > 0) {
            setError(errors)
            return
        }
        setLoading(true)
        try {
            const response: Project = await postApi("/projects/", {...formData, created: new Date()})
            onProjectCreated(response)
            onDialogOpen(false)
            setFormData({name: "", activity_status: true})
            toast.add({
                type: "success",
                description: `پروژه "${formData.name}" با موفقیت ایجاد شد`,
            })

        } catch (error) {
            if (error instanceof ApiError) {
                const fields = error.data.error.fields
        
                if (fields?.name?.length) {
                    setError({
                        name: fields.name[0],
                    })
                } else {
                    toast.add({
                        type: "error",
                        description: error.data.error.message || "ایجاد پروژه با مشکل مواجه شد.",
                    })
                }
            } else {
                toast.add({
                    type: "error",
                    description: "خطا در برقراری ارتباط با سرور",
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <DialogContent dir="rtl" data-lang="rtl">
            <form id="CreateForm" onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>افزودن پروژه جدید</DialogTitle>
                </DialogHeader>
                <FieldGroup className="py-5">
                    <Field data-invalid={!!error?.name}>
                        <Label htmlFor="name">نام</Label>
                        <Input id="name" name="name" onChange={handleChange} value={formData.name} aria-invalid={!!error?.name} />
                        {error?.name && <FieldDescription className="text-right">{error?.name}</FieldDescription>}
                    </Field>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="activity_status">فعال / غیرفعال</Label>
                        <Checkbox id="activity_status" name="activity_status" onCheckedChange={handleActivityStatusChange} checked={formData.activity_status} />
                    </div>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">بستن</Button>
                    </DialogClose>
                    <Button type="submit" className="w-32" disabled={loading}>
                        {loading && <Spinner data-icon="inline-start" />}
                        {loading ? 'در حال ثبت ...' : 'ثبت پروژه'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}