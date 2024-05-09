
import { CiInstagram } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import AddLinks from "../AddLink";
import SocialLink from "./SocialLink";




const SocialLinks = (setIsReveal) => {


  const handleAddLink = e => {
    e.preventDefault()

    const form = e.target
    const name = form.name
    const link = form.link
    
    console.log(name)
    console.log(link)
    setIsReveal(false)
    form.reset()
    



    
  }
  return (
    <>
       <div className="flex gap-3 w-[50%] flex-wrap mt-6">
            <SocialLink icon={CiInstagram} label={'@Insta'} iconColor={'red'} />
            <SocialLink icon={CiMail} label={'Email'} />
            <SocialLink icon={FaFacebookF} label={'Facebook'} iconColor={'#6666ff'} />
            <SocialLink icon={FaTwitter} label={'Twitter'} iconColor={'#3acbff'} />
            <SocialLink icon={FaPhoneAlt} label={'Phone: '} iconColor={'red'} />
            <SocialLink icon={IoLocationSharp} label={'Location'} iconColor={'red'} />
            <AddLinks {...{handleAddLink}}/>
        </div>
    </>
  );
};

export default SocialLinks; 