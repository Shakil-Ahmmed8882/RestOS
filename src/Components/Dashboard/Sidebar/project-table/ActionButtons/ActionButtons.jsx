import { MdOutlineDelete } from "react-icons/md";




export const ActionButtons = () => {
  return (
    <>
    
    
    <div className="bg-white p-2 mt-16 justify-center rounded-lg shadow flex items-center space-x-4">
          <button className="inline-flex w-28 items-center hover:bg-[#f4f4f4] transition-all justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2  text-gray-700 border border-gray-300">
            Selected
          </button>
          <button className="inline-flex items-center hover:bg-[#f4f4f4] transition-all w-28 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 text-gray-700 border border-gray-300">
            Archive
          </button>
          <button className="inline-flex items-center hover:bg-[#f4f4f4] transition-all w-28 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 text-gray-700 border border-gray-300">
          <MdOutlineDelete className="text-red-400   text-2xl"/>
          </button>
          <button className="inline-flex items-center hover:bg-[#f4f4f4] transition-all w-28 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 text-gray-700 border border-gray-300">
            More
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>

    
    
    </>
  );
};
