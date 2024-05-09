const Input = ({name,placeholder,type}) => {
    return <>
    
    <input placeholder={placeholder} name={name} className={` w-full p-2 rounded-lg  bg-[#f7f7f7] transition-all duration-500 focus-within:outline-[#d8daffcf] `} type={type} />
    </>
}


export default Input