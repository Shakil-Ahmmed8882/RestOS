import { Button } from "@nextui-org/react";
import RSForm from "../../../../../shared/forms/RSForm";
import RSInput from "../../../../../shared/forms/RSInput";
import RSTextarea from "../../../../../shared/forms/RSTextArea";
import ProfileCard from "./ProfileCard";
import React, { useState } from "react";

export default function ProfileInfo() {
  const [editing, setEditing] = useState({
    personal: false,
    location: false,
    bio: false,
  });

  const defaultValues = {
    fullName: "Gordon's Restaurant",
    email: "contact@gordons.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    bio: "We are passionate about creating memorable dining experiences.",
  };

  const onSubmit = (data) => console.log(data);

  return (
    <RSForm defaultValues={defaultValues} onSubmit={onSubmit}>
      <div className="grid gap-4 ">
        <ProfileCard title="Bio" editing={editing.bio} setEditing={setEditing}>
          <RSTextarea name="bio" label="Bio" disabled={!editing.bio} />
        </ProfileCard>

        <ProfileCard
          title="Personal Info"
          editing={editing.personal}
          setEditing={setEditing}
        >
          <RSInput
            name="fullName"
            label="Full Name"
            disabled={!editing.personal}
          />
          <RSInput name="email" label="Email" disabled={!editing.personal} />
          <RSInput name="phone" label="Phone" disabled={!editing.personal} />
        </ProfileCard>

        <ProfileCard
          title="Location"
          editing={editing.location}
          setEditing={setEditing}
        >
          <RSInput
            name="location"
            label="Location"
            disabled={!editing.location}
          />
        </ProfileCard>
      </div>
      <div className="w-full text-end">
      <Button type="submit" className="text-[white] bg-primaryColor rounded-md">Save changes</Button>
      </div>
    </RSForm>
  );
}
