import { AdjustConfigButton } from "@/components/adjust-config-button";
import type { Metadata } from "next";
import { Client } from "./client";

export const metadata: Metadata = {
    title: "Report(s)",
};

const Page = () => {
    return (
        <div className="w-full flex flex-col flex-1 max-w-6xl mx-auto px-2 relative">
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold">Task Report(s)</span>
                <AdjustConfigButton />
            </div>
            <Client />
        </div>
    );
};

export default Page;
