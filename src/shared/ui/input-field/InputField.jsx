
const InputField = ({ label, id, placeholder, type }) => {
    return (
        <div className="space-y-2">
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className="flex h-10 w-full rounded-md border border-[#ececec] shadow-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100 dark:bg-gray-800"
                id={id}
                placeholder={placeholder}
                type={type}
            />
        </div>
    );
};

export default InputField;
