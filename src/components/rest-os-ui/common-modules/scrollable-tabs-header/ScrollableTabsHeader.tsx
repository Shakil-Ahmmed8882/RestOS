"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
	HorizontalScroller,
	type HorizontalScrollerHandle,
} from "@/components/ui/HorizontalScroller";
import { Tabs, useTabs } from "@/components/rest-os-ui/tabs/TabsProvider";
import type { Tab } from "@/components/rest-os-ui/tabs/tabs.type";
import { RolesData } from "../constants/roles";

type ScrollableTabsHeaderProps = {
	title?: ReactNode;
	tabs?: Tab[];
	right?: ReactNode;
	className?: string;
};
//====================================
//====================================
//====================================
export function ScrollableTabsHeader(props: ScrollableTabsHeaderProps) {
	const { title = "", tabs = RolesData, right, className } = props;
	const scrollerRef = useRef<HorizontalScrollerHandle>(null);
	const itemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
	const { activeTabs } = useTabs();
	const activeId = activeTabs[0];

	useEffect(() => {
		if (!activeId) return;
		const el = itemRefs.current.get(activeId);
		scrollerRef.current?.scrollChildIntoView(el ?? null);
	}, [activeId]);

	return (
		<div
			className={`border-b border-[#F0F0F0] p-8 flex flex-col gap-4 max-w-225 ${className ?? ""}`}
		>
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-[32px] leading-[1.2] font-proxima-nova font-bold text-[#141414]">
					{title}
				</h1>
				{right}
			</div>
			<HorizontalScroller ref={scrollerRef} spacing="md" align="center">
				<Tabs className="flex items-center gap-3 flex-nowrap">
					{tabs.map((tab) => (
						<Tabs.Item
							key={tab.id}
							tab={tab}
							ref={(node) => {
								if (node) itemRefs.current.set(tab.id, node);
								else itemRefs.current.delete(tab.id);
							}}
						>
							{tab.value}
						</Tabs.Item>
					))}
				</Tabs>
			</HorizontalScroller>
		</div>
	);
}
