import { create } from "zustand";

interface State {
    streamData: {
        id: string;
        symbol: string;
        interval: string;
        amount: string;
        content: string;
        status: "streaming" | "idle";
    };
}

interface Action {
    setStreamData: (
        streamData:
            | State["streamData"]
            | ((prev: State["streamData"]) => State["streamData"]),
    ) => void;
}

export const useDataStream = create<State & Action>((set) => ({
    streamData: {
        id: "",
        symbol: "",
        interval: "",
        amount: "",
        content: "",
        status: "idle",
    },
    setStreamData: (streamData) =>
        set((prev) => ({
            streamData:
                typeof streamData === "function"
                    ? streamData(prev.streamData)
                    : streamData,
        })),
}));
