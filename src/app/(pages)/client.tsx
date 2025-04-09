"use client";

import {
    ChatInput,
    ChatInputActions,
    ChatInputTextarea,
} from "@/components/chat/chat-input";
import { Messages } from "@/components/chat/messages";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Send, Square } from "lucide-react";

export const Client = () => {
    const { status, messages, input, setInput, append, stop } = useChat({
        api: "http://localhost:8080/api/chat",
    });

    const onSubmit = () => {
        if (status !== "ready") return;
        append({
            role: "user",
            content: input,
        });
        setInput("");
    };

    return (
        <div
            className={cn(
                "w-full max-w-4xl px-8 flex flex-col gap-4 p-4",
                messages.length > 0 && "h-dvh",
            )}
        >
            <Messages status={status} messages={messages} />
            <ChatInput
                value={input}
                onChange={setInput}
                className="w-full"
                onSubmit={onSubmit}
            >
                <ChatInputTextarea
                    className="max-h-32"
                    placeholder="Ask me anything..."
                />
                <ChatInputActions className="flex items-center justify-end gap-2 pt-2">
                    <Button
                        variant="default"
                        size="icon"
                        className="h-8 w-8 rounded-full cursor-pointer"
                        onClick={() => {
                            if (status !== "ready") {
                                stop();
                                return;
                            }
                            onSubmit();
                        }}
                    >
                        {status !== "ready" ? (
                            <Square className="size-5 fill-current" />
                        ) : (
                            <ArrowUp className="size-5" />
                        )}
                    </Button>
                </ChatInputActions>
            </ChatInput>
        </div>
    );
};
