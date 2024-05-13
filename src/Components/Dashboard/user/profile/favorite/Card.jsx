import { useState } from "react";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";





const Card = ({ card }) => {

    const [isFavourite, setIsFavourite] = useState(true)

    return (


        <div>

            <section>
                <div className="flex gap-3 items-start pb-4 ">
                    <img className="size-8 rounded-full" src={card?.uploaderImage} alt="" />
                    <article>
                        <h2 className=" flex items-center gap-2 text-[18px]">{card.name} <div className="h-3 w-3 p-1  bg-[#7777ff] rounded-full "></div></h2>
                        <p className="text-[#a1a1a1] mt-1 text-[14px]">{card?.role}</p>

                    </article>

                </div>
                <div className="group relative  rounded-lg pr-20 ">

                    <div className="container w-full h-40 overflow-hidden">
                        <img
                            src={card?.thumbnail}
                            alt="Recipe Thumbnail"
                            className="   object-cover "
                            style={{ aspectRatio: "300 / 200", objectFit: "cover" }}
                        />
                        <div className="absolute top-0 h-40 w-full  bg-gradient-to-t from-[#ffffff] to-[#a0727200]"></div>

                    </div>

                    <div className="p-4 bg-white dark:bg-gray-950">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg tracking-tight">
                                {card?.title}
                            </h3>
                            <div className="flex gap-1 items-center hover:text-[black] transition-all duration-300 cursor-pointer text-[#828282]">
                                <FaRegComments className="text-2xl" />

                            </div>
                            <div onClick={() => setIsFavourite(!isFavourite)} className={`
                        ${!isFavourite && 'text-[black]'}
                        hover:text-[black] transition-all duration-300 text-[#828282] cursor-pointer flex items-center gap-1`}>
                                {
                                    isFavourite ?
                                        <GrFavorite /> :
                                        <MdOutlineFavorite className="text-deepPink" />

                                }
                                <span className="text-sm">{card.daysAgo}</span>
                            </div>
                        </div>
                        <p className="mt-2 text-[#828282] text-gray-500 dark:text-gray-400 text-md">
                            {card?.description}
                        </p>
                    </div>
                </div>

            </section>





        </div>
    );
};

export default Card; 