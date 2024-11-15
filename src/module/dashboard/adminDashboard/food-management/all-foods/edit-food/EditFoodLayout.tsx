import React, { ChangeEvent, useEffect, useState } from "react";
import SlidingModal from "../../../../../../shared/modals/SlideLeftModal";
import { Button, Input } from "@nextui-org/react";
import RSForm from "../../../../../../shared/forms/RSForm";
import RSInput from "../../../../../../shared/forms/RSInput";
import RSSelect from "../../../../../../shared/forms/RSSelect";
import RSTextarea from "../../../../../../shared/forms/RSTextArea";
import ImageUploader from "../../../../../../shared/ui/ImageUploader";
import { ArrowLeft, UndoIcon } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  useGetSinglefoodQuery,
  useUpdateFoodMutation,
} from "../../../../../../redux/features/food/food.api";

const EditFoodLayout = () => {
  // Using useSearchParams to extract query parameters
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const id = searchParams.get("id");

  const { data: foodData } = useGetSinglefoodQuery(`${id}`);
  const [updateFood,{isSuccess:isFoodUpdateSuccess,isLoading:isFoodUpdateLoading}] = useUpdateFoodMutation();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  

  const handleImageChange = (files: File[]) => {
    setImageFiles(files);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const foodData = {
      ...data,
      quantity: Number(data.quantity),
      price: Number(data.price),
    };
    // getting only the values based filds in data
    //not undefined or "" or 0 value like price, quantity
    const sanitizedFoodData = Object.fromEntries(
      Object.entries(foodData).filter(
        ([key, value]) => value !== "" && value !== undefined && !(typeof value === "number" && value <= 0)
      )
    );
    

    // appending formdata
    for (let image of imageFiles) {
      formData.append("file", image);
    }
    formData.append("data", JSON.stringify(sanitizedFoodData));

    try {
      await updateFood({ id, data: formData });

      if(isFoodUpdateSuccess && !isFoodUpdateLoading){
          navigate("/admin/dashboard/all-foods/")
      }
    } catch (error) {}
  };

  const defaultValue = {
    _id: foodData?._id,
    foodName: foodData?.foodName,
    status: foodData?.status,
    foodImage: foodData?.foodImage,
    foodCategory: foodData?.foodCategory,
    price: foodData?.price,
    orders: foodData?.orders,
    quantity: foodData?.quantity,
    made_by: foodData?.made_by,
    food_origin: foodData?.food_origin,
    description: foodData?.description,
    reviews: foodData?.reviews,
  };

  // If foodData is not loaded, return loading state
  if (!foodData) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="py-10 block">
        <RSForm onSubmit={onSubmit} defaultValues={defaultValue}>
          <div className="flex justify-between items-center pr-3 pb-3">
            <h1>Edit Food </h1>
            <Link to={"/admin/dashboard/all-foods/"}>
              <ArrowLeft className="bg-[#f2f2f2] size-12 p-3  rounded-full" />
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 auto-rows-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <RSInput name="foodName" label="Food Name" />
              <RSSelect
                options={[{ label: "pending", value: "pending" }]}
                name="status"
                label="Status"
              />
              <RSTextarea name="description" label="Write Food Description" />

              <RSSelect
                options={[{ label: "American", value: "Amarican" }]}
                name="foodCategory"
                label="Food Category"
              />
              <RSInput type="number" name="price" label="Price" />
              <RSInput name="quantity" label="Quantity" />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              <RSInput name="made_by" label="Made by" />
              <RSInput name="food_origin" label="Food Origin" />

              <ImageUploader onImagesChange={handleImageChange} />
            </div>
          </div>

          <div className="text-end pt-3">
            <Button
              type="submit"
              className="bg-primaryColor text-[white] w-full"
            >
              Update
            </Button>
          </div>
        </RSForm>
      </div>
    </section>
  );
};

export default EditFoodLayout;
