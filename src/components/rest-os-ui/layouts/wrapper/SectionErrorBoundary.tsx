"use client";

import { Component, ReactNode } from "react";
import { Icon } from "@iconify/react";

type FallbackRender = (error: Error, reset: () => void) => ReactNode;

interface Props {
  children: ReactNode;
  fallback?: ReactNode | FallbackRender;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SectionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[SectionErrorBoundary]", error, info);
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const { fallback } = this.props;
    if (typeof fallback === "function") {
      return (fallback as FallbackRender)(this.state.error!, this.reset);
    }
    if (fallback !== undefined) return fallback;

    return (
      <DefaultErrorFallback
        error={this.state.error}
        onReset={this.reset}
      />
    );
  }
}

function DefaultErrorFallback({
  error,
  onReset,
}: {
  error: Error | null;
  onReset: () => void;
}) {
  const message =
    error?.message?.trim() || "We couldn't load this section right now.";
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl bg-primary/5 px-6 py-8 text-center ring-1 ring-primary/15 dark:bg-primary/10 dark:ring-primary/20">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary dark:bg-primary/15">
        <Icon
          icon="solar:shield-warning-bold-duotone"
          className="h-6 w-6"
          aria-hidden
        />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Something went wrong
        </p>
        <p className="text-xs text-muted-foreground max-w-sm">{message}</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <Icon icon="solar:refresh-linear" className="h-3.5 w-3.5" aria-hidden />
        Try again
      </button>
    </div>
  );
}
