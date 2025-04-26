import type { Metadata } from "next";
import "@/styles/globals.css";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { unboundedFont } from "@/fonts";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    keywords: [
        "AI",
        "Web3",
        "Crypto",
        "Exchange",
        "Crypto AI",
        "Crypto Trading AI",
        "Crypto Analysis AI",
        "Web3 AI",
    ],
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@justwei6",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-96x96.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
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
                <div className="relative flex min-h-svh flex-col bg-background">
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
                        )}
                    />
                </div>
                <Toaster />
            </body>
        </html>
    );
};

export default RootLayout;
