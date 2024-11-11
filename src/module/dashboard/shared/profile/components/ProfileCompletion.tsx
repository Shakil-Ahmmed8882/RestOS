import { Card } from "@nextui-org/react";
import React, { useEffect } from "react";
import DonutChart from "../../../userDashboard/dashboard/components/charts/DonutChart";
import { useAppSelector } from "../../../../../redux/hooks";

export default function ProfileCompletion({ profileCompletionPercentage }) {
  const { profileData } = useAppSelector((state) => state.profile);

  
  console.log({profileData})

  const tasks = [
    { name: "Bio", completed: Boolean(profileData.bio) },
    { name: "Contact Number", completed: Boolean(profileData.contactNumber) },
    { name: "Location", completed: Boolean(profileData.location) },
    {
      name: "Cuisine Preferences",
      completed: profileData.cuisinePreferences?.length > 0,
    },
    {
      name: "Favorite Restaurants",
      completed: profileData.favoriteRestaurants?.length > 0,
    },
    {
      name: "Dietary Restrictions",
      completed: profileData.dietaryRestrictions?.length > 0,
    },
    {
      name: "Dining Frequency",
      completed: Boolean(profileData.diningFrequency),
    },
    {
      name: "Preferred Meal Times",
      completed: profileData.preferredMealTimes?.length > 0,
    },
    {
      name: "Payment Methods",
      completed: profileData.paymentMethods?.length > 0,
    },
    {
      name: "Instagram",
      completed: profileData.socialMedia?.instagram?.trim() !== "", // Ensure it's not empty
    },
    {
      name: "Facebook",
      completed: profileData.socialMedia?.facebook?.trim() !== "", // Ensure it's not empty
    },
    {
      name: "Twitter",
      completed: profileData.socialMedia?.twitter?.trim() !== "", // Ensure it's not empty
    },
  ];
  


  


  return (
    <Card className="p-4 w-full lg:w-1/2 shadow-none lg:h-screen pb-20 lg:pb-0 lg:min-h-screen lg:sticky top-16">
      <DonutChart percentage={profileCompletionPercentage} />
      {/* Render list of tasks */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Profile Completion Tasks</h3>
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <Task key={index} task={task} />
          ))}
        </div>
      </div>
    </Card>
  );
}

// Task component for individual fields with checkmark
function Task({ task }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-[gray] ">
        <div
          className={`w-4 h-4 rounded-full ${
            task.completed ? "bg-primaryColor" : "border border-[gray]"
          }`}
        />
        <span className={` ${task.completed ? "line-through" : ""}`}>
          {task.name}
        </span>
      </div>
      <span className={task.completed ? "text-primaryColor" : "text-[gray]"}>
        {task.completed ? "Completed" : "Pending"}
      </span>
    </div>
  );
}
