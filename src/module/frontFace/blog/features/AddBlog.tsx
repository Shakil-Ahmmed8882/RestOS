import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
// import { allDistict } from "@bangladeshi/bangladesh-address";
import React, { ChangeEvent, useEffect, useState } from "react";
import starAi from "../../../../assets/img/dashboard/star.png";
import RSModal from "../../../../shared/modals/RSModal";
import RSInput from "../../../../shared/forms/RSInput";
import RSSelect from "../../../../shared/forms/RSSelect";
import RSTextarea from "../../../../shared/forms/RSTextArea";
import generateDescription from "../../../../services/ImageDescription";
import Instructions from "../components/Ingredient";
import { categoryOptions, tagOptions } from "../blog.constants";
import { useCreateBlogMutation } from "../../../../redux/features/blog/blog.api";
import Spinner from "../../../../shared/ui/Spinner";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {


  // State management part-1
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "instructions",
  });

  // State management part-2
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  
  // State management part-3
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  

  
  // create blog api call 
  const [
    createBlog,
    {
      data: BData,
      isLoading: isBlogCreating,
      isSuccess: isBlogCreationSuccess,
    },
  ] = useCreateBlogMutation();
  const handleFieldAppend = () => {
    append(" ");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionGeneration = async () => {
    setIsLoading(true);
    try {
      const response = await generateDescription(
        imagePreviews[0],
        "write a description for RestOs Blog describing the given image "
      );

      methods.setValue("description", response);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const validInstructions = data.instructions.filter(
      (ingredient) => ingredient.trim() !== ""
    );

    
    
    const blogData = {
      ...data,
      tags: [data.tags],
      instructions: validInstructions,
      author: {
        user: import.meta.env.VITE_TEST_USER_ID,
        name: "Chef Mario",
      },
    };
    
    

    // appending formdata
    for (let image of imageFiles) {
      formData.append("file", image);
    }
    formData.append("data", JSON.stringify(blogData));
    
    
    createBlog(formData);

  };

  
  useEffect(()=> {

    if (!isBlogCreating && isBlogCreationSuccess) {
      setModalOpen(false)
  }
  },[isBlogCreating, isBlogCreationSuccess])




console.log(imagePreviews)

  

  return (
    <>
      {isBlogCreating && <Spinner />}
      <div
        className={`flex  ${
          modalOpen
            ? "-translate-x-80 invisible opacity-0"
            : "visible -translate-x-0 opacity-100"
        } transition500 `}
      >
        <Button
          onClick={() => setModalOpen(true)}
          className=" md:p-6 rounded-full  border-none bg-[#fff] !bg-primaryColor/6 !text-primaryColor text-medium md:text-[18px]   shadow-primaryColor/10 shadow-xl"
        >
          Add Blog
        </Button>
      </div>

      {/* Modal */}

      <RSModal {...{ modalOpen, setModalOpen }}>
        {/* {createPostPending && <Loading />} */}
        <div className="h-full rounded-xl  max-w-7xl mx-auto bg-gradient-to-r from-[#ffffff] py-8 px-2 lg:px-[73px] md:py-12">
          <h1 className="text-2xl font-semibold">Post a found item</h1>
          <Divider className="mb-5 mt-3" />
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid lg:grid-cols-3 gap-3"
            >
              <div className="lg:col-span-2">
                <div className="md:flex space-y-3 md:space-y-0 flex-wrap gap-2 py-2">
                  <div className="min-w-fit flex-1">
                    <RSInput label="Title" name="title" />
                  </div>
                  <div className="min-w-fit flex-1">
                    <RSSelect
                      // disabled={!categorySuccess}
                      label="Category"
                      name="category"
                      options={categoryOptions}
                    />
                  </div>
                </div>

                <div className="space-y-3 md:space-y-0 md:flex flex-wrap gap-2 py-2">
                  <div className="min-w-fit flex-1">
                    <RSSelect label="Tags" name="tags" options={tagOptions} />
                  </div>
                  <div className="min-w-fit flex-1">
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
                      onChange={(e) => handleImageChange(e)}
                    />
                  </div>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="flex gap-5 my-5 flex-wrap">
                    {imagePreviews.map((imageDataUrl) => (
                      <div
                        key={imageDataUrl}
                        className="relative size-20 rounded-xl border-2 border-dashed border-default-300 p-2"
                      >
                        <img
                          alt="item"
                          className="h-full w-full object-cover object-center rounded-md"
                          src={imageDataUrl}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap-reverse gap-2 py-2">
                  <div className="min-w-fit flex-1">
                    <RSTextarea label="Description" name="description" />
                  </div>
                </div>

                <div className="flex justify-end gap-5">
                  {methods.getValues("description") && (
                    <Button onClick={() => methods.resetField("description")}>
                      Clear
                    </Button>
                  )}
                  <Button
                    isDisabled={imagePreviews.length > 0 ? false : true}
                    isLoading={isLoading}
                    className={`${
                      imagePreviews.length > 0
                        ? "border border-primaryColor bg-transparent"
                        : true
                    }`}
                    onClick={() => handleDescriptionGeneration()}
                  >
                    {isLoading ? "Generating...." : "Generate with AI"}
                    <img src={starAi} className="size-10" alt="" />
                  </Button>
                </div>

                <div className="grid md:hidden mt-6">
                  <Instructions
                    fields={fields}
                    handleFieldAppend={handleFieldAppend}
                    methods={methods}
                    remove={remove}
                  />
                </div>

                <div className="flex justify-end mt-8 mb-16">
                  <Button
                    size="lg"
                    className="bg-primaryColor text-[#fff]"
                    type="submit"
                  >
                    Post
                  </Button>
                </div>
              </div>

              <div className="hidden md:grid">
                <Instructions
                  fields={fields}
                  handleFieldAppend={handleFieldAppend}
                  methods={methods}
                  remove={remove}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </RSModal>
    </>
  );
}
