import { useState } from "react"
import { ApiError } from "@/services/api/ApiError"

type ErrorFields<T> = Partial<Record<keyof T, string>>

export const useError = <T extends Record<string, string>> (initialValues: T) => {
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const [fields, setFields] = useState<T>(initialValues)
    const [error, setError] = useState<ErrorFields<T>>({})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target
        setFields((prev) => ({ ...prev, [name]: value }))
        setError((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleError = (error: unknown) => {
        if (error instanceof ApiError) {
            setMessage(error.data.error.message)
            setType(error.data.error.code)
            const serverErrors = Object.fromEntries(
                Object.entries(error.data.error.fields ?? {}).map(([key, messages]) => [
                    key,
                    messages[0],
                ])
            ) as ErrorFields<T>
            setError((prev) => ({...prev, ...serverErrors}))
        }
    }

    return {
        type,
        message,
        fields,
        setFields,
        error,
        setError,
        handleChange,
        handleError,
    }
}