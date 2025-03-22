import React from 'react';
import UserCard from "@/components/UserCard";
import Link from "next/link";

type ChatLayoutProps = {
    children: React.ReactNode;
    isChatOpen?: boolean;
}
const ChatLayout: React.FC<ChatLayoutProps> = ({children, isChatOpen=false}) => {
    return (
        <main className="grid lg:grid-cols-[350px_1fr] md:grid-cols-2 grid-cols-1">
            <div className={isChatOpen?"h-screen border-r border-gray-200 overflow-hidden hidden md:block":"h-screen border-r border-gray-200 overflow-hidden"}>
                <div
                    className="flex items-center justify-between px-4 h-14 border-b border-gray-200 sticky top-0 bg-white z-50">
                    <Link href="/"><h2 className="text-2xl font-medium text-gray-900">Message</h2></Link>
                </div>
                <div className="overflow-scroll h-full">
                    <UserCard/>
                    <UserCard/>
                    <UserCard/>
                </div>
            </div>
            <div>
                {children}
            </div>
        </main>
    );
};

export default ChatLayout;