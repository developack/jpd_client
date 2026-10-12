import { useState } from "react"
import { OTPForm } from "@/features/auth/components/OTPForm"
import { LoginFrom } from "@/features/auth/components/LoginFrom"
import type { AuthStep } from "@/features/auth/types/auth.types"


export function LoginPage() {
    const [authStep, setAuthStep] = useState<AuthStep>("login")
    const [twoFactorToken, setTwoFactorToken] = useState("")

    return (
        <section className="grid lg:grid-cols-2 items-center h-screen">
            <div className="flex items-center justify-center h-full">
                {authStep == "login" && <LoginFrom setAuthStep={setAuthStep} setTwoFactorToken={setTwoFactorToken} />}
                {authStep == "otp" && <OTPForm setAuthStep={setAuthStep} token={twoFactorToken} />}
            </div>
            <div className="hidden relative overflow-hidden h-full lg:flex items-center justify-center
                            [background-image:radial-gradient(rgba(129,140,248,0.18)_1px,transparent_1px),linear-gradient(160deg,#1A2142_0%,#10152A_100%)]
                            [background-size:24px_24px,100%_100%] [background-repeat:repeat,no-repeat]">
                <div className="w-[350px] h-[350px] rounded-full absolute blur-[160px] bg-primary right-0 bottom-0"></div>
                <img className="w-[500px] select-none" src="/img/login.png" alt="login image" />
                <div className="w-[350px] h-[350px] rounded-full absolute blur-[160px] bg-info left-0 top-0"></div>
            </div>
        </section>
    )
}