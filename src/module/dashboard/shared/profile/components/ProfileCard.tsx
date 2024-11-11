import React from "react";
import { Card} from "@nextui-org/react";
import { Edit2 } from "lucide-react";

export default function ProfileCard({ title, children}) {
  return (
    <Card className="p-6 shadow-none space-y-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl italic font-semibold text-[#8c8c8c]">{title}</h2>
        <div className="flex gap-2">
          {/* {editing && (
            <Button
              color="primary"
              onClick={() => setEditing((prev) => ({ ...prev, [title.toLowerCase().replace(" ", "")]: false }))}
            >
              Save changes
            </Button>
          )}
          <Button
            isIconOnly
            variant="light"
            onClick={() => setEditing((prev) => ({ ...prev, [title.toLowerCase().replace(" ", "")]: !prev[title.toLowerCase().replace(" ", "")] }))}
          >
          </Button> */}
            <Edit2 className="w-4 h-4" />
        </div>
      </div>
      {children}
    </Card>
  );
}
