import { useEffect } from 'react';

// Custom hook for handling clicks outside a specified ref element
const useClickOutside = (ref, callback) => {


    useEffect(() => {
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside );

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export default useClickOutside;
