import React from "react";
import ChatLayout from "@/components/layout/ChatLayout";
import ChatImage from "@/images/chat.svg";
import Image from "next/image";

const Page = () => {
  return (
    <ChatLayout>
      <div className="flex flex-col items-center justify-center gap-2 px-4 py-2 h-screen ">
        <Image src={ChatImage} alt="ChatImage" className="max-w-[280px]" />
        <h2 className="text-2xl font-medium text-gray-800">
          Real-Time Chat Application
        </h2>
        <p className="text-gray-600 text-center max-w-lg">
          A real-time chat system enables instant messaging, media sharing, and
          notifications, ensuring fast, interactive, and seamless communication
          across platforms.
        </p>
      </div>
    </ChatLayout>
  );
};

export default Page;
