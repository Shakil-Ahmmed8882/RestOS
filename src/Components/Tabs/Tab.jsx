export const Tab = ({icon:Icon,label,handleClick}) => {
  return (
    <>
      <button onClick={()=> handleClick(label.toLowerCase())}  className="outline flex outline-[1px]  outline-[#dadadacb] cursor-pointer px-2 h-9  items-center gap-2 p-2 rounded-md transition-all duration-300 font-body text-sm  text-gray-500 bg-transparent hover:bg-gray-100">
          <Icon className="w-4 h-4" />
          {label}
        </button> 
    </>
  );
};