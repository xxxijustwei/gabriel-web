import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import type { UseChatHelpers } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import equal from "fast-deep-equal";
import { memo } from "react";
import { PreviewMessage, ThinkingMessage } from "./message";
import { Welcome } from "./welcome";

interface MessagesProps {
    status: UseChatHelpers["status"];
    messages: Array<UIMessage>;
}

function PureMessages({ status, messages }: MessagesProps) {
    const [messagesContainerRef, messagesEndRef] =
        useScrollToBottom<HTMLDivElement>();

    return (
        <div
            ref={messagesContainerRef}
            className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 no-scrollbar"
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

            {status === "submitted" &&
                messages.length > 0 &&
                messages[messages.length - 1].role === "user" && (
                    <ThinkingMessage />
                )}

            <div ref={messagesEndRef} className="shrink-0 min-w-2 min-h-2" />
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
