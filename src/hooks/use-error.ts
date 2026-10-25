import { useState } from "react"
import { ApiError } from "@/services/api/ApiError"


type ErrorFields = Record<string, string>

export const useError = () => {
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const [fields, setFields] = useState<ErrorFields>({})

    const handleError = (error: unknown) => {
        if (error instanceof ApiError) {
            const { message, code, fields } = error.data.error

            const fieldErrors = Object.fromEntries(
                Object.entries(fields ?? {}).map(([key, messages]) => [
                    key,
                    messages[0],
                ])
            )

            setMessage(message)
            setType(code)
            setFields(fieldErrors)

            return {
                message,
                type: code,
                fields: fieldErrors,
            }
        }

        const message = "خطا در برقراری ارتباط با سرور"

        setMessage(message)
        setType("unknown_error")
        setFields({})

        return {message, type: "unknown_error", fields: {}}
    }

    return {message, type, fields, handleError}
}