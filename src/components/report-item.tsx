import { Markdown } from "@/components/chat/markdown";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDisclosure } from "@/hooks/use-disclosure";
import dayjs from "dayjs";

export interface ReportItemProps {
    id: string;
    symbol: string;
    interval: string;
    limit: number;
    content: string;
    createdAt: string;
}

export const ReportItem = (item: ReportItemProps) => {
    const { symbol, interval, content, createdAt } = item;
    const { open, onOpen, onOpenChange } = useDisclosure();

    return (
        <div
            className="aspect-[1/1.4] rounded-lg p-4 bg-background border border-border shadow-md cursor-pointer"
            onClick={onOpen}
        >
            <div className="flex flex-col gap-3 h-full">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap gap-2">
                        <Badge>{symbol}</Badge>
                        <Badge>{interval}</Badge>
                    </div>
                </div>
                <div className="border border-gray-300 bg-secondary/30 rounded-md overflow-hidden">
                    <div className="p-2 whitespace-pre-wrap text-sm text-muted-foreground">
                        {content}
                    </div>
                </div>
                <div className="flex justify-end">
                    <Badge variant="neutral">
                        {dayjs(createdAt).format("DD/MM/YYYY HH:mm")}
                    </Badge>
                </div>
            </div>
            {open && (
                <ReportDialog
                    item={item}
                    open={open}
                    onOpenChange={onOpenChange}
                />
            )}
        </div>
    );
};

interface ReportDialogProps {
    item: ReportItemProps;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ReportDialog = ({ item, open, onOpenChange }: ReportDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="hidden" />
                    <DialogDescription className="hidden" />
                </DialogHeader>
                <div className="h-[70vh] overflow-y-auto">
                    <div className="flex flex-col gap-4 p-2">
                        <Markdown>{item.content}</Markdown>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
