import { useEffect } from 'react';

const useDisableBodyScroll = (isDisabled) => {
    useEffect(() => {
        if (isDisabled) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = ""; // Reset to allow scrolling
        }

        // Cleanup on unmount or when `isDisabled` changes
        return () => {
            document.body.style.overflow = "";
        };
    }, [isDisabled]);
};

export default useDisableBodyScroll;
