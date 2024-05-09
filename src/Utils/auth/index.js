import { isEmpty } from "../Validate"
import { imageUpload } from "../shared"


export const handleUpdateProfile = async(e,updateUserInfo) => {
    e.preventDefault()

    const name = e.target.name.value
    const imageData = e.target.image.files[0]
    

    const bothFieldEmpty = isEmpty(name,imageData)

    // validation if no update don't go down
    if(bothFieldEmpty) return; 

    // if no image update -> don't call imageUpload fun
    const {data} = imageData && await imageUpload(imageData)
    const imageUrl = data?.display_url || ''

    // passing name & image to update
    updateUserInfo(name, imageUrl) 
    .then(() => {
        console.log("successfully updated");
        setShowProfileForm(false)
      })
      .catch((error) => {
        console.log(error);
      });

}