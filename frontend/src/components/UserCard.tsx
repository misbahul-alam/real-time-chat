import React from "react";
import Link from "next/link";

const UserCard = () => {
  return (
    <Link href="/chat/20">
      <div className="px-4 py-1 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
        <div className="h-11 aspect-square relative">
          <img
            src="https://avatars.githubusercontent.com/u/88716007?v=4"
            className="h-full w-full object-center object-cover rounded-full"
          />
          <span className="absolute bottom-0 -right-1 h-4 w-4 rounded-full bg-green-600 border-2 border-white"></span>
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-800">Misbahul Alam</h2>
          <p className="text-base text-gray-600 line-clamp-1">
            How can I help you?{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
