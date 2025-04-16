import { AdjustConfigButton } from "@/components/adjust-config-button";
import type { Metadata } from "next";
import { Client } from "./client";

export const metadata: Metadata = {
    title: "Gabriel - Analyze",
    description: "Analyze results",
};

const Page = () => {
    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold">Task Report(s)</span>
                <AdjustConfigButton />
            </div>
            <Client />
        </div>
    );
};

export default Page;
