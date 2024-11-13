import React, { useState } from "react";

export default function ProfileName({ user, name = "", setName, updateUserInfo }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const finalName = name.trim() === "" ? user?.displayName : name;
    setName(finalName);
    setIsEditing(false);
    await updateUserInfo(finalName, user?.photoURL);
  };

  return (
    <div className="space-y-1 relative w-full">
      <input
        value={name || user?.displayName}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={handleSave}
        className="text-3xl focus-within:outline-none focus-within:text-[black] font-bold text-[#6d6d6d]"
      />
      <p className="text-xs text-[gray]">CEO/DEVELOPER</p>
      {isEditing && (
        <button onClick={handleSave} className="bg-primaryColor p-1 px-4 text-white text-sm">
          Save
        </button>
      )}
    </div>
  );
}
