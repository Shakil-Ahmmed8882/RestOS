"use client";

import { createContext } from "react";

/**
 * Factory that creates a typed Context + a thin Provider wrapper.
 * The Provider simply forwards the `value` prop — all logic lives
 * in the companion `useFeatureNameContextHelper` hook.
 */
export function makeSelectorContext<T>(displayName: string) {
	const Context = createContext<T | null>(null);
	Context.displayName = displayName;

	function Provider({ value, children }: { value: T; children: React.ReactNode }) {
		return <Context.Provider value={value}>{children}</Context.Provider>;
	}

	Provider.displayName = `${displayName}Provider`;

	return { Context, Provider } as const;
}
