"use client";

// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Option<T> = {
	value: T;
	label: string;
};

type DropdownProps<T> = {
	options: Option<T>[];
	value: T;
	onChange: (value: T) => void;
	trigger: React.ReactNode;
};

export function Dropdown<T extends string | number>(props: DropdownProps<T>) {
	const { options, value, onChange, trigger } = props;

	return (
		<Popover>
			<PopoverTrigger>{trigger}</PopoverTrigger>

			<PopoverContent
				align="end"
				sideOffset={8}
				className="w-50 p-0 border border-[#F0F0F0] bg-white shadow-[2px_-1px_9px_rgba(229,226,226,0.25),0px_4px_9px_rgba(229,226,226,0.25)]"
			>
				<div className="flex flex-col">
					{options.map((option) => {
						const isActive = value === option.value;

						const itemClass = isActive
							? "bg-[#FEF4F6] text-primary font-semibold"
							: "text-[#141414] hover:bg-[#FAFAFA]";

						return (
							<button
								key={String(option.value)}
								type="button"
								onClick={() => onChange(option.value)}
								className={`font-proxima-nova text-sm cursor-pointer px-3 py-2 text-left transition-colors ${itemClass}`}
							>
								{option.label}
							</button>
						);
					})}
				</div>
			</PopoverContent>
		</Popover>
	);
}

/* ===============================  HOW TO USE ===============================
type Sort = "asc" | "desc";

const OPTIONS = [
	{ value: "asc", label: "Ascending" },
	{ value: "desc", label: "Descending" },
];

export function SimpleExample() {
	const [sort, setSort] = useState<Sort>("asc");

	return (
		<div className="p-10">
			<Dropdown
				options={OPTIONS}
				value={sort}
				onChange={setSort}
				trigger={<button className="border px-4 py-2">Sort</button>}
			/>

			<p className="mt-4">Selected: {sort}</p>
		</div>
	);
}

*/
