import { Button } from "@nextui-org/react";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import RSInput from "../../../../shared/forms/RSInput";
import { IoMdTrash } from "react-icons/io";

const Instructions = ({ handleFieldAppend, fields, methods, remove }) => {
  return (
    <div className="md:col-span-1">
      <div>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl">Instructions</h1>
          <Button
            className="bg-[#f3f3f3] text-[#000]"
            isIconOnly
            onClick={handleFieldAppend}
          >
            <IoAddOutline className="size-7 font-bold" />
          </Button>
        </div>

        <div className="relative min-h-[20vh] md:min-h-[80vh] ">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex  items-center gap-3 relative z-50"
            >
              <RSInput
                label={`Instruction ${index + 1}`}
                name={`instructions.${index}`}
                labelColor="#00D019"
                className={`${
                  index > 0 ? "mt-4" : ""
                } bg-[#fff] border-collapse  `}
                onChange={(e) =>
                  methods.setValue(`instructions.${index}`, e.target.value)
                }
              />
              <Button
                isIconOnly
                className="h-12 w-16 bg-[#fff1f8] "
                onClick={() => remove(index)}
              >
                <IoMdTrash className="size-6 text-deepPink" />
              </Button>
            </div>
          ))}
          {fields.length == 0 && (
            <img
              className="absolute top-0 object-cover md:object-fill opacity-5 left-0 h-full w-full"
              src="https://media.istockphoto.com/id/960360172/photo/flying-tomato-with-cucumber-onion-garlic-and-parsley.jpg?s=612x612&w=0&k=20&c=_2LmAcFQY5glm7pMsO3rfM0BZWb2hh58a3_ZLMuNcpY="
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Instructions;
