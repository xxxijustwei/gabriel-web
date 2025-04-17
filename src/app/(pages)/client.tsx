"use client";

import {
    ChatInput,
    ChatInputActions,
    ChatInputTextarea,
} from "@/components/chat/chat-input";
import { Messages } from "@/components/chat/messages";
import { SuggestionActions } from "@/components/chat/suggestion-actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Square } from "lucide-react";

const initialMessages = [
    {
        id: "0",
        role: "user" as const,
        content: "What is the weather in Tokyo?",
    },
    {
        id: "1",
        role: "assistant" as const,
        content: `BTCUSDT 资金流向分析报告
以下是基于过去11根4小时K线数据（2025-04-15 16:00:00 至 2025-04-17 11:59:59）对BTCUSDT现货和期货市场的资金流向深度分析，涵盖主力资金行为、价格阶段判断、短期趋势预判及交易策略建议。

1. 主力资金行为解读
资金流向趋势变化：
现货市场资金流出总额为 -23.65亿USDT，期货市场资金流出总额为 -235.64亿USDT，两者相关性高达 0.9677，表明资金流向高度一致。现货市场主导资金流动（flow_ratio=0.1004），但期货市场流出规模远大于现货，显示杠杆市场抛压更重。

主力资金意图（结合订单簿）：
现货订单簿显示买盘量（279.13 BTC）略高于卖盘量（266.86 BTC），价值不平衡度为 +1.92%，近价区买盘略弱（-6.39%）。期货订单簿则呈现卖盘占优（卖盘量446.79 BTC vs 买盘量406.90 BTC），价值不平衡度为 -4.76%。综合来看，主力资金在期货市场有明显出货迹象，而现货市场可能存在一定吸筹行为，但力度有限。

异常情况：
资金流向与价格变化存在显著背离。现货市场价格下跌 -0.419%，但资金流出趋势在减弱（recent_inflow_trend=0.5556）；期货市场价格下跌 -0.401%，资金流出趋势持续（recent_inflow_trend=0.3333）。此外，多个时间点（如2025-04-16 16:00:00）出现极端净流出，但价格未大幅下跌，暗示主力可能通过洗盘压制价格，诱导散户抛售。

2. 价格阶段判断
现货市场：
当前趋势为 weakening_fall（下跌减弱），置信度 0.36。依据是价格下降但资金流出趋势放缓（价格趋势方向为“up”，相关性-0.2092）。这可能表明价格接近底部区域或进入整理阶段。

期货市场：
当前趋势为 falling（下跌），置信度 0.60。依据是价格和资金流向均呈下降趋势（相关性-0.3836）。期货市场仍处于明显的下跌阶段，抛压较重。
2. 价格阶段判断
现货市场：
当前趋势为 weakening_fall（下跌减弱），置信度 0.36。依据是价格下降但资金流出趋势放缓（价格趋势方向为“up”，相关性-0.2092）。这可能表明价格接近底部区域或进入整理阶段。

期货市场：
当前趋势为 falling（下跌），置信度 0.60。依据是价格和资金流向均呈下降趋势（相关性-0.3836）。期货市场仍处于明显的下跌阶段，抛压较重。2. 价格阶段判断
现货市场：
当前趋势为 weakening_fall（下跌减弱），置信度 0.36。依据是价格下降但资金流出趋势放缓（价格趋势方向为“up”，相关性-0.2092）。这可能表明价格接近底部区域或进入整理阶段。

期货市场：
当前趋势为 falling（下跌），置信度 0.60。依据是价格和资金流向均呈下降趋势（相关性-0.3836）。期货市场仍处于明显的下跌阶段，抛压较重。

阶段差异与轮动关系：
现货市场可能领先于期货市场进入底部整理阶段（资金流向领先价格，lag=-5），而期货市场仍受杠杆抛压影响，短期内可能继续承压。两者阶段差异或暗示现货市场吸筹完成后，资金可能逐步回流期货市场，推动价格反弹。`,
    },
];

export const Client = () => {
    const { status, messages, input, setInput, append, stop } = useChat({
        api: `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
        initialMessages,
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
