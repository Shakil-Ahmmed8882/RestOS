
const TabsContainer = ({ children, isActive }) => {
    return (
        <div className={`${isActive ? 'visible -translate-x-0 opacity-100 ' : 'invisible translate-x-[400px] opacity-0'} transition-all duration-500 absolute inset-0 top-11 pt-8`} >{children}</div>
    );
};

export default TabsContainer; 