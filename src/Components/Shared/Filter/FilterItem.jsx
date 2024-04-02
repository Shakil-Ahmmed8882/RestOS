export const FilterItem = ({ filterItem,index }) => {
  return (
    <>
      <div className="flex items-center space-x-2  cursor-pointer" key={index}>
        <input
          type="checkbox"
          value="on"
          className="peer accent-primary-color h-4 w-4 shrink-0 rounded-sm border mt-5 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          id={`item-${index}`}
        />
        <label
          htmlFor={`item-${index}`}
          className="text-sm mt-5  cursor-pointer select-none font-medium leading-none"
        >
          {filterItem.name} {filterItem.value}
        </label>
      </div>
    </>
  );
};
