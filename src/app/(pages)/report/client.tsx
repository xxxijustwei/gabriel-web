"use client";

import { ReportItem, type ReportItemProps } from "@/components/report-item";
import { getReq } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Inbox, Loader } from "lucide-react";

const queryData = async () => {
    return await getReq<ReportItemProps[]>({
        path: "/api/report/list",
    });
};

export const Client = () => {
    const { isFetched, data } = useQuery({
        queryKey: ["task-report"],
        queryFn: queryData,
    });

    if (!isFetched) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (isFetched && data?.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-full gap-4">
                <Inbox className="w-10 h-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                    No reports found
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.map((item) => (
                    <ReportItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};
