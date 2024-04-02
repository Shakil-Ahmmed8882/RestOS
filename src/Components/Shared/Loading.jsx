import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner></Spinner>
    </div>
  );
};

export default Loading;
