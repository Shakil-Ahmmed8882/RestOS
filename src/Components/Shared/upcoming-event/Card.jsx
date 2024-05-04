
const Card = () => {
    return (
        <>
            <a className="group block bg-[#fff] shadow-md shadow-[#dfdfdf]" href="#">
                <div className="aspect-w-10 h-36 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                        src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Link thumbnail"
                        width={300}
                        height={200}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                        style={{ aspectRatio: "300/200", objectFit: "cover" }}
                    />
                </div>
                <div className="mt-3 p-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        My Portfolio
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Check out my latest projects and designs.
                    </p>
                </div>
            </a>
        </>
    );
};

export default Card; 