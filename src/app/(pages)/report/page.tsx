import type { Metadata } from "next";
import { Client } from "./client";

export const metadata: Metadata = {
    title: "Gabriel - Analyze",
    description: "Analyze results",
};

const Page = () => {
    return (
        <div className="w-full h-full p-6 overflow-y-auto">
            <Client />
        </div>
    );
};

export default Page;
