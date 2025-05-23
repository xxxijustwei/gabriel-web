import { motion } from "framer-motion";

export const Welcome = () => {
    return (
        <div
            key="overview"
            className="w-full md:mt-20 px-8 size-full flex flex-col justify-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-semibold"
            >
                Hi, I'm Gabriel.
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.6 }}
                className="text-2xl text-zinc-500"
            >
                Your crypto analysis assistant
            </motion.div>
        </div>
    );
};
