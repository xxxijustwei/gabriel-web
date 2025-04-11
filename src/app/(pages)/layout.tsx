"use client";

import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative grid h-full flex-1 place-items-center overflow-hidden">
            <div className="w-full h-svh flex items-center justify-center z-30">
                {children}
            </div>
            <GridPattern
                squares={[
                    [5, 12],
                    [6, 16],
                    [3, 20],
                    [8, 23],
                    [2, 25],
                    [15, 15],
                    [17, 16],
                    [20, 20],
                    [13, 20],
                    [25, 25],
                    [16, 27],
                ]}
                className={cn(
                    "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                    "-inset-y-1/2 inset-x-0 h-[200%] skew-y-12",
                )}
            />
        </div>
    );
};

export default Layout;
