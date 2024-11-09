import React, { useState } from "react";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import { Upload } from "lucide-react";
import { imageUpload } from "../../../../../api/utils";

export default function ProfileAvatar({
  user,
  updateUserInfo,
  profileUpdateLoading,
}) {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    const imageData = await imageUpload(selectedFile);
    const photoURL = imageData?.data?.display_url;
    await updateUserInfo(user?.displayName, photoURL);
    setIsEditingAvatar(false);
  };

  return (
    <div className="relative">
      {profileUpdateLoading && (
        <div className="inset-0 flex justify-center animate-pulse bg-[#ffffffb5] absolute rounded-full z-50">
          <Spinner color="default" />
        </div>
      )}

      <Avatar className="w-24 h-24" src={user?.photoURL} />
      <Button
        isIconOnly
        className="absolute cursor-pointer !bg-[white] bottom-0 right-0 bg-blue-500 text-white rounded-full p-2"
        size="sm"
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="opacity-0 cursor-pointer absolute"
        />
        <Upload className="w-4 h-4 cursor-pointer" />
      </Button>
    </div>
  );
}
