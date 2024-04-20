const Banner = () => {
    return (
        <div className="hero h-44 w-full flex  justify-center items-center text-[white] rounded-t-lg overflow-hidden relative " style={{ backgroundImage: 'url(https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQYALwFaLdWRO4aMfsfPYdnr2vD73VuUr0y1tTiFjYENDXf7XBEIqdYbX1TUPcNy44sYx1wMRrgSM6nBZM4QSU)' }}>
            <div className=" bg-gradient-to-r from-[#00535a6c] to-[#00535a6c]
             absolute top-0 bg-blend-lighten left-0 w-full h-44"></div>
            <div className=" hero-content text-center flex flex-col text-neutral-content relative z-50">                
                    <h1 className="mb-3 text-5xl text-[white] font-bold">Welcome</h1>
            </div>
        </div>
    );
};
export default Banner
