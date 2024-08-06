// @ts-nocheck
import React from "react"
import { ImportContainer } from "."

const { 
    IoIosClose,
    RiEditCircleLine,
    LiaUserEditSolid,
    useRef,
    Input,
    PrimaryButton,
    useClickOutside } = ImportContainer()

const EditForm = ({ setIsReveal, isReveal, handleSave, type }) => {

    // hide edit form in outside click
    const formRef = useRef(null)
    const callback = () => {
        setIsReveal(false)
    }
    useClickOutside(formRef, callback)


    const socialLinkForm = type === 'social-link-form'

    // const profileEdit = type === 'profile-edit-form'
    // const profileEditForm = false
    return <>

        <form
            ref={formRef}
            onSubmit={handleSave} className={`${isReveal ? 'visible z-50 opacity-100  translate-x-0' : 'invisible opacity-0 translate-x-10'} p-4 shadow-md min-h-72 pt-10 flex flex-col items-center w-80 space-y-4 transition-all duration-500 absolute top-9 left-0 bg-[#ffffff] `}>
            {
                socialLinkForm ? <LiaUserEditSolid className="text-5xl p-[10px] bg-[#f7f7f7] rounded-full" /> :
                    <RiEditCircleLine className="text-5xl p-2 bg-[#f7f7f7] rounded-full" />

            }

            {
                socialLinkForm ?
                    <>
                        <div className="space-y-4">
                            <Input placeholder={'Name'} name={'name'} type={'text'} />
                            <Input placeholder={'change photo'} name={'image'} type={'file'} />
                            <Input placeholder={'more..'} name={''} type={'text'} />
                            <PrimaryButton text={'save'} />
                        </div>
                    </> :
                    <>
                        <div className="space-y-4">
                            <Input isFocusName={true} isLinkInput={true} placeholder={'Media name'} name={'name'} type={'text'} />
                            <Input isLinkInput={true} placeholder={'Media link'} name={'link'} type={'text'} />
                            <PrimaryButton text={'save'} />
                        </div>
                    </>
            }

            <IoIosClose onClick={() => setIsReveal(false)} className="cursor-pointer text-3xl text-[red] absolute -top-3 right-3" />
        </form>
    </>
}


export default EditForm