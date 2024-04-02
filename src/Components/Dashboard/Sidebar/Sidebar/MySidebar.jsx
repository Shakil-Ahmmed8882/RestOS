import { HiOutlineUsers } from "react-icons/hi2";
import { useState } from "react";
import Logo from "../../../Shared/Logo";
import { SidebarItem } from "./SidebarItem";


import {
  designsItems,
  legalItems,
  officeItems,
  salesItems,
} from "./sidebarDropdownItems";
import MenuItem from "../MenuItem";
import { useNavigate } from "react-router-dom";


export const MySidebar = () => {
  const [isOpenSalesDropdown, setIsOpenSalesDropdown] = useState(false);
  const [isOpenDesignsDropdown, setIsOpenDesignsDropdown] = useState(false);
  const [isOpenOfficeDropdown, setIsOpenOfficeDropdown] = useState(false);
  const [isOpenLegalDropdown, setIsOpenLegalDropdown] = useState(false);
  const [activeRole,setActiveRole] = useState('user')

  const navigate = useNavigate()



  return (
    <>
      <div
        className={`  
        z-10 md:fixed flex-col
        justify-between 
        overflow-x-hidden
        w-72
        bg-[white]
        space-y-6
        px-2 py-4
        absolute inset-y-0
        transition-all
        transform md:translate-x-0
        
        ease-in-out`}
      >
        <div>
          <div className="flex">
            <div className="w-full flex justify-between  gap-3 items-end px-4 py-2">
              <Logo />
              <div>
                <p className="text-[#a7a7a7]">inc</p>
                <h3 className="font-semibold font-"> </h3>
              </div>
              <div>
                <p className="w-7 h-7 flex justify-center items-center rounded-full bg-primary-color z-10 ">
                  <img className=" w-6 h-6 rounded-full object-cover" src="https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </p>
              </div>
            </div>
          </div>
        </div>
          <hr />

          <div className="flex gap-3 ">
          <button onClick={()=> (
            setActiveRole('user') ,navigate('/dashboard')
            )} className={` ${activeRole === 'user'?'bg-primary-color  active:scale-90 text-[white]':'bg-[white]'}  transition-all duration-200 hover:shadow-lg  shadow-md p-3 rounded-lg px-10`}>User</button>
          <button onClick={()=> (
            setActiveRole('admin'),
            navigate('/dashboard/manage-user')
            )} className={`${activeRole === 'admin'?'bg-primary-color active:scale-90 text-[white]':'bg-[white]'} transition-all duration-200 hover:shadow-lg    shadow-md p-3 rounded-lg px-10`}>Admin</button>
         </div>

        {
          activeRole === 'admin'?
          <>
          <MenuItem label={'Manage user'} icon={HiOutlineUsers} address={'/dashboard/manage-user'}/>
          </>
          :
          <>
          <div>
            <ul>
              {/* <MenuItem address={"/desing-team"} icon={BriefcaseIcon} label={"Design Team"}/> */}
              <MenuItem
                address={"/"}
                icon={BriefcaseIcon}
                label={"Design Team"}
              />
              <MenuItem
                address={"/marketing-design"}
                icon={MegaphoneIcon}
                label={"Marketing Design"}
              />
              <MenuItem
                address={"/development-team"}
                icon={CogIcon}
                label={"Development Team"}
              />
              <MenuItem
                address={"/create-team"}
                icon={PlusIcon}
                label={"Create A Team"}
              />
            </ul>
            <div className="mt-6 mb-2 px-4 font-semibold text-md">FOLDERS</div>
            <ul>
              {/* Designs */}
              <SidebarItem
                handleClick={setIsOpenDesignsDropdown}
                FirstIcon={PencilIcon}
                SecondIcon={ChevronDownIcon}
                label={"Design"}
                isOpen={isOpenDesignsDropdown}
                sidebarDropdowns={designsItems}
              />
              {/* Office */}
              <SidebarItem
                handleClick={setIsOpenOfficeDropdown}
                FirstIcon={BuildingIcon}
                SecondIcon={ChevronDownIcon}
                label={"Office"}
                isOpen={isOpenOfficeDropdown}
                sidebarDropdowns={officeItems}
              />
  
              {/* Office */}
              <SidebarItem
                handleClick={setIsOpenLegalDropdown}
                FirstIcon={ScaleIcon}
                SecondIcon={ChevronDownIcon}
                label={"Legal"}
                isOpen={isOpenLegalDropdown}
                sidebarDropdowns={legalItems}
              />
  
              {/* Sales */}
              <SidebarItem
                handleClick={setIsOpenSalesDropdown}
                FirstIcon={TagIcon}
                SecondIcon={ChevronDownIcon}
                label={"Sales"}
                isOpen={isOpenSalesDropdown}
                sidebarDropdowns={salesItems}
              />
            </ul>
          </div>
          
          
          </>
        }

       
      </div>
    </>
  );
};

//========================= Custome SVG Ions ===========================================

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function BuildingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CogIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  );
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function MegaphoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ScaleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

function TagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}
