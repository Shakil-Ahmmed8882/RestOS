
import { useContext } from "react";
import EditForm from "../../components/EditForm";

import { profileContext } from "./Edit"; 
import { useAuth } from "../../../../../../Utils/useAuthHelper";
import { handleUpdateProfile } from "../../../../../../Utils/auth";
import UserImage from "../../components/UserImage";


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

