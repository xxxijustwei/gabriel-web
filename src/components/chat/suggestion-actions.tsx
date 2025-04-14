"use client";

import { cn } from "@/lib/utils";
import type { UseChatHelpers } from "@ai-sdk/react";
import { memo } from "react";
import { Button } from "../ui/button";

interface SuggestionActionsProps {
    className?: string;
    append: UseChatHelpers["append"];
}

const actions = [
    {
        label: "怎么查看代币资金费率",
        prompt: "当前资金费率最高的5个代币",
    },
    {
        label: "分析交易数据",
        prompt: "请帮我分析BTC代币12根4hK线数据的资金流向",
    },
    {
        label: "修改分析任务配置",
        prompt: "帮我修改定时任务配置,将任务名称修改为“ETH代币12根4hK线数据的资金流向”",
    },
    {
        label: "分析任务的配置是什么",
        prompt: "当前分析任务的配置是什么",
    },
];

export const SuggestionActions = ({
    append,
    className,
}: SuggestionActionsProps) => {
    return (
        <div className={cn("grid sm:grid-cols-2 gap-2 w-full", className)}>
            {actions.map((action, index) => (
                <Button
                    key={action.label}
                    variant="ghost"
                    onClick={async () => {
                        append({
                            role: "user",
                            content: action.prompt,
                        });
                    }}
                    className="flex justify-start bg-background hover:bg-background/80 text-left border rounded-lg px-3 py-2 text-base cursor-pointer"
                >
                    <span className="text-muted-foreground">
                        {action.label}
                    </span>
                </Button>
            ))}
        </div>
    );
};
