
const Link = ({ icon: Icon,text }) => {
    return (
        <a
            className="flex items-center gap-2 p-3 shadow-md shadow-[#dfdfdf] bg-[#ffffff] rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            href="#"
        >
           <Icon/>
            <span className="text-gray-700 dark:text-gray-300">
                {text}
            </span>
        </a>
    );
};

export default Link; 