import { useRef, useState } from "react"
import { linkArray } from "./data";

const Input = ({ name, placeholder, type, isLinkInput, isFocusName }) => {

    const [focusName, setFocusname] = useState(false)
    const isFocus = isLinkInput && isFocusName;
    const [selectedLink, onSelectLink] = useState('')

    
    return <>

        <input
            autoComplete="off"
            onFocus={() => isFocus && setFocusname(true)}
            onBlur={() => isFocus && setFocusname(false)}
            placeholder={placeholder} name={name} className={` w-full p-2 rounded-lg  bg-[#f7f7f7] transition-all duration-500 focus-within:outline-[#d8daffcf] `} type={type} />

        <>
            {
                focusName &&
                <div className="absolute bg-[#722cb8] right-0 text-[white] space-y-3 rounded-md ">
                    {
                        linkArray?.map(link => <p onClick={()=> onSelectLink(link?.name)} className="hover:bg-[#9b36ff] pt-2 p-3">{link.name}</p>)
                    }
                </div>

            }
        </>
    </>
}


export default Input