import { useState } from "react"
import { useError } from "./use-error"


type FormErrors<T> = Partial<Record<keyof T, string>>

export const useForm = <T extends Record<string, string>>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues)
    const [error, setError] = useState<FormErrors<T>>({})
    const {message, type, fields, handleError} = useError()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target
        setValues((prev) => ({...prev, [name]: value}))
        setError((prev) => ({...prev, [name]: undefined}))
    }

    const handleFormError = (error: unknown) => {
        const result = handleError(error)
        setError(result.fields as FormErrors<T>)
        return result
    }

    return {
        values,
        setValues,
        error,
        setError,
        handleChange,
        message,
        type,
        fields,
        handleError,
        handleFormError,
    }
}