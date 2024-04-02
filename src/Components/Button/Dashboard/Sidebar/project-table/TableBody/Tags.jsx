export const Tags = ({tags}) => {
  return (
    <>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <div className="flex flex-wrap gap-2">
          <div className=" inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 first-letter:
          bg-[#D9F9E0]
          ">
            {tags[0]}
          </div>
          <div
            className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 
                  
                  bg-[#ebe5fe] text-[#764cff]"
          >
            {tags[1]}
          </div>
        </div>
      </td>
    </>
  );
};
