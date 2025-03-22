import React from 'react';

const OutgoingMessage = () => {
    return (
        <div className="flex items-end gap-1 justify-end">

            <div className="w-3/4 md:w-3/5 flex items-end flex-col">
                <span className="text-gray-600 text-sm">Just Now</span>
                <p className="text-base text-gray-800 bg-slate-200 px-3 py-2 rounded-xl rounded-br-none ">Do you want to get notified when a new component is added to Flow bite? Sign up for our newsletter and you&#39;ll be among the first to find out about new features, components, versions, and tools.</p>

            </div>
            <div className="h-8 aspect-square">
                <img
                    src="https://avatars.githubusercontent.com/u/88716007?v=4"
                    className="h-full w-full object-center object-cover rounded-full"
                 alt="Image"/>
            </div>
        </div>
    );
};

export default OutgoingMessage;