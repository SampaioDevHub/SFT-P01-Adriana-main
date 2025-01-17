/* eslint-disable import/no-unresolved */
import Image from "next/image";
import Background from "@/assets/auth.svg"
import React from "react";

const DashboardAuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-2 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        {children}
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src={Background}
                    alt="Image"
                    width={300} height={300}
                    className="absolute inset-0 h-[660px] w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
export default DashboardAuthLayout;