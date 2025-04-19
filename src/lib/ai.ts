import type { Message } from "ai";

import type { UIMessage } from "ai";

type ErrorPart = {
    type: "error";
    text: string;
};

type CustomParts = UIMessage["parts"][number] | ErrorPart;

interface CustomMessage extends Omit<Message, "parts"> {
    parts: Array<CustomParts>;
}

type CustomUIMessage = CustomMessage & {
    parts: Array<CustomParts>;
};

export type { CustomMessage, CustomUIMessage, CustomParts, ErrorPart };
