"use client";

import {
    ChatInput,
    ChatInputActions,
    ChatInputTextarea,
} from "@/components/chat-input";
import type { UseChatHelpers } from "@ai-sdk/react";
import { ArrowUp, Square } from "lucide-react";
import { memo } from "react";
import { Button } from "../ui/button";

interface ChatInputBoxProps {
    status: UseChatHelpers["status"];
    input: UseChatHelpers["input"];
    setInput: UseChatHelpers["setInput"];
    stop: UseChatHelpers["stop"];
    onSubmit: () => void;
}

const PureChatInputBox = ({
    input,
    setInput,
    onSubmit,
    status,
    stop,
}: ChatInputBoxProps) => {
    return (
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
                    {!["ready", "error"].includes(status) ? (
                        <Square className="size-5 fill-current" />
                    ) : (
                        <ArrowUp className="size-5" />
                    )}
                </Button>
            </ChatInputActions>
        </ChatInput>
    );
};

export const ChatInputBox = memo(PureChatInputBox, (prevProps, nextProps) => {
    if (prevProps.input !== nextProps.input) return false;
    if (prevProps.status !== nextProps.status) return false;
    return true;
});
