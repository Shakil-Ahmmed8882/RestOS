
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
            <SocialLink icon={CiInstagram} label={'@shakil'} iconColor={'red'} />
            <SocialLink icon={CiMail} label={'shakil@gmail.com'} />
            <SocialLink icon={FaFacebookF} label={'shakil.meta.com'} iconColor={'#6666ff'} />
            <SocialLink icon={FaTwitter} label={'@shakil84'} iconColor={'#3acbff'} />
            <SocialLink icon={FaPhoneAlt} label={'0143785478'} iconColor={'red'} />
            <SocialLink icon={IoLocationSharp} label={'CTG, Bangladesh'} iconColor={'red'} />
            <AddLinks />
        </div>
    </>
  );
};

export default SocialLinks; 