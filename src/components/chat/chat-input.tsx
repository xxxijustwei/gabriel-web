"use client";

import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type ChatInputContextType = {
    isLoading: boolean;
    value: string;
    setValue: (value: string) => void;
    maxHeight: number | string;
    onSubmit?: () => void;
    disabled?: boolean;
};

const ChatInputContext = createContext<ChatInputContextType>({
    isLoading: false,
    value: "",
    setValue: () => {},
    maxHeight: 240,
    onSubmit: undefined,
    disabled: false,
});

function useChatInput() {
    const context = useContext(ChatInputContext);
    if (!context) {
        throw new Error("useChatInput must be used within a ChatInput");
    }
    return context;
}

type ChatInputProps = {
    isLoading?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    maxHeight?: number | string;
    onSubmit?: () => void;
    children: React.ReactNode;
    className?: string;
};

function ChatInput({
    className,
    isLoading = false,
    maxHeight = 240,
    value,
    onChange,
    onSubmit,
    children,
}: ChatInputProps) {
    const [internalValue, setInternalValue] = useState(value || "");

    const handleChange = (newValue: string) => {
        setInternalValue(newValue);
        onChange?.(newValue);
    };

    return (
        <TooltipProvider>
            <ChatInputContext.Provider
                value={{
                    isLoading,
                    value: value ?? internalValue,
                    setValue: onChange ?? handleChange,
                    maxHeight,
                    onSubmit,
                }}
            >
                <div
                    className={cn(
                        "border-input bg-background rounded-3xl border p-2 shadow-xs",
                        className,
                    )}
                >
                    {children}
                </div>
            </ChatInputContext.Provider>
        </TooltipProvider>
    );
}

export type ChatInputTextareaProps = {
    disableAutosize?: boolean;
} & React.ComponentProps<typeof Textarea>;

function ChatInputTextarea({
    className,
    onKeyDown,
    disableAutosize = false,
    ...props
}: ChatInputTextareaProps) {
    const { value, setValue, maxHeight, onSubmit, disabled } = useChatInput();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (disableAutosize) return;

        if (!textareaRef.current) return;
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
            typeof maxHeight === "number"
                ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
                : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
    }, [value, maxHeight, disableAutosize]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            onSubmit?.();
        }
        onKeyDown?.(e);
    };

    return (
        <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
                "text-muted-foreground text-lg min-h-12 w-full resize-none border-none bg-transparent shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                className,
            )}
            rows={1}
            disabled={disabled}
            {...props}
        />
    );
}

type ChatInputActionsProps = React.HTMLAttributes<HTMLDivElement>;

function ChatInputActions({
    children,
    className,
    ...props
}: ChatInputActionsProps) {
    return (
        <div className={cn("flex items-center gap-2", className)} {...props}>
            {children}
        </div>
    );
}

type ChatInputActionProps = {
    className?: string;
    tooltip: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
} & React.ComponentProps<typeof Tooltip>;

function ChatInputAction({
    tooltip,
    children,
    className,
    side = "top",
    ...props
}: ChatInputActionProps) {
    const { disabled } = useChatInput();

    return (
        <Tooltip {...props}>
            <TooltipTrigger asChild disabled={disabled}>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} className={className}>
                {tooltip}
            </TooltipContent>
        </Tooltip>
    );
}

export { ChatInput, ChatInputTextarea, ChatInputActions, ChatInputAction };
