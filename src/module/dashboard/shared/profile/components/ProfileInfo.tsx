
import { useAppDispatch } from "../../navabar";
import { setProfileData } from "../../../../../redux/features/profile/profile.slice";
import { useGetSingleUserQuery } from "../../../../../redux/features/profile/profile.api";
import React, { useEffect } from "react";
import ProfileForm from "./ProfileForm";

export default function ProfileInfo({ setProfileCompletionPercentage }) {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetSingleUserQuery(undefined);


  
  

  useEffect(() => {
    if (data && data.data) {
      console.log(data.data);
      dispatch(setProfileData(data.data));
      calculateCompletionPercentage(data?.data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const calculateCompletionPercentage = (data: any) => {
    // Helper function to flatten nested objects
    const flattenObject = (obj: any): (string | number | boolean)[] => {
      let result: (string | number | boolean)[] = [];

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          // If the value is an object, flatten it recursively
          if (typeof value === "object" && value !== null) {
            // If the value is an array, push each item as a separate value
            if (Array.isArray(value)) {
              result = result.concat(value); // Flatten arrays
            } else {
              result = result.concat(flattenObject(value)); // Flatten nested objects
            }
          } else {
            result.push(value);
          }
        }
      }
      return result;
    };

    // Flatten the object
    const flattenedValues = flattenObject(data);

    // Filter out empty values (strings, arrays, etc.) while considering `0` as valid
    const filledValues = flattenedValues.filter((value) => {
      // Only include the value if it's not an empty string, null, or undefined
      return (Array.isArray(value) && value.length > 0) || value || value === 0;
    });

    // Total possible fields (including nested fields)
    const totalFields = flattenedValues.length;

    // Filled fields count
    const filledFieldsCount = filledValues.length;

    // Calculate the completion percentage
    const completionPercentage = Math.round(
      (filledFieldsCount / totalFields) * 100
    );

    setProfileCompletionPercentage(completionPercentage);
  };

  return (
    <ProfileForm
      data={data?.data}
      calculateCompletionPercentage={calculateCompletionPercentage}
    />
  );
}
