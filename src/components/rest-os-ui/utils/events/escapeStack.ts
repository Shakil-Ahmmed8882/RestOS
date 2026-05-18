/**
 * Tiny module-scope counter for "an overlay is taking ESC priority right now".
 *
 * When a stack-aware overlay opens (e.g. a confirm modal nested inside a
 * drawer), it calls `pushEscapeOwner()` — and any outer overlay that
 * subscribes via `isEscapeClaimed()` will skip its own ESC handler.
 *
 * Singleton, so it survives across React trees portaled into document.body.
 */

let count = 0;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((fn) => fn());

export function pushEscapeOwner() {
  count++;
  notify();
  return () => {
    count = Math.max(0, count - 1);
    notify();
  };
}

export function isEscapeClaimed(): boolean {
  return count > 0;
}

export function subscribeEscapeStack(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
