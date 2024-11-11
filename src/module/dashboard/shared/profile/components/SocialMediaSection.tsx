import React from "react";
import RSInput from "../../../../../shared/forms/RSInput";
import ProfileCard from "./ProfileCard";

export default function SocialMediaSection() {
  return (
    <ProfileCard title="Social Medias">
      <RSInput name="instagram" label="Instagram" />
      <RSInput name="facebook" label="Facebook" />
      <RSInput name="twitter" label="Twitter" />
    </ProfileCard>
  );
}
