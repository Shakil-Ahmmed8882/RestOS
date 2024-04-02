const customTheme = (theme, lightBgColor = "bg-[white]",lightTextColor = "text-[black]", darkBgColor = "bg-[gray]", darkTextColor = "text-[white]") => {
    return theme === "light" ? `bg-[${lightBgColor}] text-[${lightTextColor}]` : `bg-[${darkBgColor}] text-[${darkTextColor}]`;
};


export default customTheme