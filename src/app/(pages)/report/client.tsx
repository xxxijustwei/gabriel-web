"use client";

import { type AnalysisReport, ReportItem } from "@/components/report-item";
import { Pagination } from "@/components/wed/pagination";
import { getReq } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Inbox, Loader } from "lucide-react";
import { useState } from "react";

interface TaskReportsProps {
    list: AnalysisReport[];
    total: number;
}

export const Client = () => {
    const [pagination, setPagination] = useState({
        pageNo: 0,
        pageSize: 8,
    });

    const { isFetched, data } = useQuery({
        queryKey: ["task-report", pagination],
        queryFn: async () => {
            return await getReq<TaskReportsProps>({
                path: "/api/analysis-report/list",
                params: {
                    category: "task",
                    page_no: pagination.pageNo,
                    page_size: pagination.pageSize,
                },
            });
        },
        placeholderData: keepPreviousData,
    });

    if (!isFetched && !data) {
        return (
            <div className="flex flex-col justify-center items-center h-full gap-4">
                <Loader className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (isFetched && data?.list.length === 0) {
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
        <div className="w-full h-full py-4 flex flex-col items-center gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
                {data?.list.map((item) => (
                    <ReportItem key={item.id} data={item} />
                ))}
                {!isFetched && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <Loader className="w-8 h-8 animate-spin" />
                    </div>
                )}
            </div>
            <Pagination
                currentPage={pagination.pageNo}
                totalPages={Math.ceil((data?.total ?? 0) / pagination.pageSize)}
                onChange={(pageNo) => {
                    setPagination((prev) => ({
                        ...prev,
                        pageNo,
                    }));
                }}
            />
        </div>
    );
};
