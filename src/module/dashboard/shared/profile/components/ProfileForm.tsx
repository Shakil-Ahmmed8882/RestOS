import React from "react";
import RSForm from "../../../../../shared/forms/RSForm";
import ProfileSection from "./ProfileSection";
import SocialMediaSection from "./SocialMediaSection";
import { Button } from "@nextui-org/react";
import { useAppDispatch } from "../../navabar";
import { setProfileData } from "../../../../../redux/features/profile/profile.slice";
import { useUpdateUserMutation } from "../../../../../redux/features/profile/profile.api";

export default function ProfileForm({ data, calculateCompletionPercentage }) {
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();


//Default value of user 
  const defaultValues = {
    email: data?.email || "",
    contactNumber: data?.contactNumber || "",
    bio: data?.bio || "",
    cuisinePreferences: data?.cuisinePreferences || [],
    favoriteRestaurants: data?.favoriteRestaurants || [],
    dietaryRestrictions: data?.dietaryRestrictions || [],
    diningFrequency: data?.diningFrequency || "",
    location: data?.location || "",
    preferredMealTimes: data?.preferredMealTimes || [],
    paymentMethods: data?.paymentMethods || [],
    instagram: data?.socialMedia?.instagram || "",
    facebook: data?.socialMedia?.facebook || "",
    twitter: data?.socialMedia?.twitter || "",
  };

  // update user info 
  // dispatch in local slice 
  // calculate percentage for chart view 
  // then actual api call 
  const onsubmit = async (formData) => {
    const userData = {
      ...formData,
      preferredMealTimes: [formData.preferredMealTimes],
      paymentMethods: [formData.paymentMethods],
      socialMedia: {
        instagram: formData.instagram,
        facebook: formData.facebook,
        twitter: formData.twitter,
      },
    };
    dispatch(setProfileData(userData));
    calculateCompletionPercentage(formData);

    try {
      const res = await updateUser(userData);

      console.log({ res });
    } catch (error) {}
  };

  return (
    <RSForm onSubmit={onsubmit} defaultValues={defaultValues}>
      <div className="grid gap-4">
        <ProfileSection title="Bio" name="bio" editingField="bio" />
        <ProfileSection
          title="Personal Info"
          name="personalInfo"
          editingField="personal"
        />
        <ProfileSection
          title="Dining Preferences"
          name="preferences"
          editingField="preferences"
        />
        <ProfileSection
          title="Payment Options"
          name="paymentOptions"
          editingField="preferences"
        />
        <SocialMediaSection />
      </div>

      <div className="w-full text-end">
        {" "}
        <Button
          type="submit"
          className="text-white text-[white] bg-primaryColor rounded-md"
        >
          Save Changes
        </Button>
      </div>
    </RSForm>
  );
}
