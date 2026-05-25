"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

type ShareNetwork = {
  id: "facebook" | "twitter" | "whatsapp" | "telegram";
  label: string;
  icon: string;
  buildHref: (url: string, title: string) => string;
};

const NETWORKS: ShareNetwork[] = [
  {
    id: "facebook",
    label: "Facebook",
    icon: "logos:facebook",
    buildHref: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    label: "Twitter",
    // Black X logo — readable on the soft surface, no labels to break.
    icon: "ri:twitter-x-fill",
    buildHref: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "logos:whatsapp-icon",
    buildHref: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: "logos:telegram",
    buildHref: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

type Props = {
  /** Optional override. Defaults to window.location.href at mount. */
  url?: string;
  /** Used by share targets that take a message (twitter, telegram, email). */
  title?: string;
  onClose?: () => void;
};

export function ShareSection(props: Props) {
  const { url: urlProp, title = "Check this out", onClose } = props;

  // Hydrate from the live browser URL so dev / staging / prod all share
  // the correct address without any env wiring.
  const [resolvedUrl, setResolvedUrl] = useState<string>(urlProp ?? "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (urlProp) {
      setResolvedUrl(urlProp);
      return;
    }
    if (typeof window !== "undefined") {
      setResolvedUrl(window.location.href);
    }
  }, [urlProp]);

  const networks = useMemo(() => NETWORKS, []);

  const handleCopy = async () => {
    if (!resolvedUrl) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(resolvedUrl);
      } else {
        // Fallback for older browsers / non-secure contexts.
        const ta = document.createElement("textarea");
        ta.value = resolvedUrl;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      toast.success("Link copied to clipboard");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy link. Try selecting it manually.");
    }
  };

  const openNetwork = (n: ShareNetwork) => {
    if (!resolvedUrl) return;
    const href = n.buildHref(resolvedUrl, title);
    window.open(href, "_blank", "noopener,noreferrer,width=640,height=560");
  };

  return (
    <div className="p-5 space-y-4">
      <div className="text-center space-y-1">
        <div className="mx-auto h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <Icon icon="solar:share-bold-duotone" className="h-5 w-5" />
        </div>
        <h2 className="text-base font-bold tracking-tight text-foreground">
          Share this post
        </h2>
        <p className="text-xs text-muted-foreground">
          Send it to a friend or post it to your network.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {networks.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => openNetwork(n)}
            title={n.label}
            aria-label={`Share to ${n.label}`}
            className="group inline-flex items-center justify-center h-14 rounded-xl bg-silk-with-hover transition-colors hover:bg-primary/10"
          >
            <Icon
              icon={n.icon}
              className="h-7 w-7 transition-transform group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Or copy link
        </p>
        <div className="flex items-center gap-2 rounded-2xl bg-silk-with-hover p-1.5 pl-3">
          <input
            value={resolvedUrl}
            readOnly
            onFocus={(e) => e.currentTarget.select()}
            className="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 border-0 outline-none focus:ring-0 truncate"
            aria-label="Shareable URL"
          />
          <button
            type="button"
            onClick={handleCopy}
            disabled={!resolvedUrl}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            <Icon
              icon={copied ? "solar:check-circle-bold" : "solar:copy-bold"}
              className="h-3.5 w-3.5"
            />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="w-full h-10 rounded-full bg-silk-with-hover text-xs font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
        >
          Close
        </button>
      )}
    </div>
  );
}
