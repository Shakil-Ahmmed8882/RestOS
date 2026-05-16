"use client";

import type { ReactNode } from "react";
import {
  useInfiniteScrollController,
  type FetchPage,
  type InfiniteScrollController,
} from "./hooks/useInfiniteScrollController";
import { InfiniteScrollSentinel } from "./InfiniteScrollSentinel";
import type { InfiniteScrollObserverOptions, InfiniteScrollSlots } from "./types";

type ChildrenRenderer<T> =
  | ReactNode
  | ((controller: InfiniteScrollController<T>) => ReactNode);

interface Props<T> extends InfiniteScrollSlots {
  fetchPage: FetchPage<T>;
  /** Render items. Either a render-prop receiving the controller, or static children. */
  children: ChildrenRenderer<T>;
  initialPage?: number;
  initialItems?: T[];
  autoLoadInitial?: boolean;
  observer?: InfiniteScrollObserverOptions;
  /** Class on the outer wrapper. The component owns no layout otherwise. */
  className?: string;
  /** Class applied to the sentinel slot. */
  sentinelClassName?: string;
}

function resolveSlot(slot: ReactNode | (() => ReactNode) | undefined): ReactNode {
  if (typeof slot === "function") return slot();
  return slot ?? null;
}

function resolveErrorSlot(
  slot: InfiniteScrollSlots["error"],
  retry: () => void,
  error: unknown,
): ReactNode {
  if (typeof slot === "function") return slot(retry, error);
  return slot ?? null;
}

/**
 * Declarative infinite-scroll wrapper.
 *
 * The component is intentionally UI-agnostic:
 *  - It does NOT impose a height, scroll container, or layout.
 *  - It does NOT render loaders/errors unless you pass slot props.
 *  - Items can be rendered either by passing static `children` OR by
 *    passing a render-prop that receives the controller.
 *
 * Two common patterns:
 *
 *   // 1. Render-prop (recommended when you need item access)
 *   <InfiniteScroll fetchPage={fetchUsers}>
 *     {({ items }) => (
 *       <ul>{items.map(u => <li key={u.id}>{u.name}</li>)}</ul>
 *     )}
 *   </InfiniteScroll>
 *
 *   // 2. External state (controlled) — use InfiniteScrollSentinel instead.
 */
export function InfiniteScroll<T>(props: Props<T>) {
  const {
    fetchPage,
    children,
    initialPage,
    initialItems,
    autoLoadInitial,
    observer,
    className,
    sentinelClassName,
    loader,
    endMessage,
    error: errorSlot,
    initialLoader,
    empty,
  } = props;

  const controller = useInfiniteScrollController<T>({
    fetchPage,
    initialPage,
    initialItems,
    autoLoadInitial,
  });

  const { items, status, error, hasMore, loadMore, retry } = controller;

  // The sentinel observes only when there's more to load AND we're not
  // currently fetching/erroring. This avoids re-entrant fetches.
  const sentinelEnabled = hasMore && status === "idle";

  const showInitialLoader = status === "loading" && items.length === 0;
  const showEmpty = status === "idle" && items.length === 0 && !hasMore;

  return (
    <div className={className}>
      {typeof children === "function" ? children(controller) : children}

      {showInitialLoader && resolveSlot(initialLoader)}
      {showEmpty && resolveSlot(empty)}

      {status === "loading" && items.length > 0 && resolveSlot(loader)}
      {status === "error" && resolveErrorSlot(errorSlot, retry, error)}
      {status === "done" && items.length > 0 && resolveSlot(endMessage)}

      <InfiniteScrollSentinel
        onIntersect={loadMore}
        enabled={sentinelEnabled}
        observer={observer}
        className={sentinelClassName}
      />
    </div>
  );
}
