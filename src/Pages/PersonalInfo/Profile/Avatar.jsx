const Avatar = () => {
    return (
        <>
            <div className="flex  items-center gap-3 bg-gradient-to-r from-[#f3fff4] to-[#faf6ff] p-2 rounded-md">
                <img className="w-32 h-32 rounded-full object-cover" alt='react' src='https://media.istockphoto.com/id/1311433805/photo/side-view-profile-portrait-of-cute-african-american-girl.jpg?s=1024x1024&w=is&k=20&c=8kwLrFZAXk2oG3IUD1tm2zNmn4ybFkvWUDZ8o3BPheU=' />
                <div>
                    <p className="bg-primaryColor text-[white] rounded-sm shadow-md p-2 px-8">change photo</p>
                    <p className=" rounded-sm bg-[white] shadow-md p-2">change photo</p>
                </div>
            </div>
        </>
    );
};

export default Avatar;