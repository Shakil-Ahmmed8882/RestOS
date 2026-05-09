import type { ReactNode } from "react";
import { LayoutGrid, Briefcase, Wrench, CheckSquare, Droplet, Bug, Shirt, DoorOpen } from "lucide-react";
// import { HousekeeperIcon } from "@/components/icon/svg/HousekeeperIcon";
// import { MaintenanceIcon } from "@/components/icon/svg/MaintenanceIcon";
// import { QaIcon } from "@/components/icon/svg/QaIcon";
// import { PoolMaintenanceIcon } from "@/components/icon/svg/PoolMaintenanceIcon";
// import { PestControlIcon } from "@/components/icon/svg/PestControlIcon";
// import { LaundryIcon } from "@/components/icon/svg/LaundryIcon";
// import { FrontDeskIcon } from "@/components/icon/svg/FrontDeskIcon";

export const ALL_ID = "all";

export type ActivityTab = {
	id: string;
	value: string;
	icon: ReactNode;
	/** role string sent to the API (null = all) */
	role: string | null;
};

// ───────────────────────────────────────────────────────────────
// Tabs list — order matches Figma
// ───────────────────────────────────────────────────────────────
export const RolesData: ActivityTab[] = [
	{
		id: ALL_ID,
		value: "All",
		icon: <LayoutGrid size={20} strokeWidth={1.5} />,
		role: null,
	},
	{
		id: "manager",
		value: "Manager",
		icon: <Briefcase size={20} strokeWidth={1.5} />,
		role: "manager",
	},
	{
		id: "frontDesks",
		value: "Front Desk",
		icon: <DoorOpen size={20} strokeWidth={1.5} />,
		role: "front_desk",
	},
	{
		id: "housekeeper",
		value: "Housekeeper",
		icon: <Briefcase size={20} strokeWidth={1.5} />,
		role: "housekeeper",
	},
	{
		id: "maintenance",
		value: "Maintenance",
		icon: <Wrench size={20} strokeWidth={1.5} />,
		role: "maintenance",
	},
	{
		id: "pip",
		value: "PIP",
		icon: <Wrench size={20} strokeWidth={1.5} />,
		role: "pip",
	},
	{
		id: "houseman",
		value: "Houseman",
		icon: <Briefcase size={20} strokeWidth={1.5} />,
		role: "houseman",
	},
	{
		id: "qualityAssurance",
		value: "QA",
		icon: <CheckSquare size={20} strokeWidth={1.5} />,
		role: "qc",
	},
	{
		id: "poolMaintenance",
		value: "Pool Maintenance",
		icon: <Droplet size={20} strokeWidth={1.5} />,
		role: "pool_worker",
	},
	{
		id: "security",
		value: "Security",
		icon: <Droplet size={20} strokeWidth={1.5} />,
		role: "security",
	},
	{
		id: "laundry",
		value: "Laundry",
		icon: <Shirt size={20} strokeWidth={1.5} />,
		role: "laundry",
	},
	{
		id: "pestControl",
		value: "Pest Control",
		icon: <Bug size={20} strokeWidth={1.5} />,
		role: "pest_control",
	},
];


export type TRoles = (typeof RolesData)[number]["id"];
// ───────────────────────────────────────────────────────────────
// Look-up helpers
// ───────────────────────────────────────────────────────────────
const TAB_BY_ID = new Map(RolesData.map((t) => [t.id, t]));
const TAB_BY_ROLE = new Map(
	RolesData.filter((t) => t.role !== null).map((t) => [t.role as string, t]),
);

export function getRoleFromTabId(tabId: string | undefined): string | null {
	if (!tabId) return null;
	return TAB_BY_ID.get(tabId)?.role ?? null;
}

export function getTabIdFromRole(role: string | null | undefined): string | null {
	if (!role) return null;
	return TAB_BY_ROLE.get(role)?.id ?? null;
}
