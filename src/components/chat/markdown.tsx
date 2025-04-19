import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";
import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Partial<Components> = {
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={cn(
                "relative rounded bg-[#1e1e1e] text-primary-foreground px-2 py-1 font-mono text-sm whitespace-pre-wrap break-words",
                className,
            )}
            data-line-numbers
            {...props}
        />
    ),
    pre: ({ children }) => <>{children}</>,
    ol: ({ node, children, ...props }) => {
        return (
            <ol className="list-decimal list-outside ml-4" {...props}>
                {children}
            </ol>
        );
    },
    li: ({ node, children, ...props }) => {
        return (
            <li className="py-1" {...props}>
                {children}
            </li>
        );
    },
    ul: ({ node, children, ...props }) => {
        return (
            <ul className="list-decimal list-outside ml-4" {...props}>
                {children}
            </ul>
        );
    },
    strong: ({ node, children, ...props }) => {
        return (
            <span className="font-semibold" {...props}>
                {children}
            </span>
        );
    },
    a: ({ node, children, ...props }) => {
        return (
            // @ts-expect-error
            <Link
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noreferrer"
                {...props}
            >
                {children}
            </Link>
        );
    },
    h1: ({ node, children, ...props }) => {
        return (
            <h1 className="text-3xl font-semibold mt-2 mb-2" {...props}>
                {children}
            </h1>
        );
    },
    h2: ({ node, children, ...props }) => {
        return (
            <h2 className="text-2xl font-semibold mt-2 mb-2" {...props}>
                {children}
            </h2>
        );
    },
    h3: ({ node, children, ...props }) => {
        return (
            <h3 className="text-xl font-semibold mt-2 mb-2" {...props}>
                {children}
            </h3>
        );
    },
    h4: ({ node, children, ...props }) => {
        return (
            <h4 className="text-lg font-semibold mt-2 mb-2" {...props}>
                {children}
            </h4>
        );
    },
    h5: ({ node, children, ...props }) => {
        return (
            <h5 className="text-base font-semibold mt-2 mb-2" {...props}>
                {children}
            </h5>
        );
    },
    h6: ({ node, children, ...props }) => {
        return (
            <h6 className="text-sm font-semibold mt-2 mb-2" {...props}>
                {children}
            </h6>
        );
    },
    table: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="w-full overflow-x-auto bg-background rounded-lg border dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <table className={cn("my-0 w-full", className)} {...props} />
        </div>
    ),
    thead: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead
            className={cn("border-b last:border-b-0", className)}
            {...props}
        />
    ),
    tr: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className={cn("border-b last:border-b-0", className)} {...props} />
    ),
    th: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className={cn(
                "text-balance border-r px-6 py-3 text-left font-mono text-sm font-semibold tracking-tight last:border-r-0",
                className,
            )}
            {...props}
        />
    ),
    td: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={cn(
                "border-r px-6 py-3 text-sm last:border-r-0 [&[align=center]]:text-center [&[align=right]]:text-right",
                className,
            )}
            {...props}
        />
    ),
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
    return (
        <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
            {children}
        </ReactMarkdown>
    );
};

export const Markdown = memo(
    NonMemoizedMarkdown,
    (prevProps, nextProps) => prevProps.children === nextProps.children,
);
