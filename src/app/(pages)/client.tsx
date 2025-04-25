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
import type React from "react";

export const Client = () => {
    const {
        status,
        messages,
        input,
        error,
        setInput,
        setMessages,
        append,
        stop,
    } = useChat({
        api: `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
    });

    const isSubmittable = () => {
        return ["ready", "error"].includes(status);
    };

    const onSubmit = () => {
        if (!isSubmittable()) return;

        if (error != null) {
            setMessages(messages.slice(0, -1));
        }

        append({
            role: "user",
            content: input,
        });
        setInput("");
    };

    return (
        <>
            <Messages status={status} messages={messages} error={error} />
            <div className="flex flex-col gap-2 p-2 lg:pb-4 w-full max-w-3xl mx-auto">
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
                                if (status === "streaming") {
                                    stop();
                                    return;
                                }
                                onSubmit();
                            }}
                        >
                            {!isSubmittable() ? (
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
