import { BASE_API_URL } from "@/config/api"
import { getApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"
import { getTokens, saveTokens } from "@/features/auth/utils/token"
import type { UserProfileType } from "@/features/auth/types/context.types"
import type { RefreshAccessTokenResponse } from "@/features/auth/types/auth.types"


export const refreshAccessToken = async (): Promise<boolean> => {

    const tokens = getTokens()
    if (!tokens) {
        return false
    }

    const { refresh } = tokens
    try {
        const response = await fetch(`${BASE_API_URL}/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refresh })
        })

        const data: RefreshAccessTokenResponse = await response.json()

        if (!response.ok) {
            throw new ApiError("Refresh token is invalid or expired", response.status, {
                error: {
                    code: "invalid_refresh_token",
                    message: "Refresh token is invalid or expired",
                },
            })
        }

        saveTokens({ access: data.access, refresh: refresh })
        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

export const getCurrentUser = async (): Promise<UserProfileType | null> => {
    return await getApi("/auth/profile/")
}