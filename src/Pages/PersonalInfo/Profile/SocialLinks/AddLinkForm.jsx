import { IoIosClose } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri"
import Input from "../../../../Components/Shared/ui/input-field/Input"
import PrimaryButton from "../../../../Components/Shared/ui/button/PrimaryButton"


const AddLinkForm = ({addLink,setAddLink}) => {
    return <>
    
    <div className={`${addLink?'visible z-50 opacity-100  translate-x-0':'invisible opacity-0 translate-x-10'} p-4 shadow-md h-60 flex flex-col items-center w-80 space-y-4 transition-all duration-500 absolute top-9 left-0 bg-[#ffffff]`}>
            <RiEditCircleLine className="text-5xl p-2 bg-[#f7f7f7] rounded-full"/>
            <div className="space-y-4">
            <Input placeholder={'Media name'} type={'text'}/>
            <Input placeholder={'Media link'} type={'text'}/>
            <PrimaryButton text={'save'}/>
            </div>
            <IoIosClose onClick={()=> setAddLink(false)} className="cursor-pointer text-3xl text-[red] absolute -top-3 right-3"/>            
            </div>
    </>
}


export default AddLinkForm