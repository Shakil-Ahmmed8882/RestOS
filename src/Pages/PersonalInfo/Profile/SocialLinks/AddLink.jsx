import { RiEditCircleLine } from "react-icons/ri";
import { useState } from "react"
import InputField from "../../../../Components/Shared/ui/input-field/InputField";
import PrimaryButton from "../../../../Components/Shared/ui/button/PrimaryButton";
import Input from "../../../../Components/Shared/ui/input-field/Input";
import AddLinkForm from "./AddLinkForm";


const AddLinks = () => {

    const [addLink,setAddLink] = useState(false)


    return (
        <>
        <div className="relative">
            <button onClick={()=> setAddLink(!addLink)} className="flex justify-self-center items-center cursor-pointer gap-1 px-2 py-1 rounded-lg bg-[#f1f1f1] relative z-30"><span className="bg-[#fafafa] h-5 w-5 flex justify-center items-center rounded-full ">+</span> Add
            </button>
            <AddLinkForm addLink={addLink} setAddLink={setAddLink}/>

        </div>


        </>
    )
}

export default AddLinks