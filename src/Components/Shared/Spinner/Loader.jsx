
import {Card, Skeleton} from "@nextui-org/react";

export default function Loader() {
  return (
      <div className="flex">
    <Card className="flex-1 space-y-5 p-4 " radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-screen rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
      </div>
  );
}

