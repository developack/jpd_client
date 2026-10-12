import { useState, useEffect } from "react"
import { getApi } from "@/services/api/api"
import type { Language } from "@/types/common.types"


export const useLanguage = () => {
    const [languages, setLanguages] = useState<Language[]>([])
    const [loading, setLoading] = useState(false)

    const fetchLanguages = async (): Promise<void> => {

        setLoading(true)
        try {
            const response = await getApi<Language[]>("/languages/")
            setLanguages(response)
  
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchLanguages()
    }, [])

    const languageItems = languages.map((language) => ({
        value: language.id,
        label: language.name
    }))

    return {languages, loading, languageItems}
}