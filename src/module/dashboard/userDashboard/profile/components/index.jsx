import { IoIosClose } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri"
import { LiaUserEditSolid } from "react-icons/lia";
import { useRef } from "react";
import useClickOutside from "../../../../../🔗Hook/useClickOutside"; 
import PrimaryButton from "../../../../../shared/ui/PrimaryButton";
import Input from "../../../../../shared/ui/input-field/Input";
 

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