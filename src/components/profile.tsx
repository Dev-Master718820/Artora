"use client";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  FileText,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useDemo } from "@/context/demo-context";
import { artists } from "@/data/artists";
import { money, dateLabel } from "@/lib/utils";
import {
  ArtImage,
  ButtonLink,
  DemoNotice,
  EmptyState,
  SectionHeading,
} from "@/components/shared/ui";
export function ProfilePage() {
  const { state, ready } = useDemo();
  return (
    <div className="container page-content">
      <div className="profile-panel">
        <div className="page-intro">
          <div>
            <span className="eyebrow">YOUR CREATIVE CORNER</span>
            <h1>Welcome to your little studio.</h1>
            <p>
              No account needed. Just a place for your browser-local demo
              activity.
            </p>
          </div>
        </div>
        <div className="three-grid">
          {[
            [
              Heart,
              "Your collection",
              state.favorites.length + " saved artworks",
              "/favorites",
            ],
            [
              ShoppingBag,
              "Your bag",
              state.cart.length + " pieces found",
              "/cart",
            ],
            [
              Calendar,
              "Your learning",
              state.bookings.length + " demo sessions",
              "/learn",
            ],
          ].map(([Icon, title, description, href]) => {
            const I = Icon as typeof Heart;
            return (
              <Link
                className="panel"
                href={href as string}
                key={title as string}
              >
                <I
                  size={20}
                  style={{ color: "var(--accent)", marginBottom: 18 }}
                />
                <h3>{title as string}</h3>
                <p>{description as string}</p>
              </Link>
            );
          })}
        </div>
        <section className="section">
          <SectionHeading title="A little time for creativity." />
          {state.bookings.length ? (
            state.bookings.map((b) => {
              const tutor = artists.find((a) => a.slug === b.tutor);
              return (
                <div className="demo-booking-card" key={b.id}>
                  <ArtImage
                    src={tutor?.image || ""}
                    alt={tutor?.name || "Tutor"}
                  />
                  <div>
                    <h3>{b.type}</h3>
                    <p>
                      With {tutor?.name} · {b.duration} min · {money(b.price)}{" "}
                      demo price
                    </p>
                    <p>
                      {b.date} at {b.time} Eastern Time
                      <br />
                      Demo reference: {b.id}
                    </p>
                  </div>
                  <ButtonLink
                    href="/learn/classroom"
                    secondary
                    className="small"
                  >
                    Classroom preview
                    <ArrowRight size={13} />
                  </ButtonLink>
                </div>
              );
            })
          ) : (
            <EmptyState
              title="Your next lesson is waiting."
              description="Find a tutor and try a demo booking."
              href="/learn"
              label="Explore the Academy"
            />
          )}
        </section>
        <section className="section">
          <SectionHeading title="Your latest discoveries." />
          {state.orders.length ? (
            state.orders.map((o) => (
              <div className="demo-booking-card" key={o.id}>
                <div
                  className="success-icon"
                  style={{ margin: 0, width: 45, height: 45, flexShrink: 0 }}
                >
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3>Demo order {o.id}</h3>
                  <p>
                    {dateLabel(o.createdAt)} · {money(o.total)} · Simulated
                    order, no payment or shipping
                  </p>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="A piece of art. A new story."
              description="Your completed demo orders will appear here."
              href="/artworks"
            />
          )}
        </section>
        {state.commission.description && (
          <section className="section">
            <SectionHeading
              title={
                state.commission.submittedId
                  ? "Your commission request."
                  : "An idea worth coming back to."
              }
            />
            <div className="panel">
              <h3>
                {state.commission.subject} · {state.commission.style}
              </h3>
              <p style={{ marginTop: 15 }}>{state.commission.description}</p>
              <p>
                {state.commission.medium} · {state.commission.size} · Up to{" "}
                {money(state.commission.budget)}
              </p>
              {state.commission.submittedId ? (
                <p style={{ marginTop: 15 }}>
                  Saved demo request {state.commission.submittedId}. No artist
                  has been contacted.
                </p>
              ) : (
                <ButtonLink href="/commissions/new" className="small">
                  Continue your commission draft
                  <ArrowRight size={13} />
                </ButtonLink>
              )}
            </div>
          </section>
        )}
        <DemoNotice>
          Activity belongs to this browser, not an account. Clearing site data
          removes your demo collection, drafts, posts, orders, and bookings.
        </DemoNotice>
      </div>
    </div>
  );
}
