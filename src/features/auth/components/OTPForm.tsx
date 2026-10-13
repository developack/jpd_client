import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { Spinner } from "@/components/ui/spinner"
import { Field, FieldDescription } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useAuth } from "@/features/auth/hooks/useAuth"
import type { OTPFormProps, OTPErrors, AuthTokens, OTPErrorResponse } from "@/features/auth/types/auth.types"
import { postApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export function OTPForm({ setAuthStep, token }: OTPFormProps) {
    const otpResendSeconds = 120
    const { login } = useAuth()
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<OTPErrors>()
    const [countdown, setCountdown] = useState(otpResendSeconds)
    const [resendLoading, setResendLoading] = useState(false)

    useEffect(() => {
        if (countdown === 0) return

        const timer = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [countdown])

    const formValidation = (): OTPErrors => {
        const errors: OTPErrors = {}

        if (otp.length < 6) {
            errors.otp = "وارد کردن کد تایید الزامی می‌باشد"
        }
        return errors
    }

    const handleVerify2FA = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        const errors = formValidation()
        if (Object.keys(errors).length > 0) {
            setError(errors)
            return
        }

        try {
            setError({ otp: "" })
            setLoading(true)
            const response: AuthTokens = await postApi("/verify-2fa/", { code: otp, token: token })
            login(response)

            toast.add({
                type: "success",
                description: "ورود شما با موفقیت انجام شد",
            })
            navigate("/")

        } catch (error) {
            let message = "خطا در برقراری ارتباط با سرور"

            if (error instanceof ApiError) {
                message = error.message

                const data = error.data as OTPErrorResponse
                if (data.invalid_auth) {
                    setAuthStep("login")
                    return
                }
            }

            toast.add({
                type: "error",
                description: message,
            })

        } finally {
            setLoading(false)
        }
    }

    const handleResend2FA = async (): Promise<void> => {

        try {
            setResendLoading(true)
            await postApi("/resend-2fa/", { token })

            setCountdown(otpResendSeconds)
            toast.add({
                type: "success",
                description: "کد تأیید جدید برای شما ارسال شد",
            })

        } catch (error) {
            let message = "خطا در برقراری ارتباط با سرور"

            if (error instanceof ApiError) {
                message = error.message
            }

            toast.add({
                type: "error",
                description: message,
            })

        } finally {
            setResendLoading(false)
        }

    }

    return (
        <form onSubmit={handleVerify2FA}>
            <div className="flex items-center gap-2 mb-8">
                <Button onClick={() => setAuthStep("login")} variant="ghost" className="px-2">
                    <ArrowRight className="size-4" />
                </Button>
                <Link to="/" className='flex items-end gap-2'>
                    <img className='w-6.5' src="/logo.svg" alt="logo" />
                    <span className='font-bold'>جیـکاپیـــک</span>
                </Link>
            </div>
            <div className="space-y-1.5">
                <h1 className="font-black text-3xl">ورود | ثبت نام</h1>
                <p className="text-text-secondary text-sm">ورود به سامانه جیکاپیک، امکان ورود به صورت احرازهویت دوعاملی</p>
            </div>
            <p className="text-lg font-bold mt-8">کد تایید را وارد کنید</p>
            <div className="flex flex-col gap-5 mt-4">
                <Field>
                    <InputOTP id="digits-only" className="w-full" maxLength={6} value={otp}
                        onChange={(value) => { setOtp(value); setError({ otp: "" }) }} pattern={REGEXP_ONLY_DIGITS}>
                        <InputOTPGroup className="flex-row-reverse w-full gap-2 ring-0! outline-none!">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <InputOTPSlot index={index} className="w-full flex-1 h-12 text-lg rounded-lg border" aria-invalid={!!error?.otp} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                    {error?.otp && <FieldDescription className="text-right">{error?.otp}</FieldDescription>}
                </Field>

                {resendLoading ? (<p className="text-xs text-center text-text-secondary my-5">در حال ارسال مجدد کد تایید ...</p>) : (
                    countdown === 0
                        ? (<Button variant="link" onClick={handleResend2FA} className="text-xs text-text cursor-pointer my-2.5">ارسال مجدد کد تایید</Button>)
                        : (<p className="text-xs text-center text-text-secondary my-5">ارسال مجدد کد تا {countdown} ثانیه دیگر</p>)
                    )
                }
                <Button type="submit" className="text-white p-4" disabled={loading}>
                    {loading && <Spinner data-icon="inline-start" />}
                    {loading ? 'در حال ورود به سامانه ...' : 'تایید و ادامه'}
                </Button>
            </div>
        </form>
    )
}