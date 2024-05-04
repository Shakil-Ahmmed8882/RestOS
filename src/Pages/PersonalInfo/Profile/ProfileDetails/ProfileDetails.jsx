import SocialLinks from "./social-link/SocialLinks";
import EventAndLinks from "./event&quicklinks/EventAndLinks";

const ProfileDetails = () => {

    return (
        <div className="flex items-start">

            <SocialLinks />
            <EventAndLinks />
        </div>
    )
}

export default ProfileDetails