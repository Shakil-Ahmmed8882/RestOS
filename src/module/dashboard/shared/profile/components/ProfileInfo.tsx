// import { Button } from "@nextui-org/react";
// import RSForm from "../../../../../shared/forms/RSForm";
// import RSInput from "../../../../../shared/forms/RSInput";
// import RSTextarea from "../../../../../shared/forms/RSTextArea";
// import ProfileCard from "./ProfileCard";
// import RSSelect from "../../../../../shared/forms/RSSelect";
// import React, { useEffect, useState } from "react";
// import { useAppDispatch } from "../../navabar";
// import { setProfileData } from "../../../../../redux/features/profile/profile.slice";
// import { useGetSingleUserQuery } from "../../../../../redux/features/profile/profile.api";

// export default function ProfileInfo({ setProfileCompletionPercentage }) {
//   const dispatch = useAppDispatch();
//   const [editing, setEditing] = useState({
//     personal: false,
//     preferences: false,
//     bio: false,
//   });

//   const { data, isLoading, isError } = useGetSingleUserQuery(undefined);

//   useEffect(() => {
//     // Only dispatch if data is available
//     if (data && data.data) {
//       dispatch(setProfileData(data.data));
//       calculateCompletionPercentage(data?.data);
//     }
//   }, [data, dispatch]);

//   // Handle loading and error states
//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error fetching data</div>;


//   type ProfileData = {
//     [key: string]: any;
//   };
  
//   const calculateCompletionPercentage = (data: ProfileData) => {
//     // Helper function to flatten nested objects
//     const flattenObject = (obj: ProfileData): (string | number | boolean)[] => {
//       let result: (string | number | boolean)[] = [];
  
//       for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//           const value = obj[key];
//           // If the value is an object, flatten it recursively
//           if (typeof value === "object" && value !== null) {
//             // If the value is an array, push each item as a separate value
//             if (Array.isArray(value)) {
//               result = result.concat(value); // Flatten arrays
//             } else {
//               result = result.concat(flattenObject(value)); // Flatten nested objects
//             }
//           } else {
//             result.push(value);
//           }
//         }
//       }
//       return result;
//     };
  
//     // Flatten the object
//     const flattenedValues = flattenObject(data);
  
//     // Filter out empty values (strings, arrays, etc.) while considering `0` as valid
//     const filledValues = flattenedValues.filter((value) => {

//       // Only include the value if it's not an empty string, null, or undefined
//       return (Array.isArray(value) && value.length > 0) || value || value === 0;
//     });
  
//     // Total possible fields (including nested fields)
//     const totalFields = flattenedValues.length;
  
//     // Filled fields count
//     const filledFieldsCount = filledValues.length;
  
//     // Calculate the completion percentage
//     const completionPercentage = Math.round(
//       (filledFieldsCount / totalFields) * 100
//     );
  
//     console.log(`Total Fields: ${totalFields}`);
//     console.log(`Filled Fields: ${filledFieldsCount}`);
//     console.log(`Profile Completion: ${completionPercentage}%`);
  
//     setProfileCompletionPercentage(completionPercentage);
//   };
  
  
  

//   const onsubmit = (data) => {
//     const userData = {
//       ...data,
//       socialMedia: {
//         instagram: data.instagram,
//         facebook: data.facebook,
//         twitter: data.twitter,
//       },
//     };
//     dispatch(setProfileData(userData));
//     calculateCompletionPercentage(userData);
//   };

//   const defaultValues = {
//     email: data?.data?.email || '',
//     contactNumber: data?.data?.contactNumber || '',
//     bio: data?.data?.bio || '',
//     cuisinePreferences: data?.data?.cuisinePreferences || [],
//     favoriteRestaurants: data?.data?.favoriteRestaurants || [],
//     dietaryRestrictions: data?.data?.dietaryRestrictions || [],
//     diningFrequency: data?.data?.diningFrequency || '',
//     location: data?.data?.location || '',
//     preferredMealTimes: data?.data?.preferredMealTimes || [],
//     paymentMethods: data?.data?.paymentMethods || [],
//     instagram: data?.data?.socialMedia?.instagram || '',
//       facebook: data?.data?.socialMedia?.facebook || '',
//       twitter: data?.data?.socialMedia?.twitter || '',
//   };


//   return (
//     <RSForm onSubmit={onsubmit} defaultValues={defaultValues}>
//       <div className="grid gap-4">
//         <ProfileCard title="Bio" editing={editing.bio} setEditing={setEditing}>
//           <RSTextarea name="bio" label="Bio" disabled={!editing.bio} />
//         </ProfileCard>

//         <ProfileCard
//           title="Personal Info"
//           editing={editing.personal}
//           setEditing={setEditing}
//         >
//           <RSInput name="email" label="Email" disabled={!editing.personal} />
//           <RSInput
//             name="contactNumber"
//             label="Contact Number"
//             disabled={!editing.personal}
//           />
//           <RSSelect
//             name="location"
//             label="Choose Locations"
//             options={[
//               { label: "Dhaka", value: "dhaka" },
//               { label: "Chittagong", value: "chittagong" },
//             ]}
//           />
//         </ProfileCard>

//         <ProfileCard
//           title="Dining Preferences"
//           editing={editing.preferences}
//           setEditing={setEditing}
//         >
//           <RSSelect
//             name="cuisinePreferences"
//             label="Preferred Cuisines"
//             options={[
//               { label: "Italian", value: "Italian" },
//               { label: "Mexican", value: "Mexican" },
//               { label: "Chinese", value: "Chinese" },
//               { label: "American", value: "American" },
//               { label: "Indian", value: "Indian" },
//               { label: "Other", value: "Other" },
//             ]}
//           />
//           <RSInput name="favoriteRestaurants" label="Favorite Restaurants" />

//           <RSSelect
//             name="dietaryRestrictions"
//             label="Dietary Restrictions"
//             options={[
//               { label: "Vegan", value: "Vegan" },
//               { label: "Vegetarian", value: "Vegetarian" },
//               { label: "Gluten-Free", value: "Gluten-Free" },
//               { label: "Dairy-Free", value: "Dairy-Free" },
//               { label: "None", value: "None" },
//             ]}
//           />
//           <RSSelect
//             name="diningFrequency"
//             label="Dining Frequency"
//             options={[
//               { label: "Occasionally", value: "Occasionally" },
//               { label: "Frequently", value: "Frequently" },
//               { label: "Rarely", value: "Rarely" },
//             ]}
//           />
//           <RSSelect
//             name="preferredMealTimes"
//             label="Preferred Meal Times"
//             options={[
//               { label: "Breakfast", value: "Breakfast" },
//               { label: "Lunch", value: "Lunch" },
//               { label: "Dinner", value: "Dinner" },
//             ]}
//           />
//         </ProfileCard>

//         <ProfileCard
//           title="Payment Options"
//           editing={editing.preferences}
//           setEditing={setEditing}
//         >
//           <RSSelect
//             name="paymentMethods"
//             label="Preferred Payment Methods"
//             options={[
//               { label: "Cash", value: "Cash" },
//               { label: "Credit Card", value: "Credit Card" },
//               { label: "Digital Wallet", value: "Digital Wallet" },
//             ]}
//           />
//         </ProfileCard>
//         <ProfileCard
//           title="Social Medias"
//           editing={editing.preferences}
//           setEditing={setEditing}
//         >
//           <RSInput name="instagram" label="Instagram" />
//           <RSInput name="facebook" label="Facebook" />
//           <RSInput name="twitter" label="Twitter" />
//         </ProfileCard>
//       </div>

//       <div className="w-full text-end">
//         <Button
//           type="submit"
//           className="text-white text-[white] bg-primaryColor rounded-md"
//         >
//           Save Changes
//         </Button>
//       </div>
//     </RSForm>
//   );
// }



import { useAppDispatch } from "../../navabar";
import { setProfileData } from "../../../../../redux/features/profile/profile.slice";
import { useGetSingleUserQuery } from "../../../../../redux/features/profile/profile.api";
import React, {  useEffect } from "react";
import ProfileForm from "./ProfileForm";

export default function ProfileInfo({ setProfileCompletionPercentage }) {
  const dispatch = useAppDispatch();


  const { data, isLoading, isError } = useGetSingleUserQuery(undefined);

  useEffect(() => {
    if (data && data.data) {

      
      console.log(data.data)
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
