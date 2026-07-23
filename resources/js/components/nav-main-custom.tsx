import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItemWithIcon } from '@/types';

export function NavMainCustom({
    items = [],
    label = 'Platform',
}: {
    items: NavItemWithIcon[];
    label?: string;
}) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-on-surface-variant/60 text-[10px] font-bold tracking-widest uppercase">
                {label}
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                            className={`data-[active=true]:bg-primary-container data-[active=true]:font-bold data-[active=true]:text-on-primary-container data-[active=true]:shadow-sm text-on-surface-variant hover:bg-surface-variant/50`}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && (
                                    <span className="material-symbols-outlined data-[active=true]:fill-1">
                                        {item.icon}
                                    </span>
                                )}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
