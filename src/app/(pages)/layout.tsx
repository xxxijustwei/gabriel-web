"use client";

import { AdjustConfigButton } from "@/components/adjust-config-button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <div className="w-full h-svh flex flex-col items-center justify-center z-30">
            <QueryClientProvider client={queryClient}>
                <div className="flex items-center gap-3">
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
                    <AdjustConfigButton />
                </div>
                <div className="w-full flex-1 overflow-auto">{children}</div>
            </QueryClientProvider>
        </div>
    );
};

export default Layout;
