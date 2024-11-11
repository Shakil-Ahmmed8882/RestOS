import React from "react";
import RSInput from "../../../../../shared/forms/RSInput";
import RSSelect from "../../../../../shared/forms/RSSelect";
import RSTextarea from "../../../../../shared/forms/RSTextArea";
import ProfileCard from "./ProfileCard";

export default function ProfileSection({ title, name, editingField }) {
  return (
    <ProfileCard title={title}>
      {name === "bio" && (
        <RSTextarea name="bio" label="Bio" disabled={!editingField} />
      )}
      {name === "personalInfo" && (
        <>
          <RSInput name="email" label="Email" disabled={!editingField} />
          <RSInput
            name="contactNumber"
            label="Contact Number"
            disabled={!editingField}
          />
          <RSSelect
            name="location"
            label="Choose Locations"
            options={[
              { label: "Dhaka", value: "dhaka" },
              { label: "Chittagong", value: "chittagong" },
            ]}
          />
        </>
      )}
      {name === "preferences" && (
        <>
          <RSSelect
            name="cuisinePreferences"
            label="Preferred Cuisines"
            options={[
              { label: "Italian", value: "Italian" },
              { label: "Mexican", value: "Mexican" },
            ]}
          />
          <RSInput name="favoriteRestaurants" label="Favorite Restaurants" />
          <RSSelect
            name="dietaryRestrictions"
            label="Dietary Restrictions"
            options={[
              { label: "Vegan", value: "Vegan" },
              { label: "Vegetarian", value: "Vegetarian" },
            ]}
          />
          <RSSelect
            name="diningFrequency"
            label="Dining Frequency"
            options={[
              { label: "Occasionally", value: "Occasionally" },
              { label: "Frequently", value: "Frequently" },
            ]}
          />
          <RSSelect
            name="preferredMealTimes"
            label="Preferred Meal Times"
            options={[
              { label: "Breakfast", value: "Breakfast" },
              { label: "Lunch", value: "Lunch" },
            ]}
          />
        </>
      )}
      {name === "paymentOptions" && (
        <RSSelect
          name="paymentMethods"
          label="Preferred Payment Methods"
          options={[
            { label: "Cash", value: "Cash" },
            { label: "Credit Card", value: "Credit Card" },
          ]}
        />
      )}
    </ProfileCard>
  );
}
