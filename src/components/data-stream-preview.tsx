"use client";

import { useDataStream } from "@/hooks/use-data-stream";
import { MemoizedMarkdown } from "./chat/markdown";

interface DataStreamPreviewProps {
    id: string;
    result?: string;
}

export const DataStreamPreview = ({ id, result }: DataStreamPreviewProps) => {
    const {
        streamData: { status, content },
    } = useDataStream();

    if (result) {
        return <MemoizedMarkdown content={result} id={id} />;
    }

    return (
        <MemoizedMarkdown
            content={status === "streaming" ? content : ""}
            id={id}
        />
    );
};
