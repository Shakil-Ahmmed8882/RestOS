import { Loader } from "./Loader";


const Spinner = () => {
      return (
            <div className="grid md:grid-cols-3 gap-3 mx-5">
            <div className="">
            <Loader></Loader>
            </div>
            <div className="hidden md:block">
            <Loader></Loader>
            </div>
            <div className="hidden md:block">
            <Loader></Loader>
            </div>
      </div>
      );
};

export default Spinner;