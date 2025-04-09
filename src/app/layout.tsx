import type { Metadata } from "next";
import "@/styles/globals.css";
import { unboundedFont } from "@/fonts";
import { Geist_Mono } from "next/font/google";

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
            <body className="font-unbounded">{children}</body>
        </html>
    );
};

export default RootLayout;
