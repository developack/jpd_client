import { useState, useEffect } from "react"
import { SERVER_BASE_URL } from "@/config/api"
import { useNavigate, Link } from "react-router"
import { RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { useAuth } from "@/features/auth/hooks/useAuth"
import type { LoginInputs, LoginErrors, LoginFormProps, LoginResponse, CaptchaData } from "@/features/auth/types/auth.types"
import { getApi, postApi } from "@/services/api/api"
import { ApiError } from "@/services/api/ApiError"


export function LoginFrom({ setAuthStep, setTwoFactorToken }: LoginFormProps) {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [loginFailed, setLoginFailed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<LoginErrors>()
    const [captchaLoading, setCaptchaLoading] = useState(false)
    const [captcha, setCaptcha] = useState<CaptchaData | null>(null)
    const [inputs, setInputs] = useState<LoginInputs>({ email: "", password: "", captcha: "" })


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target
        setInputs((prev) => ({ ...prev, [name]: value }))
        setError((prev) => ({ ...prev, [name]: undefined }))
    }

    const formValidation = (): LoginErrors => {
        const errors: LoginErrors = {}
        if (!inputs.email.trim()) {
            errors.email = "وارد کردن آدرس ایمیل الزامی است"
        }
        if (!inputs.password.trim()) {
            errors.password = "وارد کردن رمزعبور الزامی است"
        }
        if (!inputs.captcha.trim()) {
            errors.captcha = "وارد کردن متن کپچا الزامی است"
        }
        return errors
    }

    const fetchCaptcha = async (): Promise<void> => {
        setCaptchaLoading(true)

        try {
            const response = await getApi<CaptchaData>("/captcha")
            setCaptcha(response)

        } catch (error) {
            console.log(error)

        } finally {
            setCaptchaLoading(false)
        }
    }

    useEffect(() => {
        fetchCaptcha()
        setLoginFailed(false)
    }, [loginFailed])

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        const errors = formValidation()
        if (Object.keys(errors).length > 0) {
            setError(errors)
            return
        }

        try {
            setLoading(true)
            const response: LoginResponse = await postApi("/login/",
                {
                    email: inputs.email,
                    password: inputs.password,
                    captcha_code: inputs.captcha, 
                    captcha_hashkey: captcha?.captcha_hashkey
                }
            )
            if (response.requires_2fa) {
                setAuthStep("otp")
                setTwoFactorToken(response.token)
                toast.add({
                    type: "success",
                    description: "کد تائید برای شما ارسال گردید",
                })
                return
            }

            login(response)
            toast.add({
                type: "success",
                description: "ورود شما با موفقیت انجام شد",
            })
            navigate("/")

        } catch (error) {
            setLoginFailed(true)
            let message = "خطا در برقراری ارتباط با سرور"

            if (error instanceof ApiError) {
                message = error.message
            }
            toast.add({
                type: "error",
                description: message,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Link to="/" className='flex items-end gap-2 mb-8'>
                <img className='w-6.5' src="/logo.svg" alt="logo" />
                <span className='font-bold'>جیـکاپیـــک</span>
            </Link>
            <div className="space-y-1.5">
                <h1 className="font-black text-3xl">ورود | ثبت نام</h1>
                <p className="text-text-secondary text-sm">ورود به سامانه جیکاپیک، امکان ورود به صورت احرازهویت دوعاملی</p>
            </div>
            <p className="text-text-secondary text-sm mt-8">
                سلام!<br />
                برای ورود به سامانه لطفا آدرس ایمیل و رمزعبور خود را وارد نمایید
            </p>
            <div className="flex flex-col gap-5 mt-8">

                <Field data-invalid={!!error?.email}>
                    <FieldLabel htmlFor="email">آدرس ایمیل</FieldLabel>
                    <Input onChange={handleChange} value={inputs.email} id="email" name="email" type="email" aria-invalid={!!error?.email} />
                    {error?.email && <FieldDescription className="text-right">{error?.email}</FieldDescription>}
                </Field>

                <Field data-invalid={!!error?.password}>
                    <FieldLabel htmlFor="password">رمزعبور</FieldLabel>
                    <Input onChange={handleChange} value={inputs.password} id="password" name="password" type="password" aria-invalid={!!error?.password} />
                    {error?.password && <FieldDescription className="text-right">{error?.password}</FieldDescription>}
                </Field>

                <Field data-invalid={!!error?.captcha}>
                    <div className="flex flex-row gap-5 items-end">
                        <div className="flex flex-col gap-2 flex-[2.5]">
                            <FieldLabel htmlFor="captcha">متن کپچا</FieldLabel>
                            <Input onChange={handleChange} value={inputs.captcha} id="captcha" name="captcha" type="text" aria-invalid={!!error?.captcha} />
                        </div>
                        <div className="flex gap-2.5 justify-end flex-2">
                            <Button onClick={() => fetchCaptcha()} variant="outline">
                                <RefreshCw />
                            </Button>
                            <div className="w-30 h-9 shrink-0">
                                {captchaLoading
                                    ? (<Skeleton className="w-full h-full rounded-lg" />)
                                    : (<img className="w-full h-full rounded-lg" src={`${SERVER_BASE_URL}${captcha?.captcha_image_url}`} alt="کد امنیتی" />)
                                }
                            </div>
                        </div>
                    </div>
                    {error?.captcha && <FieldDescription className="text-right">{error?.captcha}</FieldDescription>}
                </Field>

                <div className="flex gap-2">
                    <Checkbox id="remember-me" />
                    <FieldLabel htmlFor="remember-me">مرا به خاطر بسپار</FieldLabel>
                </div>

                <Button type="submit" className="text-white p-4" disabled={loading}>
                    {loading && <Spinner data-icon="inline-start" />}
                    {loading ? 'در حال بررسی ...' : 'ورود'}
                </Button>

            </div>
        </form>
    )
}