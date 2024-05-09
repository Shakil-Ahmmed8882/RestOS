
import { useContext } from "react";
import EditForm from "../../../Components/Shared/form/EditForm";
import { useAuth } from "../../../Utils/useAuthHelper";
import { profileContext } from "./Edit/Edit";
import { handleUpdateProfile } from "../../../Utils/auth";


const ProfileForm = () => {

    const {isReveal,setIsReveal} = useContext(profileContext)
    const { updateUserInfo } = useAuth()


    const UpdateUserProfile = (e) => {
        e.preventDefault()
        handleUpdateProfile(e,updateUserInfo)
        setIsReveal(false)
    }


    return (
        <>
            <EditForm type={'social-link-form'} handleSave={UpdateUserProfile} {...{isReveal,setIsReveal}}/>
        </>
    );
};

export default ProfileForm;

