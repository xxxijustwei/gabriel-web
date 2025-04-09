import localFont from "next/font/local";

export const unboundedFont = localFont({
    src: [
        {
            path: "./Unbounded-ExtraLight.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "./Unbounded-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "./Unbounded-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./Unbounded-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "./Unbounded-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "./Unbounded-Black.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-unbounded",
});
