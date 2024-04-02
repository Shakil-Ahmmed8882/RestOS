export const MembersDetails = ({ setHoveredMember, memberProfile }) => {
  return (
    <>
      <div
        onMouseEnter={() => setHoveredMember(memberProfile)}
        onMouseLeave={() => setHoveredMember("")}
        className=" rounded-lg"
      >
        <ul className="space-y-4 rounded-lg bg-[white] p-6 shadow-xl shadow-[#d0d2ffa4] h-32 w-80">
          <li className="flex items-start space-x-3">
            <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#EAEAEA]">
              <img
                src={memberProfile || "https://img.freepik.com/free-photo/young-people-eating-hamburger-fast-food-restaurant_1150-26145.jpg?size=626&ext=jpg"}
                alt=""
                className="object-cover w-full h-full"
              />
            </span>
            <div className="flex flex-col">
              <span className="font-semibold">Alan Jensen</span>
              <div
                aria-valuemax={100}
                aria-valuemin={0}
                role="progressbar"
                data-state="indeterminate"
                data-max={100}
                className="relative h-2 mt-1 overflow-hidden rounded-full bg-primary/20 w-[60%]"
              >
                <div
                  data-state="indeterminate"
                  data-max={100}
                  className="h-full w-full bg-primary-color flex-1 bg-primary transition-all"
                  style={{ transform: "translateX(-3%)" }}
                />
              </div>
              <p className="font-body text-[#767676] mt-3">
                I am Alan from Brazil ⛳
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
