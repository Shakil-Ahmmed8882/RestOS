"use client";

import { useContext, type Context } from "react";

/**
 * Typed context selector hook.
 * Reads from the context and extracts a single field via `selector`.
 *
 * NOTE: This does NOT prevent re-renders on unrelated context changes
 * (React limitation without `use-context-selector` lib). It provides
 * a clean API boundary so we can swap in a true selector lib later
 * without changing consumer code.
 */
export function useContextSelector<T, R>(
	context: Context<T | null>,
	displayName: string,
	selector: (state: T) => R,
): R {
	const value = useContext(context);
	if (value === null) {
		throw new Error(`use${displayName}Selector must be used within <${displayName}Provider>`);
	}
	return selector(value);
}
