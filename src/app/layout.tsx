import type { Metadata } from "next";
import "@/styles/globals.css";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { unboundedFont } from "@/fonts";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Gabriel",
    description: "Gabriel",
};

const monoFont = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html
            lang="en"
            className={`${unboundedFont.variable} ${monoFont.variable}`}
        >
            <body className="font-unbounded">
                <div className="relative grid h-full flex-1 place-items-center overflow-hidden">
                    {children}
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
                <Toaster />
            </body>
        </html>
    );
};

export default RootLayout;
