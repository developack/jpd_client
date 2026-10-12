# Import Order

در تمام فایل‌های React، importها باید با ترتیب زیر نوشته شوند:

1. React و کتابخانه‌های اصلی
2. کتابخانه‌های خارجی
3. کامپوننت‌های داخلی
4. Hooks
5. Context
6. Types
7. Utilities
8. Styles



| وضعیت              | شرط                                   | چیزی که نمایش می‌دهیم         |
| ------------------ | ------------------------------------- | ----------------------------- |
| 🦴 Loading         | درخواست هنوز در حال اجراست            | Skeleton rows                 |
| 📋 Success + Data  | درخواست موفق + رکورد داریم            | جدول واقعی                    |
| 📭 Success + Empty | درخواست موفق + رکورد نداریم           | `Empty`                       |
| ❌ Error            | درخواست با خطا مواجه شده              | Error state                   |
| 🌐 Network Error   | اصلاً ارتباط با سرور برقرار نشده      | خطای اتصال                    |
| 🔄 Refetch         | داده داریم ولی دوباره درخواست زده‌ایم | جدول قبلی + loading indicator |
| 📄 Empty Page      | مثلاً صفحه 3 هستیم ولی داده‌ای ندارد  | Empty یا انتقال به صفحه معتبر |


Clean Code → Design → Architecture

1. آیا اسم‌ها واضح هستند؟
2. آیا این بخش فقط یک مسئولیت دارد؟
3. آیا چیزی را بی‌دلیل تکرار کرده‌ام؟
4. آیا راه ساده‌تری وجود دارد؟
5. آیا وابستگی‌ها منطقی هستند؟
6. آیا یک developer دیگر سریع متوجه کد می‌شود؟
7. اگر فردا این قسمت تغییر کند، چند جای پروژه باید دستکاری شود؟


Props Naming Rules

on + EventName

-tasks
--add shadcn drawer components for responsive dialog
--create abstraction for error systems in frontend and react system
--using tanstack query for optimizing api requests