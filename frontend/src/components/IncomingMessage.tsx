import React from 'react';

const IncomingMessage = () => {
    return (
        <div className="flex items-end gap-1">
            <div className="h-8 aspect-square">
                <img
                    src="https://avatars.githubusercontent.com/u/88716007?v=4"
                    className="h-full w-full object-center object-cover rounded-full"
                />
            </div>
            <div>
                <span className="text-gray-600 text-sm">Just Now</span>
                <p className="text-base text-gray-200 bg-blue-500 px-3 py-2 rounded-xl rounded-bl-none w-3/4 md:w-3/5">Do you want to get notified when a new component is added to Flowbite? Sign up for our newsletter and you&#39;ll be among the first to find out about new features, components, versions, and tools.</p>

            </div>
        </div>
    );
};

export default IncomingMessage;