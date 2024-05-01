const SocialLink = ({icon:Icon,label,iconColor})=> {


    return (
        <>
        <div className="flex gap-1 items-center">
        <Icon className={`text-[${iconColor}]`}/> <span className="text-[gray]">{label}</span>
        </div>       
        </>
    )
}
export default SocialLink