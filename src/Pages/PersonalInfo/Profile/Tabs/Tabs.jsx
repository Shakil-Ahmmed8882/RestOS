import { useState } from "react";
import ActivityFeed from "../../../../Components/Dashboard/user/profile/activity-feed/ActivityFeed";

const Tabs = () => {

    const [activeTabIndex,setActiveTabIndex] = useState(0)

    const activeTabColor = 'bg-primaryColor text-[white]'
    const deactiveTabColor = 'bg-[#f4f4f4] text-[black]'
    const bgColor = activeTabIndex === activeTabIndex?activeTabColor:deactiveTabColor



       const activityFeedOpen =  activeTabIndex === 0
       const favoriteRecipesOpen =  activeTabIndex === 1 
       const rewardPointOpen =  activeTabIndex === 2

    return (
        <section className="flex gap-8 mt-10 h-screen   ">
            <div className="bg-[#ececec] w-[40%]  sticky top-0  h-[100vh]"></div>
            <div className="flex-1">
                <div className=" flex gap-3 items-start">
                    <button onClick={()=> setActiveTabIndex(0)} className={`${activityFeedOpen && bgColor} p-2 rounded-sm  transition-all duration-300 ease-linear`}>Activity Feed</button>
                    <button onClick={()=> setActiveTabIndex(1)} className={`${ favoriteRecipesOpen && bgColor} p-2 rounded-sm  transition-all duration-300 ease-linear`}>Favourite Recipes</button>
                    <button onClick={()=> setActiveTabIndex(2)} className={`${ rewardPointOpen && bgColor} p-2 rounded-sm  transition-all duration-300 ease-linear`}>Reward point</button>
                    
                    {/* <FavoriteRecipes />
                            <RewardPoint /> */}
                </div>

                {/* tab content index 0 */}
                <div className={`${activityFeedOpen ? 'visible -translate-x-0 opacity-100':'invisible translate-x-[400px] opacity-0'} transition-all duration-500`} ><ActivityFeed /></div>
                <div className={`${favoriteRecipesOpen ? 'visible -translate-x-0 opacity-100':'invisible translate-x-[400px] opacity-0'} transition-all duration-500`} ><ActivityFeed /></div>
                <div className={`${rewardPointOpen ? 'visible -translate-x-0 opacity-100':'invisible translate-x-[400px] opacity-0'} transition-all duration-500`} ><ActivityFeed /></div>
                
            </div>


        </section>
    );
};

export default Tabs; 