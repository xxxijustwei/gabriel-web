"use client";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative grid h-full flex-1 place-items-center overflow-hidden">
            <div className="w-full h-svh flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default Layout;
