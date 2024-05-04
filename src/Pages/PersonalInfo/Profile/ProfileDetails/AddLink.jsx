import { useState } from "react"
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