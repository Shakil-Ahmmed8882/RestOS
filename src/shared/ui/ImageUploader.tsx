import React, { ChangeEvent, useState } from "react";

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void; // Callback to pass the selected files back to the parent
  setImagePreviews: (p: any) => void; // Callback to pass the selected files back to the parent
  imagePreviews:  any[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesChange,
  setImagePreviews,
  imagePreviews,
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImagePreviews((prev) => [
              ...prev,
              event.target!.result as string,
            ]);
          }
        };
        reader.readAsDataURL(file);
        return "";
      });

      // Notify parent about new files
      onImagesChange([...imageFiles, ...newFiles]);
    }
  };

  const handleClearImage = (index: number) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(newImageFiles);
    setImagePreviews(newImagePreviews);

    // Notify parent with the updated files
    onImagesChange(newImageFiles);
  };

  return (
    <div className="min-w-fit flex-1 relative">
      <label
        className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
        htmlFor="image"
      >
        Upload image
      </label>
      <input
        multiple
        className="hidden"
        id="image"
        type="file"
        onChange={handleImageChange}
      />

      {/* Image Previews */}
      <div>
        {imagePreviews.length > 0 && (
          <div className="flex gap-5 my-5 flex-wrap relative">
            {imagePreviews.map((imageDataUrl, index) => (
              <div
                key={`${imageDataUrl}-${index}`}
                className="relative size-36 rounded-xl border-2 border-dashed border-default-300 p-2"
              >
                <img
                  alt="item"
                  className="h-full w-full object-cover object-center rounded-md"
                  src={imageDataUrl}
                />
                {/* Clear icon */}
                <button
                  onClick={() => handleClearImage(index)}
                  className="absolute top-0 right-0 bg-gray-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
