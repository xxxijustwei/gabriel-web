import type { Metadata } from "next";
import "@/styles/globals.css";
import { unboundedFont } from "@/fonts";

export const metadata: Metadata = {
    title: "Gabriel",
    description: "Gabriel",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" className={unboundedFont.variable}>
            <body className="font-unbounded">{children}</body>
        </html>
    );
};

export default RootLayout;
