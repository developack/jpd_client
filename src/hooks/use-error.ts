import { useState } from "react"
import { ApiError } from "@/services/api/ApiError"


type ErrorFields = Record<string, string>

export const useError = () => {
    const [message, setMessage] = useState("")
    const [code, setCode] = useState("")
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
            setCode(code)
            setFields(fieldErrors)

            return {
                message,
                code: code,
                fields: fieldErrors,
            }
        }

        const message = "خطا در برقراری ارتباط با سرور"

        setMessage(message)
        setCode("unknown_error")
        setFields({})

        return {message, code: "unknown_error", fields: {}}
    }

    return {message, code, fields, handleError}
}