"use client";

import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import equal from "fast-deep-equal";
import { AnimatePresence, motion } from "framer-motion";
import { Accessibility, Check, Loader2 } from "lucide-react";
import { memo } from "react";
import { Markdown } from "./markdown";

const PurePreviewMessage = ({
    isLoading,
    message,
}: {
    isLoading: boolean;
    message: UIMessage;
}) => {
    return (
        <AnimatePresence>
            <motion.div
                className="w-full px-4 group/message"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                data-role={message.role}
            >
                <div className="flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:w-fit">
                    {message.role === "assistant" && (
                        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
                            <div className="translate-y-px">
                                <Accessibility
                                    size={24}
                                    className={isLoading ? "animate-spin" : ""}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                        {message.parts.map((item, index) => {
                            const { type } = item;
                            const key = `msg-${message.id}-p-${index}`;

                            if (type === "tool-invocation") {
                                const { toolInvocation } = item;
                                const { state } = toolInvocation;
                                return (
                                    <div
                                        key={key}
                                        className="flex gap-2 items-center w-full py-1"
                                    >
                                        <Loader2
                                            className={cn(
                                                "size-5 animate-spin",
                                                state === "result" && "hidden",
                                            )}
                                        />
                                        <Check
                                            className={cn(
                                                "size-5",
                                                state === "call" && "hidden",
                                            )}
                                        />
                                        <div className="flex flex-col gap-4 text-muted-foreground">
                                            Calling Tool...
                                        </div>
                                    </div>
                                );
                            }
                            if (type === "text") {
                                return (
                                    <div
                                        key={key}
                                        className={cn(
                                            "flex flex-col gap-4",
                                            message.role === "user" &&
                                                "bg-primary text-primary-foreground px-3 py-2 rounded-xl",
                                        )}
                                    >
                                        <Markdown>{item.text}</Markdown>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export const PreviewMessage = memo(
    PurePreviewMessage,
    (prevProps, nextProps) => {
        if (prevProps.isLoading !== nextProps.isLoading) return false;
        if (prevProps.message.id !== nextProps.message.id) return false;
        if (!equal(prevProps.message.parts, nextProps.message.parts))
            return false;

        return true;
    },
);

export const ThinkingMessage = () => {
    const role = "assistant";

    return (
        <motion.div
            className="w-full px-4 group/message"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
            data-role={role}
        >
            <div
                className={cn(
                    "flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
                    {
                        "group-data-[role=user]/message:bg-muted": true,
                    },
                )}
            >
                <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
                    <Accessibility size={24} className="animate-spin" />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col gap-4 text-muted-foreground">
                        Waiting...
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
