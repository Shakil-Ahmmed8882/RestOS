import { useEffect } from "react";

/**
 * params:
 * - open: tells if the modal is currently open
 *
 * what we do with it:
 * - when open, lock the page scroll in place
 * - store current scroll position before locking
 * - freeze body so background cannot move
 * - keep scrollbar visible to avoid layout shift
 * - restore everything when modal closes
 * - bring user back to the exact scroll position
 *
 * what we return:
 * - nothing (this hook only controls page scroll behavior)
 */
export const useScrollLock = (open: boolean) => {
	useEffect(() => {
		if (!open) return;

		const scrollY = window.scrollY;

		// Freeze body scroll without hiding scrollbar
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.left = "0";
		document.body.style.right = "0";
		document.body.style.overflowY = "scroll"; // scrollbar stays visible

		return () => {
			const y = document.body.style.top;
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.left = "";
			document.body.style.right = "";
			document.body.style.overflowY = "";
			window.scrollTo(0, parseInt(y || "0") * -1);
		};
	}, [open]);
};
