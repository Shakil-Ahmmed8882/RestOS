import React, { useRef, useState, useEffect } from "react";
import { Space } from "antd";
import useClickOutside from "../../🔗Hook/useClickOutside";

const RSDropdown = ({ items, children = <></> }) => {
    const [reveal, setReveal] = useState(false);
    const dropdownRef = useRef(null);

    // Handle clicks outside the dropdown to close it
    useClickOutside(dropdownRef, () => setReveal);

    return (
        <Space className="relative rounded-lg" ref={dropdownRef}>
            <p onClick={() => setReveal(!reveal)}>
                {children}
            </p>
          <div>
          
            {reveal && (
                <div onClick={()=> setReveal(false)} className="absolute right-0 top-8 z-40 bg-[white] w-[250px] bg-white shadow-lg">
                    {items?.map(item => (
                        <div key={item.key} className="transition-all w-full duration-300 hover:bg-[#f8f8f8]">
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
          </div>
        </Space>
    );
};

export default RSDropdown;
