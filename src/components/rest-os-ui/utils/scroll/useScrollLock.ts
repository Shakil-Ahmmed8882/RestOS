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
 * - restore everything when the LAST locker closes
 * - bring user back to the exact scroll position
 *
 * what we return:
 * - nothing (this hook only controls page scroll behavior)
 *
 * why ref-counted:
 * - overlays stack (a drawer can host a modal on top, e.g. comments →
 *   expand-to-modal, or a comment → confirm-delete). Each calls this hook.
 *   A naive lock/unlock would let the inner overlay's cleanup unlock the
 *   body while the outer one is still open — snapping the background to the
 *   top. We count active lockers on a module-level counter and only apply
 *   the freeze on the first lock and release it on the last unlock, so the
 *   saved scroll position survives the whole stack.
 */

let lockCount = 0;
let savedScrollY = 0;

const applyLock = () => {
	lockCount += 1;
	if (lockCount > 1) return; // already locked by an outer overlay

	savedScrollY = window.scrollY;
	document.body.style.position = "fixed";
	document.body.style.top = `-${savedScrollY}px`;
	document.body.style.left = "0";
	document.body.style.right = "0";
	document.body.style.overflowY = "scroll"; // scrollbar stays visible
};

const releaseLock = () => {
	lockCount = Math.max(0, lockCount - 1);
	if (lockCount > 0) return; // an outer overlay still needs the lock

	document.body.style.position = "";
	document.body.style.top = "";
	document.body.style.left = "";
	document.body.style.right = "";
	document.body.style.overflowY = "";
	window.scrollTo(0, savedScrollY);
};

export const useScrollLock = (open: boolean) => {
	useEffect(() => {
		if (!open) return;
		applyLock();
		return releaseLock;
	}, [open]);
};
