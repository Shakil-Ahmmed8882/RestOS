import React, { ChangeEvent, useState } from "react";
import PopoverWrapper from "../../../../../shared/ui/wrapper/PopoverWrapper";
import RSForm from "../../../../../shared/forms/RSForm";
import RSInput from "../../../../../shared/forms/RSInput";
import { Button, Spinner } from "@nextui-org/react";
import ImageUploader from "../../../../../shared/ui/ImageUploader";
import { useCreateFoodCategoryMutation } from "../../../../../redux/features/food-category/foodCategory.api";

const AddCategory = () => {
  // State management part-2
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [
    createFoodCategory,
    {
      isLoading: isCreateFoodCategoryLoading,
      isSuccess: isCreateFoodCategorySuccess,
    },
  ] = useCreateFoodCategoryMutation();


  
  const handleImageChange = (files: File[]) => {
    setImageFiles(files);
  };

  const onFoodCategorySubmit = async (data) => {
    const formData = new FormData();

    for (let image of imageFiles) {
      formData.append("file", image);
    }

    formData.append("data", JSON.stringify(data));

    try {
      await createFoodCategory(formData);
    } catch (error) {}
  };

  return (
    <div className="mt-6 md:mt-0">
      <PopoverWrapper butttonClass="bg-primaryColor text-[white]" triggerElement={"Add category"}>
      {isCreateFoodCategoryLoading && !isCreateFoodCategorySuccess && <CreateFoodLoadingState />}

        <div className="!w-[400px] h-screen bg-[white] shadow-lg p-5">
        <section className="mt-11">
        <RSForm onSubmit={onFoodCategorySubmit}>
            <RSInput name="name" label="Category Name" />
            <RSInput name="description" label="description" />
            {/* <ImageUploader onImagesChange={handleImageChange} /> */}
            <ImageUploader imagePreviews={imagePreviews} setImagePreviews={setImagePreviews} onImagesChange={handleImageChange} />
            <Button type="submit" className="bg-primaryColor text-[white]">
              create
            </Button>
          </RSForm>
        </section>
        </div>
      </PopoverWrapper>
    </div>
  );
};

export default AddCategory;

const CreateFoodLoadingState = () => {
  return (
    <div className="fixed bg-[#f9f9f9d9] animate-pulse flex justify-center items-center inset-0 z-50">
      <Spinner color="default" />
    </div>
  );
};
