import InputField from "../../../Components/Shared/ui/input-field/InputField";

const ProfileForm = () => {
    return(
        <>
            <main className="flex  w-full flex-col  bg-gradient-to-br from-blue-500 to-green-500 ">
                <div className="w-full rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <X/>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                                Edit Profile
                            </h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Notifications/>
                            <UserIcon/>
                        </div>
                    </div>
                    <div className="mt-8 space-y-6">
                        <div className="grid gap-4">
                         
                            <InputField label="UPI ID" id="upi-id" placeholder="Enter UPI ID" type="text" />
                            <InputField label="UPI ID" id="upi-id" placeholder="Enter UPI ID" type="text" />
                            <InputField label="UPI ID" id="upi-id" placeholder="Enter UPI ID" type="text" />
                            <InputField label="UPI ID" id="upi-id" placeholder="Enter UPI ID" type="text" />
                        </div>
                
                        <button className="inline-flex bg-primaryColor text-[white] items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-green-500 dark:hover:bg-green-600">
                            Save
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProfileForm;



// icons 
const CameraIcon = () => {
    return (
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 absolute right-2 top-1/2 -translate-y-1/2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
            >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx={12} cy={13} r={3} />
            </svg>
            <span className="sr-only">Scan face</span>
        </button>
    )
}
const Notifications = () => {
    return (
        
<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#dcdcdc] hover:border-[black] duration-300 bg-background group h-10 w-10">
<svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-[#b5b5b5] group-hover:text-[black]   "
>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
</svg>
<span className="sr-only">Notifications</span>
</button>
    )
}


// icons 
const UserIcon = () => {
    return (
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#dcdcdc] hover:border-[black] duration-300 bg-background group h-10 w-10">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-[#b5b5b5] group-hover:text-[black]   "
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx={12} cy={7} r={4} />
        </svg>
    </button>
    )
}


// 

const X = () => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-blue-500"
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
    )
}