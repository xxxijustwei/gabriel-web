"use client";

import { useDataStream } from "@/hooks/use-data-stream";
import type { JSONValue } from "ai";
import { useEffect, useRef } from "react";

export type DataStreamDelta = {
    type:
        | "id"
        | "symbol"
        | "interval"
        | "amount"
        | "text-delta"
        | "clear"
        | "finish";
    content: string;
};

export const DataStreamHandler = ({ data }: { data: JSONValue[] }) => {
    const { streamData, setStreamData } = useDataStream();
    const lastIndex = useRef(-1);

    useEffect(() => {
        if (data.length === 0) return;

        const newDeltas = data.slice(
            lastIndex.current + 1,
        ) as DataStreamDelta[];
        lastIndex.current = data.length - 1;

        for (const delta of newDeltas) {
            if (delta.type === "clear") {
                setStreamData({
                    id: "",
                    symbol: "",
                    interval: "",
                    amount: "",
                    content: "",
                    status: "streaming",
                });
                continue;
            }

            if (delta.type === "finish") {
                setStreamData((prev) => ({
                    ...prev,
                    status: "idle",
                }));
                continue;
            }

            if (delta.type === "text-delta") {
                setStreamData((prev) => ({
                    ...prev,
                    content: prev.content + delta.content,
                }));
                continue;
            }

            setStreamData((prev) => ({
                ...prev,
                [delta.type]: delta.content,
            }));
        }
    }, [data, streamData, setStreamData]);

    return <></>;
};
