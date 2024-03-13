import { useTheme } from "@material-tailwind/react"

const TitleAndDescription = ({children}) => {
    const {theme} = useTheme()


    return (
        <>
        <h1
        className={`text-3xl ${
          theme === "dark" ? "text-[white]" : ""
        } md:text-4xl lg:text-5xl font-bold pb-1`}
      >
        Fresh food
        {children}
      </h1>
        
      <p
              className={`${
                theme == "dark" ? "text-[#dadada]" : "text-[#828282]"
              } font-sans text-[15px] md:text-[18px]`}
            >
              Enjoy a delectable array of dishes crafted with the finest
              ingredients. From savory entrees to delightful desserts.
            </p>

        
        </>
    )
}


export default TitleAndDescription