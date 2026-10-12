import { useAuth } from '@/features/auth/hooks/useAuth'
import { Skeleton } from '@/components/ui/skeleton'
import { SidebarFooter } from '@/components/ui/sidebar'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Sparkles, CircleUser, LogOut, ChevronsUpDown, CreditCard, Bell, } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'



export function PanelSidebarFooter() {
    const { user, logout, loading } = useAuth()

    return (
        <SidebarFooter>
            <DropdownMenu>
                {loading
                    ? <div className='flex items-center gap-2 h-13 w-full p-2'>
                        <Skeleton className='h-8 w-8 shrink-0 rounded-full' />
                        <div className='flex flex-col gap-2 w-full'>
                            <Skeleton className='h-2 w-[50%] rounded-xl' />
                            <Skeleton className='h-2 w-full rounded-xl' />
                        </div>
                    </div>
                    : <DropdownMenuTrigger>
                        <div className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent">
                            <Avatar className="size-8">
                                <AvatarImage src="/img/avatar.png" />
                                <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>

                            <div className="flex min-w-0 flex-1 flex-col text-right">
                                <span className="truncate text-sm font-medium">{user?.username}</span>
                                <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                            </div>

                            <ChevronsUpDown className='size-4' />
                        </div>
                    </DropdownMenuTrigger>}

                <DropdownMenuContent side="top" align="end" className="w-56 ring-0 border border-border">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex items-center gap-2">
                                <Avatar className="size-8">
                                    <AvatarImage src="/img/avatar.png" />
                                    <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex min-w-0 flex-col">
                                    <span className="truncate text-sm font-medium">{user?.username}</span>
                                    <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Sparkles />
                            ارتقا به نسخه حرفه‌ای
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <CircleUser />
                            حساب کاربری
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <CreditCard />
                            صورت‌حساب
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Bell />
                            اعلان‌ها
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem variant="destructive" onClick={logout}>
                        <LogOut className='stroke-destructive' />
                        خروج از حساب
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
    )
}