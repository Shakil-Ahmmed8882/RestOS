
import { CiInstagram } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import AddLinks from "../AddLink";
import SocialLink from "./SocialLink";
import { useState } from "react";
import { linkArray } from "./data";




const SocialLinks = () => {

  const [addLink, setAddLink] = useState(false)

  const handleAddLink = e => {
    e.preventDefault()

    const form = e.target
    const name = form.name.value
    const link = form.link.value

    linkArray.push({name,link,icon:FaPhoneAlt,iconColor:'red'})
    setAddLink(false)
    form.reset()

  }



  return (
    <>
      <div className="flex gap-3 md:w-[100%] lg:w-[50%] flex-wrap mt-6">

        {
          linkArray?.map(media => (
            <SocialLink icon={media.icon} label={media?.name} iconColor={media?.iconColor}/>
          ))
        }
        <AddLinks {...{handleAddLink,addLink,setAddLink}}/>
      </div>
    </>
  );
};

export default SocialLinks; 