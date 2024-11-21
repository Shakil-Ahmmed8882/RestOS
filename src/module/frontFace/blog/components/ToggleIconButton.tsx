import React from "react";

const ToggleIconButton = ({
  defaultIcon: DefaultIcon,
  activeIcon: ActiveIcon,
  isActive,
  onClick,
  sizeClass = "size-6",
  transitionClass = "transition500",
  colorClass = "text-[#727272]",
}) => {
  return (
    <button onClick={onClick} className="relative flex items-center">
      <DefaultIcon
        className={`!size-5 ${!isActive ? "visible opacity-100" : "invisible opacity-0"} ${sizeClass} ${colorClass}`}
      />
      <ActiveIcon
        className={`
          !size-5
          ${
          isActive ? "visible opacity-100 text-primaryColor" : "invisible opacity-0"
        } ${transitionClass} absolute ${sizeClass}`}
      />
    </button>
  );
};

export default ToggleIconButton;
