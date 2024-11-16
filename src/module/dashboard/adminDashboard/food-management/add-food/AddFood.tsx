import React, { useState } from "react";
import { Button } from "@nextui-org/react";

import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RSForm from "../../../../../shared/forms/RSForm";
import RSInput from "../../../../../shared/forms/RSInput";
import RSSelect from "../../../../../shared/forms/RSSelect";
import RSTextarea from "../../../../../shared/forms/RSTextArea";
import ImageUploader from "../../../../../shared/ui/ImageUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { foodSchema } from "../../../../../schema/food.chema";
import {
  foodCategories,
  foodStatusOptions,
} from "../../../../../demo-data/food";
import { useCreateFoodMutation } from "../../../../../redux/features/food/food.api";

const AddFoodLayout = () => {
  const navigate = useNavigate();
  const [createFood] = useCreateFoodMutation();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const handleImageChange = (files: File[]) => {
    setImageFiles(files);
  };

  const onFoodSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    const foodData = {
      ...data,
      quantity: Number(data.quantity) || 1,
      price: Number(data.price) || 10,
    };
    // getting only the values based filds in data
    //not undefined or "" or 0 value like price, quantity
    const sanitizedFoodData = Object.fromEntries(
      Object.entries(foodData).filter(
        ([key, value]) =>
          value !== "" &&
          value !== undefined &&
          !(typeof value === "number" && value <= 0)
      )
    );

    // appending formdata
    for (let image of imageFiles) {
      formData.append("file", image);
    }
    formData.append("data", JSON.stringify(sanitizedFoodData));

    try {
      const res = await createFood(formData);
      
      console.log(res)
    } catch (error) {}
  };

  return (
    <section>
      <div className="py-10 block">
        <RSForm onSubmit={onFoodSubmit} resolver={zodResolver(foodSchema)}>
          <div className="flex justify-between items-center pr-3 pb-3">
            <h1>Add Food </h1>
            <Link to={"/admin/dashboard/all-foods/"}>
              <ArrowLeft className="bg-[#f2f2f2] size-12 p-3  rounded-full" />
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 auto-rows-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <RSInput name="foodName" label="Food Name" />
              <RSSelect
                options={foodStatusOptions}
                name="status"
                label="Status"
              />
              <RSTextarea name="description" label="Write Food Description" />

              <RSSelect
                options={foodCategories}
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

              {/* <ImageUploader onImagesChange={handleImageChange} /> */}
              <ImageUploader imagePreviews={imagePreviews} setImagePreviews={setImagePreviews} onImagesChange={handleImageChange} />
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

export default AddFoodLayout;
