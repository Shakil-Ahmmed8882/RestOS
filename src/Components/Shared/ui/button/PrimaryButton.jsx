
const PrimaryButton = ({handleClick,text}) => {
    return <>

        <button type="submit" onClick={handleClick} className="bg-primaryColor w-full p-2 rounded-lg active:scale-90 transition-all duration-500 text-[white]">{text}</button>
    </>
}

export default PrimaryButton