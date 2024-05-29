
import { useContext } from "react";
import EditForm from "../../../../Components/Shared/form/EditForm";
import { useAuth } from "../../../../Utils/useAuthHelper";
import { profileContext } from "./Edit/Edit";
import { handleUpdateProfile } from "../../../../Utils/auth";
import UserImage from "./user/UserImage";


const ProfileForm = () => {

    const image = UserImage()
    const {isReveal,setIsReveal} = useContext(profileContext)
    const { updateUserInfo } = useAuth()


    // update profile 
    const UpdateUserProfile = (e) => {
        e.preventDefault()
        handleUpdateProfile(e,image,updateUserInfo)
        setIsReveal(false)
    }


    return (
        <>
            <EditForm type={'social-link-form'} handleSave={UpdateUserProfile} {...{isReveal,setIsReveal}}/>
        </>
    );
};

export default ProfileForm;

