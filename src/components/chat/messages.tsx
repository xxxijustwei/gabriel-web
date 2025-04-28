import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { cn } from "@/lib/utils";
import type { UseChatHelpers } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import equal from "fast-deep-equal";
import { AlertCircle } from "lucide-react";
import { memo, useEffect } from "react";
import { Badge } from "../ui/badge";
import { PreviewMessage, ThinkingMessage } from "./message";
import { Welcome } from "./welcome";

interface MessagesProps {
    status: UseChatHelpers["status"];
    messages: Array<UIMessage>;
    error?: Error;
}

function PureMessages({ status, messages, error }: MessagesProps) {
    const { containerRef, endRef, scrollToBottom } =
        useScrollToBottom<HTMLDivElement>();

    useEffect(() => {
        if (messages.length <= 0) return;
        if (messages[messages.length - 1].role === "user") {
            scrollToBottom();
        }
    }, [messages, scrollToBottom]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "flex flex-col min-w-0 gap-6 pt-4 w-full max-w-3xl mx-auto",
                messages.length > 0 ? "flex-1 overflow-y-auto" : "h-1/2",
            )}
        >
            {messages.length === 0 && <Welcome />}

            {messages.map((message, index) => (
                <PreviewMessage
                    key={message.id}
                    message={message}
                    isLoading={
                        status === "streaming" && messages.length - 1 === index
                    }
                />
            ))}

            <div className={cn("w-full px-4", error ? "flex" : "hidden")}>
                <Badge
                    variant="error"
                    className="w-full px-4 py-2 text-sm whitespace-break-spaces items-start"
                >
                    <AlertCircle className="size-5 min-w-5 mr-1.5" />
                    {error?.message}
                </Badge>
            </div>

            {status === "submitted" &&
                messages.length > 0 &&
                messages[messages.length - 1].role === "user" && (
                    <ThinkingMessage />
                )}

            <div ref={endRef} className="shrink-0 min-w-2 min-h-2" />
        </div>
    );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
    if (prevProps.status !== nextProps.status) return false;
    if (prevProps.status && nextProps.status) return false;
    if (prevProps.messages.length !== nextProps.messages.length) return false;
    if (!equal(prevProps.messages, nextProps.messages)) return false;

    return true;
});
