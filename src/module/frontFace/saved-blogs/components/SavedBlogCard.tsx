import React from "react";
import { Card, CardBody, Chip, Button, Image } from "@nextui-org/react";
import { BookmarkIcon, CalendarIcon } from "lucide-react";

const SavedBlogCard = ({
  item,
  handleUnsaveBlog,
  unsaveBlogId,
  isUnsaveBlogLoading,
}: any) => {
  return (
    <Card
      className={`!flex group shadow-md !p-0 ${
        unsaveBlogId === item.blog._id && isUnsaveBlogLoading
          ? "opacity-50 pointer-events-none"
          : ""
      }`}
    >
      <figure className="sm:h-52 md:h-44 overflow-hidden">
        <Image
          src={item.blog.image}
          alt={item.blog.title}
          className="w-full h-full object-cover"
        />
      </figure>
      <CardBody>
        <div className="flex justify-between py-3">
          <h2 className="text-xl font-semibold mb-1 line-clamp-1">
            {item.blog.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <Button
            onClick={() => handleUnsaveBlog(item.blog._id)}
            size="sm"
            className="!bg-[#ff9533] text-[#fff]"
            startContent={<BookmarkIcon className="w-4 h-4 " />}
          >
            Unsave
          </Button>
        </div>
        <p className="text-[#8d8d8d] mb-2 line-clamp-2">{item.blog.description}</p>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pb-3">
          {item.blog.tags.slice(0, 2).map((tag: string, index: number) => (
            <Chip key={index} variant="flat" className="border bg-transparent text-primaryColor" size="sm">
              {tag}
            </Chip>
          ))}
          <div className="flex items-center text-[gray] text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-1 " />
            {new Date(item.blog.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SavedBlogCard;
