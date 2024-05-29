const SocialLink = ({ icon: Icon, label, iconColor }) => {
    
    return (
        <>
            <div className="flex gap-1 items-center border-1 py-1 px-2 rounded-lg shadow-sm border-[#e9e9e9]">
                <Icon className={`text-[${iconColor}]`} /> <span className="text-[gray]">{label}</span>
            </div>
        </> 
    )
}
export default SocialLink