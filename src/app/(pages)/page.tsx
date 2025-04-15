import type { Metadata } from "next";
import { Client } from "./client";

export const metadata: Metadata = {
    title: "Gabriel",
    description: "Your crypto analysis assistant",
};

const Page = () => {
    return <Client />;
};

export default Page;
