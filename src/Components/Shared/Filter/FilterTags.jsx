import { FilterItem } from "./FilterItem";
import { FilterSearch } from "./FilterSearch";

const tagsArray = [
  { name: "Not set", value: "500" },
  { name: "Algeria", value: "1" },
  { name: "American Samoa", value: "10" },
  { name: "Andorra", value: "5" },
  { name: "Angola", value: "5" },
];

export const FilterTags = ({ activeTab, handleClick }) => {
  return (
    <>
      <div
        className={`${
          activeTab
            ? "translate-y-0 z-20 visible opacity-100"
            : "-translate-y-16 opacity-0 invisible"
        }
       transition-all duration-200 absolute top-32 md:right-1/4 w-full sm:w-[90%] md:w-[480px] md:h-[460px] bg-white rounded-lg shadow-lg p-3 py-6 `}
      >
        <div className="flex flex-col space-y-4">
          <FilterSearch/>
          <div
            dir="ltr"
            className="relative overflow-hidden h-56 w-full rounded-md border"
            style={{
              position: "relative",
              "--radix-scroll-area-corner-width": "0px",
              "--radix-scroll-area-corner-height": "0px",
            }}
          >
            <style>{`[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`}</style>
            <div
              data-radix-scroll-area-viewport=""
              className="h-full w-full rounded-[inherit]"
              style={{ overflow: "hidden scroll" }}
            >
              <div style={{ minWidth: "100%", display: "table" }}>
                <div className="flex flex-col space-y-2 p-2">
                  {tagsArray.map((item, index) => (
                   <FilterItem filterItem={item} index={index}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => handleClick(false)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible bg-[#dedede] px-8 hover:bg-[#cecece]"
            >
              Clear
            </button>

            <button
              onClick={() => handleClick(false)}
              className="inline-flex bg-primary-color text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 px-8 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 hover:bg-hover-bg hover:text-hover-text py-2"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
