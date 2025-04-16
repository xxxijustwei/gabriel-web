"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <div className="w-full h-svh flex flex-col items-center justify-center z-30">
            <Tabs className="p-2" defaultValue={pathname}>
                <TabsList>
                    <TabsTrigger value="/">
                        <Link href="/">Chat</Link>
                    </TabsTrigger>
                    <TabsTrigger value="/report" asChild>
                        <Link href="/report">Report</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="w-full flex-1 overflow-auto">
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </div>
        </div>
    );
};

export default Layout;
