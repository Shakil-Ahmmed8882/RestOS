"use client";

import { createContext, useContext, useState } from "react";

// TODO: Import from actual modules when available
// import { makeSelectorContext } from "@/components/reusable-ui-blocks/shared-context/makeSelectorContext";
// import { useContextSelector } from "@/components/reusable-ui-blocks/shared-context/useContextSelector";
// import { usePaginationContextHelper } from "./usePaginationContextHelper";

// 1. Infer type from the helper hook — never write it manually
type TPagination = {
	currentPage: number;
	goToPage: (page: number) => void;
	meta: { total: number; page: number; limit: number; last_page: number; per_page: number };
	syncMeta: (meta: any) => void;
};

// 2. Create context + base provider via shared factory
export const Context = createContext<TPagination | undefined>(undefined);

export function Provider({ value, children }: { value: TPagination; children: React.ReactNode }) {
	return <Context.Provider value={value}>{children}</Context.Provider>;
}

// 3. Provider — calls the helper hook, nothing else
export function PaginationProvider({ children }: { children: React.ReactNode }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, last_page: 1, per_page: 10 });

	const value: TPagination = {
		currentPage,
		goToPage: setCurrentPage,
		meta,
		syncMeta: setMeta,
	};

	return <Provider value={value}>{children}</Provider>;
}

// 4. Selector hook — only expose what consumers actually need
export const usePaginationSelector = () => {
	const context = useContext(Context);
	if (!context) {
		throw new Error("usePaginationSelector must be used within PaginationProvider");
	}
	return {
		currentPage: context.currentPage,
		goToPage: context.goToPage,
		meta: context.meta,
		syncMeta: context.syncMeta,
	};
};
