import { ActionButtons } from "./ActionButtons/ActionButtons";
import { TableBody } from "./TableBody/TableBody";
import { TableHeading } from "./TableHeading";

export const ProjectTable = () => {


  return (
    <>
      <div className="relative select-none w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <TableHeading/>
          <TableBody/>
        </table>



      </div>
        <ActionButtons/>
    </>
  );
};
