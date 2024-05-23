
import { FaGift } from 'react-icons/fa6';
import giftBox from '../../.../../../../../assets/img/reward/celebrate1.png'
import CelebratingIcons from "../../../../Shared/ui/Dot/CelebratingIcons";

const RewardPoint = () => {
  // Dynamic data
  const loyaltyPointsData = {
    pointsBalance: 500,
    pointsBreakdown: {
      orders: 300,
      referrals: 100,
      engagement: 100
    },
    rewards: [
      { name: 'Discounts on future orders', description: '10% off next order' },
      { name: 'Free items or upgrades', description: 'Free dessert with next meal' },
      { name: 'Exclusive access to promotions or events', description: 'VIP access to upcoming events' }
    ]
  };

  // Function to handle redeeming points
  const handleRedeemPoints = () => {
    // Add logic to handle redeeming points here
    console.log('Points redeemed!');
  };

  return (
    <section className='relative'>
      <video autoPlay muted className="absolute -z-10 opacity-70 mix-blend-screen   -top-8" src="https://cdn.dribbble.com/userupload/5179994/file/original-71c6e182bd39eadab718679c7e4f94dc.mp4"></video>
      <div className="relative flex mt-8 justify-center">
        
        
        <CelebratingIcons />
      </div>
      
      <div className="bg-white mt-48 shadow-lg p-3 m-3 text-center ">
        <h1>OOHOOO!!!</h1>
        


         {/* Loyalty Points Balance */}
         <div className="loyalty-points-balance">
          <h2>Loyalty Points</h2>
          <p>Total Points: {loyaltyPointsData.pointsBalance}</p>
        </div>

        {/* Points Breakdown */}
        <div className="points-breakdown">
          <h3>Points Breakdown</h3>
          <ul>
            <li>Orders Placed: {loyaltyPointsData.pointsBreakdown.orders}</li>
            <li>Referrals: {loyaltyPointsData.pointsBreakdown.referrals}</li>
            <li>Engagement: {loyaltyPointsData.pointsBreakdown.engagement}</li>
          </ul>
        </div>
      </div>

      {/* Loyalty Points Container */}
      <div className="loyalty-points-container">
       

        {/* Rewards */}
        <div className="rewards">
          <h3>Rewards</h3>
          <ul>
            {loyaltyPointsData.rewards.map((reward, index) => (
              <li key={index}>
                {reward.name}: {reward.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Redeem Points Button */}
        <button onClick={handleRedeemPoints}>Redeem Points</button>

        {/* Empty State Message */}
        {loyaltyPointsData.pointsBalance === 0 && (
          <div className="empty-state-message">
            <p>No loyalty points earned yet.</p>
            <p>Start earning points by placing orders or engaging with the platform!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RewardPoint;