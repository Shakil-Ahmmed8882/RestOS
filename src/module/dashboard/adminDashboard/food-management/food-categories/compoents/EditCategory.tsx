import React, { ChangeEvent, useState } from "react";
import { useUpdateFoodCategoryMutation } from "../../../../../../redux/features/food-category/foodCategory.api";
import PopoverWrapper from "../../../../../../shared/ui/wrapper/PopoverWrapper";
import RSForm from "../../../../../../shared/forms/RSForm";
import RSInput from "../../../../../../shared/forms/RSInput";
import ImageUploader from "../../../../../../shared/ui/ImageUploader";
import { Button, Spinner } from "@nextui-org/react";
import { EditIcon } from "lucide-react";

const EditFoodCategory = ({
  setCategoryId,
  categoryId,
  item,
}: {
  setCategoryId: (id: string) => void;
  categoryId: string;
  item: any;
}) => {
  // State management part-2
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [
    updateFoodCategory,
    {
      isLoading: isCreateFoodCategoryLoading,
      isSuccess: isCreateFoodCategorySuccess,
    },
  ] = useUpdateFoodCategoryMutation();

  const handleImageChange = (files: File[]) => {
    setImageFiles(files);
  };

  const onFoodCategorySubmit = async (data) => {
    const formData = new FormData();

    for (let image of imageFiles) {
      formData.append("file", image);
    }

    // Append other form fields (like category name, description, etc.) to FormData

    formData.append("data", JSON.stringify(data));
    try {
      const res = await updateFoodCategory({ id: categoryId, data: formData });

      console.log(res);
    } catch (error) {}
  };

  return (
    <div className="mt-6 md:mt-0">
      <PopoverWrapper
        butttonClass="bg-primaryColor text-[white]"
        triggerElement={
          <EditIcon
            onClick={() => setCategoryId(item._id)}
            className="size-5 cursor-pointer text-[gray]"
          />
        }
      >
        {isCreateFoodCategoryLoading && !isCreateFoodCategorySuccess && (
          <CreateFoodLoadingState />
        )}

        <div className="!w-[400px] h-screen bg-[white] shadow-lg p-5">
          <section className="mt-11">
            <RSForm onSubmit={onFoodCategorySubmit}>
              <RSInput name="name" label="Category Name" />
              <RSInput name="description" label="description" />
              <ImageUploader onImagesChange={handleImageChange} />
              <Button type="submit" className="bg-primaryColor text-[white]">
                update
              </Button>
            </RSForm>
          </section>
        </div>
      </PopoverWrapper>
    </div>
  );
};

export default EditFoodCategory;

const CreateFoodLoadingState = () => {
  return (
    <div className="fixed bg-[#f9f9f9d9] animate-pulse flex justify-center items-center inset-0 z-50">
      <Spinner color="default" />
    </div>
  );
};
