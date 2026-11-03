"use client";
import Link from "next/link";
import { ArrowRight, Check, Heart, Plus, Search, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, type ReactNode } from "react";
import { useDemo } from "@/context/demo-context";
export function ArtImage({
  src,
  alt,
  className = "",
  style,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  onClick?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  return failed || !src ? (
    <div className={`image-fallback ${className}`} role="img" aria-label={alt}>
      <span>
        ARTORA
        <br />
        <i>{alt}</i>
        <small>Image unavailable</small>
      </span>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
      // Keep the initial markup compatible with injected image-reveal styles.
      style={{ opacity: 1, ...style }}
      {...props}
    />
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  label = "Explore more",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {label}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${secondary ? "button secondary" : "button"} ${className}`}
    >
      {children}
    </Link>
  );
}
export function SaveButton({
  id,
  kind = "favorites",
  className = "",
}: {
  id: string;
  kind?: "favorites" | "saved";
  className?: string;
}) {
  const { state, toggle } = useDemo();
  const active = state[kind].includes(id);
  return (
    <button
      className={`icon-button save-button ${active ? "active" : ""} ${className}`}
      aria-label={`${active ? "Unsave" : "Save"} ${id.replaceAll("-", " ")}`}
      aria-pressed={active}
      onClick={() => toggle(kind, id)}
    >
      <Heart size={17} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
export function FollowButton({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const { state, toggle } = useDemo();
  const following = state.follows.includes(slug);
  return (
    <button
      className={`button ${following ? "selected" : "secondary"} ${compact ? "small" : ""}`}
      onClick={() => toggle("follows", slug)}
      aria-pressed={following}
    >
      {following ? <Check size={14} /> : <Plus size={14} />}{" "}
      {following ? "Following" : "Follow"}
    </button>
  );
}
export function SearchInput({
  value,
  onChange,
  placeholder = "Search artworks…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="search-field">
      <Search size={17} />
      <input
        type="search"
        aria-label={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          className="icon-button"
          aria-label="Clear search"
          onClick={() => onChange("")}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
export function EmptyState({
  title,
  description,
  href,
  label = "Explore artworks",
}: {
  title: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="empty-state">
      <span className="empty-mark">a.</span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {href && (
        <ButtonLink href={href}>
          {label}
          <ArrowRight size={16} />
        </ButtonLink>
      )}
    </div>
  );
}
export function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: string[];
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          role="tab"
          aria-selected={value === tab}
          key={tab}
          onClick={() => onChange(tab)}
          className={value === tab ? "active" : ""}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
export function Modal({
  open,
  onOpenChange,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className={`dialog-content ${wide ? "wide" : ""}`}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {title}. Press Escape or use the close button to return.
          </Dialog.Description>
          <Dialog.Close
            className="icon-button dialog-close"
            aria-label="Close dialog"
          >
            <X size={20} />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function DemoNotice({
  children = "Sample marketplace listings, prices, ratings, and transactions are demo content. Artist-supplied portfolios are credited separately.",
}: {
  children?: ReactNode;
}) {
  return (
    <p className="demo-notice">
      <span>DEMO EXPERIENCE</span>
      {children}
    </p>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <Link href="/">Home</Link>
      {items.map((i, n) => (
        <span key={n}>
          /
          <span>{i.href ? <Link href={i.href}>{i.label}</Link> : i.label}</span>
        </span>
      ))}
    </nav>
  );
}
