/* Following single responsibility principle
   for each component */

import { Brand } from "./Brand";
import { Categories } from "./Categories";
import { Members } from "./Members/Members";
import { NextMeeting } from "./NextMeeting";
import { Tags } from "./Tags";

export const TableRow = ({ row }) => {
  const { brand, description, members, categories, tags, nextMeeting } = row;

  return (
    <>
      <tr className="border-b text-description-text font-body transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <Brand brandName={brand} />
        <td className="p-4 align-middle text-description-text [&:has([role=checkbox])]:pr-0">
          {description}
        </td>
        <Members members={members} />
        <Categories categories={categories} />
        <Tags tags={tags} />
        <NextMeeting nextMeeting={nextMeeting} />
      </tr>
    </>
  );
};
