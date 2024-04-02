import { tableData } from "./TableData";
import { TableRow } from "./TableRow";

export const TableBody = () => {
  return (
    <>
      <tbody className="[&_tr:last-child]:border-0">
        {/* tableData [
            brand,description,members,categories 
            tags, NextMeeting
        ]
        
        */}

        {tableData?.map((row) => (
          <TableRow key={row.brand} row={row} />
        ))}
      </tbody>
    </>
  );
};
