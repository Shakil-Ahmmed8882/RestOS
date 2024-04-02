import { useState } from "react";
import { MembersDetails } from "./MembersDetails";

export const Members = ({ members }) => {
  const [hoveredMember, setHoveredMember] = useState("");

  return (
    <>
      <td className="p-4 align-middle relative cursor-pointer [&:has([role=checkbox])]:pr-0">
        <div className="flex -space-x-1">
          {/* members:[memberProfile1,memberProfile2] */}
          {members?.map((member) => (
            <img
              onMouseEnter={() => setHoveredMember(member)}
              onMouseLeave={() => setHoveredMember("")}
              key={member}
              src={member}
              className="relative justify-center
                 bg-[#EAEAEA] flex h-6 w-6 shrink-0 overflow-hidden rounded-full"
            />
          ))}
          <div className={`${hoveredMember?"visible translate-y-10":"invisible -translate-y-4"} transition-all duration-300  absolute top-4 z-40 cursor-pointer -left-32 md:-left-0`}>
           
            <MembersDetails memberProfile={hoveredMember} setHoveredMember={setHoveredMember} />
          
          
          

          </div>
        </div>
      </td>
    </>
  );
};
