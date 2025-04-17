"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useDisclosure } from "@/hooks/use-disclosure";
import { getReq, putReq } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Settings } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const Interval = [
    "1m",
    "5m",
    "15m",
    "30m",
    "1h",
    "4h",
    "6h",
    "12h",
    "1d",
] as const;
type IntervalType = (typeof Interval)[number];

interface TaskConfig {
    symbol: string;
    interval: IntervalType;
    limit: number;
}

const queryData = async () => {
    return await getReq<TaskConfig>({
        path: "/api/task-config",
    });
};

export const AdjustConfigButton = () => {
    const queryClient = useQueryClient();
    const { open, onOpenChange, onClose } = useDisclosure();

    const { data, isSuccess } = useQuery({
        queryKey: ["task-config"],
        queryFn: queryData,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const formSchema = z.object({
        symbol: z
            .string({
                required_error: "Symbol is required",
            })
            .min(1, {
                message: "Symbol cannot be empty",
            }),
        interval: z.enum(Interval, {
            required_error: "Interval is required",
        }),
        limit: z.coerce
            .number({
                required_error: "Limit is required",
                invalid_type_error: "Limit must be a number",
            })
            .int()
            .positive({
                message: "Limit must be positive",
            })
            .min(4, {
                message: "Limit must be at least 4",
            }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            symbol: undefined,
            interval: undefined,
            limit: 4,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await putReq<TaskConfig>({
            path: "/api/task-config",
            data: {
                ...values,
                symbol: values.symbol.toUpperCase(),
            },
        });
        onClose();
        queryClient.setQueryData(["task-config"], result);
        toast.success("Config updated");
    };

    useEffect(() => {
        if (isSuccess && data) {
            form.reset(data);
        }
    }, [isSuccess, data]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Settings className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Task Config</DialogTitle>
                    <DialogDescription>
                        Adjust the task config
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="symbol"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Symbol</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="interval"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Interval</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select interval" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Interval.map((interval) => (
                                                    <SelectItem
                                                        key={interval}
                                                        value={interval}
                                                    >
                                                        {interval}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="limit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Limit</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                <Loader2
                                    className={cn(
                                        "w-4 h-4 animate-spin",
                                        !form.formState.isSubmitting &&
                                            "hidden",
                                    )}
                                />
                                <span>Submit</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
