"use client";

// import { BaseButton } from "@/components/reusable-ui-blocks/buttons/BaseButton";
// import { GenericModalWrapper } from "@/components/reusable-ui-blocks/modal/GenericModalWrapper";
// import Heading from "@/components/reusable-ui-blocks/typography/Heading";

interface DeleteShiftScheduleProps {
	title?: string;
	message?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	loading?: boolean;
	onConfirm?: () => void;
	onClose: () => void;
	open?: boolean;
}

export function DeleteConfirmModal(props: DeleteShiftScheduleProps) {
	const {
		title = "Delete",
		message = "Are you sure you want to delete the schedule?",
		confirmLabel = "Delete",
		cancelLabel = "Keep",
		loading = false,
		onConfirm,
		onClose,
		open = true,
	} = props;
	// TODO: Implement GenericModalWrapper component
	if (!open) return null;
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-6 max-w-[510px] w-full mx-4">
				<div className="flex flex-col gap-6 justify-center w-full text-center">
					{/* Title + description */}
					<div className="flex flex-col gap-2 w-full">
						<h2 className="font-proxima-nova text-[40px] leading-[1.2] text-[#141414] font-bold">
							{title}
						</h2>
						<p className="font-proxima-nova text-base leading-6 text-[#666] text-center w-full">
							{message}
						</p>
					</div>

					{/* Buttons */}
					<div className="flex gap-6 w-full">
						<button
							className="flex-1 border border-[#141414] rounded-full py-4 font-proxima-nova font-semibold disabled:opacity-50"
							onClick={onConfirm}
							disabled={loading}
						>
							{confirmLabel}
						</button>

						<button
							className="flex-1 bg-primary text-white rounded-full py-4 font-proxima-nova font-semibold"
							onClick={onClose}
						>
							{cancelLabel}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
