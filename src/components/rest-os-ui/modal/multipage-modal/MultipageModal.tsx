"use client";

import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useScrollLock } from "@/components/rest-os-ui/utils/scroll/useScrollLock";
import {
	MultipageModalProvider,
	useMultipageModalContextHelper,
} from "./provider/MultipageModalContext";
import type { MultipageModalPageProps } from "./types";
import { pageVariants } from "./utils/animateVariants";
import { getActivePage } from "./utils/getActivePage";
import { useEscapeHandler } from "../../utils/events/useEscapeHelper";

type RootProps = {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	initialPageId?: string;
	children: ReactNode;
	className?: string;
};

// ── Page sub-component (marker — never renders on its own) ──────────────────
export function Page(_props: MultipageModalPageProps) {
	return null;
}

// ── Root component ──────────────────────────────────────────────────────────
function Root(props: RootProps) {
	const { open, onOpenChange, initialPageId, children, className } = props;

	const controller = useMultipageModalContextHelper({ open, onOpenChange, initialPageId });
	const { isOpen, currentPageId, canGoBack, direction, goBack, close } = controller;

	// ── Scroll lock ──
	useScrollLock(isOpen);
	useEscapeHandler(isOpen, canGoBack, goBack, close);

	// ── Find the active page among children ──
	const activePage = getActivePage(children, currentPageId);

	// ── SSR guard ──
	if (typeof document === "undefined") return null;

	return createPortal(
		<MultipageModalProvider value={controller}>
			{/* Single backdrop */}
			<AnimatePresence>
				{isOpen && activePage && (
					<motion.div
						key="multipage-modal-backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-[99999] bg-black/40"
						aria-hidden="true"
					/>
				)}
			</AnimatePresence>

			{/* Content layer */}
			<AnimatePresence>
				{isOpen && activePage && (
					<motion.div
						key="multipage-modal-container"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[999999] overflow-y-auto"
						onClick={close}
					>
						<div className="flex min-h-full w-full items-start justify-center p-3 md:py-10 pointer-events-none ">
							<AnimatePresence mode="wait" custom={direction}>
								<motion.div
									key={currentPageId}
									custom={direction}
									variants={pageVariants}
									initial="enter"
									animate="center"
									exit="exit"
									tabIndex={-1}
									// className={`${className} relative w-full rounded-2xl px-9 pt-12 pb-6 bg-white shadow-2xl pointer-events-auto my-auto outline-none ${activePage.props.maxWidth ?? "max-w-[750px]"}`}
									className={`${className} relative w-full rounded-2xl p-7 bg-white shadow-2xl pointer-events-auto my-auto outline-none ${activePage.props.maxWidth ?? "max-w-[750px]"}`}
									onClick={(e: React.MouseEvent) => e.stopPropagation()}
								>
									{/* Back button — visible when there is history */}
									{canGoBack && activePage.props.backTitle && (
										<button
											type="button"
											onClick={goBack}
											className="!mb-3  z-10 flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-medium text-[#141414] bg-[#f5f5f5] hover:bg-[#f0f0f0] transition-colors cursor-pointer font-proxima-nova "
											aria-label="Go back"
										>
											<ChevronLeft className="size-3.5" /> <span>{activePage.props.backTitle}</span>
										</button>
									)}

									{activePage.props.children}
								</motion.div>
							</AnimatePresence>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</MultipageModalProvider>,
		document.body,
	);
}

// ── Compound export ─────────────────────────────────────────────────────────

export const MultipageModal = Object.assign(Root, { Page });

/**
 * ─────────────────────────────────────────────────────────────
 * MultipageModal — Usage Guide (Reusable System)
 * ─────────────────────────────────────────────────────────────
 *
 * This is a "mini-router inside a modal".
 * Each page is identified by a string id.
 * Navigation + state is fully internal (history-based).
 *
 * ─────────────────────────────────────────────────────────────
 * STEP 1 — OPEN THE MODAL
 * ─────────────────────────────────────────────────────────────
 *
 * 1. <MultipageModal open={isOpen} onOpenChange={setIsOpen} />
 *
 * 2. Programmatic open:
 *    controller.open("page-id", payload?)
 *
 * What happens:
 * - Modal becomes visible
 * - History starts with initialPageId OR provided pageId
 *
 * Payload (optional):
 * - You can pass data while opening a page
 * - Stored per page id internally
 *
 * Example:
 *    open("single-schedule-create", { shiftId: 10 })
 *
 * ─────────────────────────────────────────────────────────────
 * STEP 2 — NAVIGATION FUNCTIONS
 * ─────────────────────────────────────────────────────────────
 *
 * All navigation is history-based (like browser routing).
 *
 * 1. goTo(pageId, payload?)
 *    - Push new page into history
 *    - Never closes modal
 *    - Can attach payload for that page
 *
 *    Example:
 *      goTo("shift-running", { abcd: "conflict-123" })
 *
 *
 * 2. goBack()
 *    - Pops last page from history
 *    - If only 1 page left → modal closes
 *
 *    Think: browser back button inside modal
 *
 *
 * 3. close()
 *    - Hard reset
 *    - Clears history completely
 *    - Closes modal
 *
 *
 * 4. open(pageId, payload?)
 *    - Resets modal + opens fresh
 *    - Replaces history root
 *
 * ─────────────────────────────────────────────────────────────
 * STEP 3 — PAYLOAD SYSTEM
 * ─────────────────────────────────────────────────────────────
 *
 * Payload = per-page memory slot.
 *
 * When you do:
 *    goTo("shift-running", { abcd: "X" })
 *
 * Internally:
 * - Stored as:
 *     payloads["shift-running"] = { abcd: "X" }
 *
 * How to read it:
 *
 *    const payload = useMultipageModalPayload("shift-running")
 *
 * Use case:
 * - Passing API context between pages
 * - Avoid prop drilling
 * - Keep modal steps independent
 *
 * Rule:
 * - Payload is tied to PAGE ID, not navigation stack index
 *
 * ─────────────────────────────────────────────────────────────
 * STEP 4 — HOW PAGES WORK
 * ─────────────────────────────────────────────────────────────
 *
 * Pages are NOT components in normal sense.
 * They are "route slots".
 *
 * Required structure:
 *
 *    <MultipageModal>
 *      <MultipageModal.Page id="A" />
 *      <MultipageModal.Page id="B" />
 *    </MultipageModal>
 *
 * Rules:
 * - Page must be DIRECT child of MultipageModal
 * - id must be unique
 * - Only active page renders
 *
 * Internally:
 * - currentPageId = top of history stack
 * - system selects matching Page by id
 *
 * ─────────────────────────────────────────────────────────────
 * THINKING MODEL
 * ─────────────────────────────────────────────────────────────
 *
 * Treat this like:
 *
 *   "React Router inside a modal"
 *
 * but:
 * - local scope
 * - history-based
 * - payload-aware
 * - portal-rendered
 *
 * ─────────────────────────────────────────────────────────────
 * HARD RULES (DON’T BREAK THESE)
 * ─────────────────────────────────────────────────────────────
 *
 * ❌ Don’t wrap <MultipageModal.Page> inside other components
 * ❌ Don’t reuse same page id twice
 * ❌ Don’t treat payload as global state (it is page-scoped)
 *
 * ✔ Always think in:
 *    Page ID + Navigation + Payload
 */
