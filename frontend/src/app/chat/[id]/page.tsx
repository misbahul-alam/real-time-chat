import React from 'react';
import ChatLayout from "@/components/layout/ChatLayout";
import {MdArrowBack, MdSend} from "react-icons/md";
import IncomingMessage from "@/components/IncomingMessage";
import OutgoingMessage from "@/components/OutgoingMessage";
import Link from "next/link";

const Page = () => {
    return (
        <ChatLayout isChatOpen={true}>
            <div className="h-screen overflow-hidden">
                <div className="px-4 h-14 border-b border-gray-200 flex items-center">
                    <div>
                        <div className="flex items-center gap-2 ">
                            <Link href="/"><MdArrowBack className="text-2xl md:hidden"/></Link>
                            <div className="h-11 aspect-square relative">
                                <img src="https://avatars.githubusercontent.com/u/88716007?v=4"
                                     className="h-full w-full object-center object-cover rounded-full"/>
                                <span
                                    className="absolute bottom-0 -right-1 h-4 w-4 rounded-full bg-green-600 border-2 border-white"></span>
                            </div>
                            <div>
                                <h2 className="text-xl font-medium text-gray-800">Misbahul Alam</h2>
                                <p className="text-base text-gray-600 line-clamp-1">Online</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full bg-white shadow-sm">
                    <div className="h-full bg-slate-50 space-y-2 overflow-y-scroll">
                        <IncomingMessage/>
                        <OutgoingMessage/>
                        <IncomingMessage/>
                        <OutgoingMessage/>
                        <IncomingMessage/>
                        <OutgoingMessage/>
                    </div>
                    <div className="h-12 border-t border-gray-200 sticky bottom-0  px-4 flex items-center bg-white">
                        <form className="bg-white rounded-full w-full h-10 flex items-center">
                            <input placeholder="Write your message..."
                                   className=" w-full h-full py-2 outline-none text-base scrollbar-hide"/>
                            <MdSend className="text-2xl text-blue-600 cursor-pointer "/>
                        </form>
                    </div>
                </div>
            </div>
        </ChatLayout>
    );
};

export default Page;