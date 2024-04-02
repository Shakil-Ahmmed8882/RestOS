import MenuItem from "../MenuItem";

export const SidebarItem = ({handleClick,FirstIcon,SecondIcon,label,isOpen,sidebarDropdowns}) => {
  return (
    <>
      <li onClick={()=> handleClick(!isOpen)}
       className={`  
       text-[3000px] transition-all duration-100 flex cursor-pointer px-4 py-2 mt-3 items-center `}>

        <FirstIcon className="text-"/>

        <span className="ml-2 bg-[red]">{label}</span>
        <SecondIcon
          className={`${
            isOpen && "rotate-180"
          } transition-all duration-200 text-[#b0b0b0] ml-auto`}
        />
      </li>

      <ul
          className={`pb-8 ${
            isOpen ? "opacity-100 block text-[#5c5c5c]" : "hidden opacity-0"
          } transition-all duration-150 text-[300px] relative ml-4 ${
            isOpen ? "top-0 translate-y-0" : "-translate-y-10"
          }`}
        >

        {/* Dropdown */}
        {
         sidebarDropdowns?.map((item,index) => (
            <MenuItem label={item.name} address={"/no"} icon={''} key={index} className=" cursor-pointer px-4 py-2 text-sm"/>
         ))   
        }

        </ul>
    </>
  );
};
