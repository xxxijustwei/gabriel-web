"use client";

import {
    ChatInput,
    ChatInputActions,
    ChatInputTextarea,
} from "@/components/chat/chat-input";
import { Messages } from "@/components/chat/messages";
import { SuggestionActions } from "@/components/chat/suggestion-actions";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Square } from "lucide-react";

export const Client = () => {
    const { status, messages, input, setInput, append, stop } = useChat({
        api: `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
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
        <>
            <Messages status={status} messages={messages} />
            <div className="flex flex-col gap-2 py-4 w-full max-w-3xl mx-auto">
                <SuggestionActions
                    append={append}
                    className={messages.length > 0 ? "hidden" : ""}
                />
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
        </>
    );
};
