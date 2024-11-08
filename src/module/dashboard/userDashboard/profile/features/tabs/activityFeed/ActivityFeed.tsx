import React from "react";
import FeedCard from "./FeedCard";

const ActivityFeed = () => {
    return (
        <>
            <FeedCard activity={'order'}/>
            <FeedCard activity={'Liked'}/>
           
            <FeedCard activity={'order'}/>
            <FeedCard activity={'Liked'}/>
           
            <FeedCard activity={'order'}/>
            <FeedCard activity={'Liked'}/>
           
        </>
    );
};

export default ActivityFeed; 