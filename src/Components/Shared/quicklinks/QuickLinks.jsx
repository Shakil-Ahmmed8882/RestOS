import { IoCloseOutline } from "react-icons/io5";
import Link from "./Link";
import ParentLinks from "./ParentLinks";

const QuickLinks = ({ showLink, setShowLink }) => {

    return (
        <>
            <>

                <div className={`absolute ${showLink ? ' translate-y-0 ease-soft-spring show-with-animation ' : 'hide-with-animation translate-y-[100%] ease-in'} transition-all duration-500 z-40 bg-[white] left-0 right-0 top-0 ml-3 md:ml-72 bottom-0 pt-16 pl-5 bg-gradient-to-r from-[#f7fff7] to-[#f5f0ff]`}>
                    <h2 className="text-2xl font-bold mb-4 dark:text-gray-50">Quick Links</h2>
                    <ParentLinks/>
                    <IoCloseOutline onClick={() => setShowLink(false)} className="z-40 absolute top-6 cursor-pointer text-[#aeaeae] right-9 text-4xl hover:text-[black] transition300 " />
                </div>
            </>
        </>
    );
};

export default QuickLinks;




