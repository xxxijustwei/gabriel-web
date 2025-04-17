"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SiteHeader = () => {
    return (
        <header className="w-full sticky top-0 z-50 backdrop-blur-sm">
            <div className="w-full flex justify-center py-2">
                <div className="bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]">
                    <MenuItem href="/" name="Chat" />
                    <MenuItem href="/report" name="Report" />
                </div>
            </div>
        </header>
    );
};

export const MenuItem = ({ href, name }: { href: string; name: string }) => {
    const pathname = usePathname();
    return (
        <div
            data-active={pathname === href}
            className={cn(
                "flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow]",
                "data-[active=true]:bg-background data-[active=true]:text-foreground",
            )}
        >
            <Link href={href}>{name}</Link>
        </div>
    );
};
