import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import RSForm from "../../../../../../shared/forms/RSForm";
import RSInput from "../../../../../../shared/forms/RSInput";
import RSSelect from "../../../../../../shared/forms/RSSelect";
import RSTextarea from "../../../../../../shared/forms/RSTextArea";
import ImageUploader from "../../../../../../shared/ui/ImageUploader";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  useGetSinglefoodQuery,
  useUpdateFoodMutation,
} from "../../../../../../redux/features/food/food.api";

const EditFoodLayout = () => {
  // Using useSearchParams to extract query parameters
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const id = searchParams.get("id");

  const { data } = useGetSinglefoodQuery(`${id}`);
  const [updateFood,{isSuccess:isFoodUpdateSuccess,isLoading:isFoodUpdateLoading}] = useUpdateFoodMutation();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  

  const foodData = data?.data
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


  



  useEffect(()=> {
    setImagePreviews([data?.data?.foodImage]);
  },[data])

  // If foodData is not loaded, return loading state
  if (!data) {
    return <div>Loading...</div>;
  }


  return (
    <section>
      <div className="py-10 block">
        <RSForm onSubmit={onSubmit} >
          <div className="flex justify-between items-center pr-3 pb-3">
            <h1>Edit Food </h1>
            <Link to={"/admin/dashboard/all-foods/"}>
              <ArrowLeft className="bg-[#f2f2f2] size-12 p-3  rounded-full" />
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 auto-rows-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <RSInput defaultvalue={foodData?.foodName} name="foodName" label="Food Name" />
              
              <RSTextarea name="description" label="Write Food Description" />

              <RSSelect
                options={[{ label: "American", value: "Amarican" }]}
                name="foodCategory"
                label="Food Category"
              />
              <RSInput type="number" defaultvalue={foodData?.price} name="price" label="Price" />
              <RSInput name="quantity" defaultvalue={foodData.quantity} label="Quantity" />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              <RSInput defaultvalue={foodData?.made_by} name="made_by" label="Made by" />
              <RSInput defaultvalue={foodData?.food_origin} name="food_origin" label="Food Origin" />

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

export default EditFoodLayout;
