import { url2 } from "./data";

export const PopularDishesCard = () => {
    return (
        <>
            <div className="flex items-center text-[14px] mt-4 bg-[white] text-left gap-3 rounded-lg  shadow-sm">
                <div className="p-3 bg-[#f1f1f1] rounded-lg">
                <img className=" h-[36px] w-[36px] rounded-lg object-cover" src={url2} alt="" />
                </div>
                
                    <h2 className="font-medium">Chicken </h2>
                    <p className="text-[#a2a2a2]"><span className="text-primaryColor font-bold">$</span>34</p>
            </div>
        </>
    );
};

