import { useTheme } from "next-themes";
import './home.css'
import React from "react";

const Curve = () => {
  const { theme } = useTheme();
  return (
    <div className="">
      {theme == "light" ? (

      <>
      <svg
            className="absolute top-[100px]  -left-[80%] custom-rotate   "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 8 1440 320">
        <path
          fill="#ff99c830"
          fillOpacity="1"
          d="M0,96L40,128C80,160,160,224,240,250.7C320,277,400,267,480,234.7C560,203,640,149,720,106.7C800,64,880,32,960,32C1040,32,1120,64,1200,96C1280,128,1360,160,1400,176L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
      </svg>

      <div className="bg-[#ff99c830] w-full h-80 absolute custom-rotate-portion top-0">

</div>
      
      
      </>
      ) : (
        <svg
          className="absolute -top-[4px] -left-[400px] -rotate-180 translate-y-5  "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 8 1440 320">
          <path
            fill="#000"
            fill-opacity="1"
            d="M0,96L40,128C80,160,160,224,240,250.7C320,277,400,267,480,234.7C560,203,640,149,720,106.7C800,64,880,32,960,32C1040,32,1120,64,1200,96C1280,128,1360,160,1400,176L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      )}

    </div>
  );
};

export default Curve;
