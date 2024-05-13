import { useState } from "react";
import RewardPoint from "../../../../Components/Dashboard/user/profile/reward-point/RewardPoint";
import FavouriteReciepes from "../../../../Components/Dashboard/user/profile/favorite/FavouriteRecipes";
import ActivityFeed from "../../../../Components/Dashboard/user/profile/activity-feed/ActivityFeed";
import TabsContainer from "./TabsContainer";



const Tabs = () => {

    const [activeTabIndex,setActiveTabIndex] = useState(0)

    const activeTabColor = 'bg-primaryColor text-[white]'
    const deactiveTabColor = 'bg-[#f4f4f4] text-[black]'
    // if active tab -> active color
    const bgColor = activeTabIndex === activeTabIndex?activeTabColor:deactiveTabColor



       const activityFeedOpen =  activeTabIndex === 0
       const favoriteRecipesOpen =  activeTabIndex === 1 
       const rewardPointOpen =  activeTabIndex === 2

    return (
        <section className=" flex gap-8 mt-10 h-screen  ">
            <div className="bg-[#ececec] w-[40%]  sticky top-0  h-[100vh]"></div>
            <div className="flex-1  w-[60%] relative">
                <div className=" flex gap-3 relative z-50 items-start">
                    <button onClick={()=> setActiveTabIndex(1)} className={`${ favoriteRecipesOpen ? bgColor :deactiveTabColor} p-2 rounded-sm  transition-all duration-300 ease-linear`}>Favourite Recipes</button>
                    <button onClick={()=> setActiveTabIndex(0)} className={`${activityFeedOpen ? bgColor: deactiveTabColor} p-2 rounded-sm  transition-all duration-300 ease-linear`}>Activity Feed</button>
                    <button onClick={()=> setActiveTabIndex(2)} className={`${ rewardPointOpen ? bgColor: deactiveTabColor} p-2 rounded-sm  transition-all duration-300 ease-linear`}>Reward point</button>

                </div>
   
                <TabsContainer isActive={favoriteRecipesOpen}><FavouriteReciepes/></TabsContainer>
                <TabsContainer isActive={activityFeedOpen}><ActivityFeed/></TabsContainer>
                <TabsContainer isActive={rewardPointOpen}><RewardPoint/></TabsContainer>
                
            </div>


        </section>
    );
};

export default Tabs; 