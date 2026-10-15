export type LoginInputs = {
    email: string,
    password: string
    captcha: string
}

export type LoginErrors = {
    email?: string,
    password?: string
    captcha?: string
}

export type OTPErrors = {
    otp?: string
}

export type AuthStep = "login" | "otp"

export type LoginFormProps = {
    setAuthStep: React.Dispatch<React.SetStateAction<AuthStep>>
    setTwoFactorToken: React.Dispatch<React.SetStateAction<string>>
}

export type OTPFormProps = {
    setAuthStep: React.Dispatch<React.SetStateAction<AuthStep>>
    token: string
}

export type AuthTokens = {
    access: string
    refresh: string
}

export type LoginSuccessResponse = AuthTokens & {
    requires_2fa: false,
}

export type TwoFactorRequired = {
    requires_2fa: true,
    token: string
}

export type LoginResponse =
    | TwoFactorRequired 
    | LoginSuccessResponse

export type LoginErrorResponse = {
    detail: string,
}

export type OTPSuccessResponse = {
    access: string,
    refresh: string
}

export type OTPErrorResponse = {
    detail: string,
    invalid_auth?: boolean
}

export type RefreshAccessTokenResponse = {
    access: string
}

export type CaptchaData = {
    captcha_hashkey: string
    captcha_image_url: string
}