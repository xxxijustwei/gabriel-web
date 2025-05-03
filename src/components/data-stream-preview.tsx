"use client";

import { useDataStream } from "@/hooks/use-data-stream";
import { getReq } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { MemoizedMarkdown } from "./chat/markdown";

interface DataStreamPreviewProps {
    id: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    result?: any;
}

interface AnalysisReportData {
    id: string;
    symbol: string;
    interval: string;
    amount: string;
    content: string;
}

export const DataStreamPreview = ({ id, result }: DataStreamPreviewProps) => {
    const {
        streamData: { status, content },
    } = useDataStream();

    const { isFetched, data } = useQuery({
        queryKey: ["fetch-analysis-report", result],
        queryFn: async () => {
            const response = await getReq<AnalysisReportData>({
                path: "/api/analysis-report",
                params: {
                    id: result.id,
                    category: "chat",
                },
            });

            return response;
        },
        refetchOnWindowFocus: false,
        enabled: !!result && result.id !== "",
    });

    if (result) {
        const getContent = () => {
            if (isFetched && data) {
                return data.content ?? content;
            }
            return content;
        };

        if (result.id === "") return null;

        return (
            <ContentWrapper>
                <MemoizedMarkdown content={getContent()} id={id} />
            </ContentWrapper>
        );
    }

    if (content === "") return null;

    return (
        <ContentWrapper>
            <MemoizedMarkdown
                content={status === "streaming" ? content : ""}
                id={id}
            />
        </ContentWrapper>
    );
};

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col px-6 py-2 rounded-xl border-2 border-border bg-background">
            {children}
        </div>
    );
};
