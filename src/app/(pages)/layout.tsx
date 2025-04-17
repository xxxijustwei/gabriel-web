"use client";

import { SiteHeader } from "@/components/site-header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-dvh z-50">
            <SiteHeader />
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </div>
    );
};

export default Layout;
