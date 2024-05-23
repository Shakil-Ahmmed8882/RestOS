
import { FaGift } from 'react-icons/fa6';
import giftBox from '../../.../../../../../assets/img/reward/celebrate1.png'
import congratulationsIcon from '../../.../../../../../assets/img/dashboard/user-dashboard/congratulation.png'
import gift from '../../.../../../../../assets/img/dashboard/user-dashboard/gift.png'
import tickBadge from '../../.../../../../../assets/img/dashboard/user-dashboard/tick-badge.png'
import starBadge from '../../.../../../../../assets/img/dashboard/user-dashboard/star-badge.png'
import coinIcon from '../../.../../../../../assets/img/dashboard/user-dashboard/coin.png'
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
      <div className="relative flex mt-8 justify-center">
        
        
      <img className='mt-4 w-44 gradient p-5 rounded-full' src={congratulationsIcon} alt="" />
        <CelebratingIcons />
      </div>
      
      <div className="bg-white  p-3 m-3 text-center ">
        <h1 className='mb-8 text-4xl mt-3'>OOHOOO!!!</h1>


        {/* Points Breakdown */}
        <div className="points-breakdown">
          <ul className='text-left  grid grid-cols-2 gap-8 mt-5  '>
            <li className='shadow-md p-5 rounded-lg flex items-center gap-3 text-[22px]'> Placed: <span className='text-primaryColor'>{loyaltyPointsData.pointsBreakdown.orders}</span> <img src={coinIcon}/></li>
            <li className='shadow-md p-5 rounded-lg flex items-center gap-3 text-[22px]'>Referrals: <span className='text-primaryColor'>{loyaltyPointsData.pointsBreakdown.referrals}</span> <img src={gift}/></li>
            <li className='shadow-md p-5 rounded-lg flex items-center gap-3 text-[22px]'>Engagement: <span className='text-primaryColor'>{loyaltyPointsData.pointsBreakdown.engagement}</span> <img src={tickBadge}/></li>
            <li className='shadow-md p-5 rounded-lg flex items-center gap-3 text-[22px]'>Referrals: <span className='text-primaryColor'>{loyaltyPointsData.pointsBreakdown.referrals}</span> <img src={starBadge}/></li>
            
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