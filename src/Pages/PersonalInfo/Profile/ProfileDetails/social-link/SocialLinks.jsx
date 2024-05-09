
import { CiInstagram } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import AddLinks from "../AddLink";
import SocialLink from "./SocialLink";




const SocialLinks = () => {
  return (
    <>
       <div className="flex gap-3 w-[50%] flex-wrap mt-6">
            <SocialLink icon={CiInstagram} label={'@Insta'} iconColor={'red'} />
            <SocialLink icon={CiMail} label={'Email'} />
            <SocialLink icon={FaFacebookF} label={'Facebook'} iconColor={'#6666ff'} />
            <SocialLink icon={FaTwitter} label={'Twitter'} iconColor={'#3acbff'} />
            <SocialLink icon={FaPhoneAlt} label={'Phone: '} iconColor={'red'} />
            <SocialLink icon={IoLocationSharp} label={'Location'} iconColor={'red'} />
            <AddLinks />
        </div>
    </>
  );
};

export default SocialLinks; 