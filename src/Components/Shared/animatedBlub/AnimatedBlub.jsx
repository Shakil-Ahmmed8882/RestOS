

const AnimatedBlub = () => {
      return (
            <div className="h-screen grid relative justify-center items-center w-full">
                  <div className="max-w-lg ">
                        <div className="absolute top-0 left-4 w-96 h-96 bg-[#c0f3ffbc] animation-delay-2000 rounded-full filter blur-[80px]   mix-blend-multiply  animate-blob"></div>
                        <div className="absolute top-0 -left-8 w-96 h-96 animation-delay-4000 bg-[#aefffab8] rounded-full filter blur-[80px]   mix-blend-multiply  animate-blob"></div>
                        <div className="absolute top-0 -bottom-8 left-20  right-4 w-96 h-96 bg-[#8aefff83] rounded-full filter blur-[80px]   mix-blend-multiply  animate-blob animation-delay-400"></div>
                        <div className="m-8 relative space-y-0 opacity-0"> </div>
                  </div>
                  
            </div>
      );
};

export default AnimatedBlub;