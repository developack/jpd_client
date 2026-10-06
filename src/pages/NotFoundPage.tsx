import { Link } from "react-router"
import { Button } from "@/components/ui/button"


export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-5 h-screen">
            <img className="w-[500px]" src="/../public/img/404.png" alt="404 image" />
            <h1 className="font-black text-2xl">خطای 404</h1>
            <div className="flex flex-col gap-2">
                <p className="text-center font-medium">صفحه‌ای پیدا نشد</p>
                <p className="text-text-secondary text-sm">صفحه درخواستی وجود ندارد. آدرس را بررسی کنید یا به صفحه اصلی بازگردید</p>
            </div>
            <Link to="/">
                <Button className='text-white p-4'>بازگشت به صفحه اصلی</Button>
            </Link>
        </div>
    )
}