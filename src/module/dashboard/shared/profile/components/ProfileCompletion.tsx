import { Card, Progress } from "@nextui-org/react";
import React from "react";

export default function ProfileCompletion() {
  const completionTasks = [
    { name: "Setup account", progress: "10%", completed: true },
    { name: "Upload your photo", progress: "5%", completed: true },
    { name: "Personal info", progress: "10%", completed: true },
    { name: "Location", progress: "-20%", completed: false },
    { name: "Biography", progress: "15%", completed: true },
    { name: "Notifications", progress: "+10%", completed: false },
    { name: "Menu details", progress: "+30%", completed: false },
  ];

  return (
    <Card className="p-4 w-full lg:w-1/2 shadow-none lg:h-screen pb-20 lg:pb-0 lg:min-h-screen lg:sticky top-0">
      <p className="text-lg font-semibold mb-2">Complete your profile</p>
      <Progress value={40} className="mb-4" color="success" />
      <div className="space-y-2">
        {completionTasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>
    </Card>
  );
}

function Task({ task }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 rounded-full ${
            task.completed ? "bg-green-500" : "border border-gray-300"
          }`}
        />
        <span>{task.name}</span>
      </div>
      <span className={task.completed ? "text-green-500" : "text-gray-400"}>
        {task.progress}
      </span>
    </div>
  );
}
