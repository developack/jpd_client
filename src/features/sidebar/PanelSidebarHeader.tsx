import { Link } from 'react-router'
import { SidebarHeader } from '@/components/ui/sidebar'


export function PanelSidebarHeader() {
    return (
        <SidebarHeader>
            <Link to="/" className='flex items-end gap-2'>
                <img className='w-6.5' src="/logo.svg" alt="logo" />
                <span className='font-bold'>جیـکاپیـــک</span>
            </Link>
        </SidebarHeader>
    )
}