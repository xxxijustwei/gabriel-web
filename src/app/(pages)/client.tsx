"use client";

import { ChatInputBox } from "@/components/chat/chat-input-box";
import { Messages } from "@/components/chat/messages";
import { SuggestionActions } from "@/components/chat/suggestion-actions";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { useChat } from "@ai-sdk/react";
import type React from "react";

export const Client = () => {
    const {
        status,
        messages,
        input,
        error,
        data,
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
            <DataStreamHandler data={data ?? []} />
            <Messages status={status} messages={messages} error={error} />
            <div className="flex flex-col gap-2 p-2 lg:pb-4 w-full max-w-3xl mx-auto">
                <SuggestionActions
                    append={append}
                    className={messages.length > 0 ? "hidden" : ""}
                />
                <ChatInputBox
                    input={input}
                    setInput={setInput}
                    onSubmit={onSubmit}
                    status={status}
                    stop={stop}
                />
            </div>
        </>
    );
};
