import { CiGift } from "react-icons/ci";
import { MdOutlineCelebration } from "react-icons/md";
import { FaWineBottle } from "react-icons/fa6";
import CelebratingIcons from "../../../../Shared/ui/Dot/CelebratingIcons";


const RewardPoint= () => {
  return (
    <section>
      <div className="relative flex mt-8 justify-center">
      <CiGift className="text-8xl bg-gradient-to-tr from-[white] to-[#a4ffaf] p-2 rounded-full"/>
      <CelebratingIcons/>


      </div>
      <div className="bg-[white] shadow-lg p-3 m-3 text-center mt-8">
      <h1>oHOOOOO!!!</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam quibusdam eveniet neque quis magni nostrum, commodi rerum praesentium incidunt, sequi placeat! Temporibus vel nobis quidem totam laboriosam ratione dolor repellat?</p>



      </div>

      

    </section>
  );
};

export default RewardPoint; 