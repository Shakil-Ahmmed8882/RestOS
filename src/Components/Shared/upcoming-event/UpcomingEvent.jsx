import React from 'react';
import Card from './Card';
import UserName from '../ui/user-info/UserName';
import UserEmail from '../ui/user-info/UserEmail';

const UpcomingEvent = () => {
    return (
        <section>

            <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#f8fff8] to-[#fcfaff]">
                <div className="w-full  space-y-8">
                    <div>
                        <span className={`relative flex shrink-0 overflow-hidden rounded-full mx-auto h-24 w-24`}>
                            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                JD
                            </span>
                        </span>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                            <UserName/>
                        </h2>
                        <UserEmail/>
                        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            Hi there! Welcome to the world of fresh food. where appetizing food always available for satisfying customers needs
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[0,1,2,3,4,5,6,7].map((event,index) => <Card key={index}/>)}
                    </div>
                </div>
            </div>


        </section>
    );
};

export default UpcomingEvent; 
