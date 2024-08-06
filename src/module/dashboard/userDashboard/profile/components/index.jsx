import { IoIosClose } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri"
import { LiaUserEditSolid } from "react-icons/lia";
import { useRef } from "react";
import useClickOutside from "../../../../../🔗Hook/useClickOutside";
import PrimaryButton from "../../../../../Components/Shared/ui/button/PrimaryButton";
import Input from "../../../../../Components/Shared/ui/input-field/Input";
 

export const ImportContainer = () => {
    return {
        IoIosClose,
        RiEditCircleLine,
        LiaUserEditSolid,
        useRef,
        Input,
        PrimaryButton,
        useClickOutside
        
    }
}