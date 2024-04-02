export const Categories = ({ categories }) => {
    
  return (
    <>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {/* categories: ["cat1", "cat2"], */}
        {categories?.map((category,index) => (
          <div key={category} className={`${index % 2 == 0?"bg-[#eef4ff] text-[#5975AA]":"bg-[#fff3f7] text-[#ff65d3]"} inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80  m-1`}>
            {category}
          </div>
        ))}
      </td>
    </>
  );
};
