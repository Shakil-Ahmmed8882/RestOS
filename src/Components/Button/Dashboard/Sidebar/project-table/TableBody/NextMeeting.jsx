export const NextMeeting = () => {
  return (
    <>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <button className="inline-flex items-center h-8 justify-center whitespace-nowrap rounded-full bg-[#fff5ee]  text-sm  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 text-[#000]">
          Tomorrow
        </button>
      </td>
    </>
  );
};
