"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { artworks } from "@/data/artworks";
import { artists } from "@/data/artists";
import { masterpieces } from "@/data/masterpieces";
import { useDemo } from "@/context/demo-context";
import { money, uid } from "@/lib/utils";
import { ArtworkGrid } from "./artwork-card";
import { MasterpieceCard } from "@/components/masters/masterpiece-card";
import { PostCard } from "@/components/community/community-pages";
import { posts as seedPosts } from "@/data/community-posts";
import {
  ArtImage,
  Breadcrumbs,
  ButtonLink,
  DemoNotice,
  EmptyState,
  Tabs,
} from "@/components/shared/ui";
function CartSummary({
  checkout = false,
  onConfirm,
}: {
  checkout?: boolean;
  onConfirm?: () => void;
}) {
  const { state } = useDemo();
  const subtotal = state.cart.reduce(
    (total, item) =>
      total +
      (artworks.find((a) => a.slug === item.slug)?.price || 0) * item.quantity,
    0,
  );
  return (
    <aside className="cart-summary">
      <h3>A little more art.</h3>
      {checkout &&
        state.cart.map((i) => {
          const a = artworks.find((a) => a.slug === i.slug);
          return a ? (
            <div className="summary-line" key={i.slug}>
              <span>
                {a.title} × {i.quantity}
              </span>
              <span>{money(a.price * i.quantity)}</span>
            </div>
          ) : null;
        })}
      <div className="summary-line">
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      <div className="summary-line">
        <span>Sample shipping</span>
        <span>Included</span>
      </div>
      <div className="summary-line">
        <span>Demo tax</span>
        <span>$0</span>
      </div>
      <div className="summary-line total">
        <span>Demo total</span>
        <strong>{money(subtotal)}</strong>
      </div>
      {checkout ? (
        <button
          type="submit"
          form="checkout-form"
          className="button accent full"
        >
          Confirm demo order
          <ArrowRight size={15} />
        </button>
      ) : (
        <ButtonLink href="/checkout" className="full">
          Continue to demo checkout
          <ArrowRight size={15} />
        </ButtonLink>
      )}
      <p className="field-help" style={{ textAlign: "center", marginTop: 15 }}>
        No real payment. No goods will be shipped.
      </p>
      <div
        className="purchase-trust"
        style={{ marginTop: 20, justifyContent: "center" }}
      >
        <ShieldCheck size={15} />
        <span>A frontend demo, made with care.</span>
      </div>
    </aside>
  );
}
export function CartPage() {
  const { state, update, ready, toast } = useDemo();
  if (!ready)
    return (
      <div className="container page-content">
        <div className="skeleton" />
      </div>
    );
  return (
    <div className="container page-content">
      <Breadcrumbs items={[{ label: "Your bag" }]} />
      <div className="page-intro">
        <div>
          <span className="eyebrow">GOOD THINGS, FOUND.</span>
          <h1>Your art, coming together.</h1>
          <p>A few pieces that caught your eye.</p>
        </div>
        <Link className="text-link" href="/artworks">
          <ArrowLeft size={13} />
          Keep exploring
        </Link>
      </div>
      {state.cart.length ? (
        <div className="cart-layout">
          <div>
            {state.cart.map((item) => {
              const a = artworks.find((a) => a.slug === item.slug);
              if (!a) return null;
              const artist = artists.find((x) => x.slug === a.artist)!;
              return (
                <article className="cart-item" key={a.slug}>
                  <ArtImage src={a.image} alt={a.title} />
                  <div>
                    <Link href={"/artworks/" + a.slug}>
                      <h3>{a.title}</h3>
                    </Link>
                    <p>
                      By {artist.name}
                      <br />
                      {a.medium} · {a.width} × {a.height} in
                    </p>
                    {a.print ? (
                      <div className="quantity-control">
                        <button
                          aria-label={"Decrease quantity of " + a.title}
                          disabled={item.quantity === 1}
                          onClick={() =>
                            update((s) => ({
                              ...s,
                              cart: s.cart.map((i) =>
                                i.slug === a.slug
                                  ? {
                                      ...i,
                                      quantity: Math.max(1, i.quantity - 1),
                                    }
                                  : i,
                              ),
                            }))
                          }
                        >
                          <Minus size={12} />
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          aria-label={"Increase quantity of " + a.title}
                          disabled={item.quantity >= 10}
                          onClick={() =>
                            update((s) => ({
                              ...s,
                              cart: s.cart.map((i) =>
                                i.slug === a.slug
                                  ? {
                                      ...i,
                                      quantity: Math.min(10, i.quantity + 1),
                                    }
                                  : i,
                              ),
                            }))
                          }
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <span className="field-help">
                        One of a kind · Quantity 1
                      </span>
                    )}
                  </div>
                  <div className="cart-item-right">
                    <strong className="item-price">
                      {money(a.price * item.quantity)}
                    </strong>
                    <button
                      className="icon-button"
                      aria-label={"Remove " + a.title}
                      onClick={() => {
                        update((s) => ({
                          ...s,
                          cart: s.cart.filter((i) => i.slug !== a.slug),
                        }));
                        toast("Artwork removed from your bag.");
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <CartSummary />
        </div>
      ) : (
        <EmptyState
          title="A little room for something lovely."
          description="Your bag is waiting for a piece that feels like you."
          href="/artworks"
        />
      )}
      <DemoNotice>
        All products and prices are fictional. This cart supports a simulated
        checkout only.
      </DemoNotice>
    </div>
  );
}
export function CheckoutPage() {
  const { state, ready, update } = useDemo();
  const [order, setOrder] = useState("");
  const [total, setTotal] = useState(0);
  if (!ready)
    return (
      <div className="container page-content">
        <div className="skeleton" />
      </div>
    );
  if (order)
    return (
      <div className="container page-content">
        <div className="success-state">
          <div className="success-icon">
            <Check size={27} />
          </div>
          <span className="eyebrow">A LITTLE ART. A LOT OF JOY.</span>
          <h1>Your demo order is complete.</h1>
          <p>
            Thank you for exploring Artora. Your sample order of{" "}
            <strong>{money(total)}</strong> is saved in this browser. No payment
            was taken, no order was sent, and no artwork will be shipped.
          </p>
          <p className="field-help">Demo reference {order}</p>
          <ButtonLink href="/profile/activity">
            View demo activity
            <ArrowRight size={14} />
          </ButtonLink>
          <ButtonLink href="/artworks" secondary>
            Keep discovering
          </ButtonLink>
        </div>
      </div>
    );
  if (!state.cart.length)
    return (
      <div className="container page-content">
        <EmptyState
          title="Your bag needs a little inspiration."
          description="Choose a piece before trying the demo checkout."
          href="/artworks"
        />
      </div>
    );
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[
          { label: "Your bag", href: "/cart" },
          { label: "Demo checkout" },
        ]}
      />
      <div className="page-intro">
        <div>
          <span className="eyebrow">THE LAST LITTLE STEP</span>
          <h1>Make room for art.</h1>
          <p>
            Try the checkout experience with sample details. No real purchase
            will take place.
          </p>
        </div>
      </div>
      <div className="cart-layout">
        <form
          id="checkout-form"
          className="checkout-form"
          onSubmit={(e) => {
            e.preventDefault();
            const id = "ART-" + uid().slice(0, 8).toUpperCase();
            const amount = state.cart.reduce(
              (v, i) =>
                v +
                (artworks.find((a) => a.slug === i.slug)?.price || 0) *
                  i.quantity,
              0,
            );
            setTotal(amount);
            update((s) => ({
              ...s,
              cart: [],
              orders: [
                ...s.orders,
                { id, total: amount, createdAt: new Date().toISOString() },
              ],
            }));
            setOrder(id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="form-card">
            <h2>Sample shipping details.</h2>
            <p className="field-help" style={{ marginBottom: 20 }}>
              Use the sample information below. Shipping fields are not saved.
            </p>
            <div className="two-grid">
              <label className="field">
                First name
                <input
                  required
                  defaultValue="Alex"
                  autoComplete="off"
                  name="demo-first-name"
                />
              </label>
              <label className="field">
                Last name
                <input
                  required
                  defaultValue="Taylor"
                  autoComplete="off"
                  name="demo-last-name"
                />
              </label>
            </div>
            <label className="field">
              Sample email
              <input
                required
                type="email"
                defaultValue="alex@example.com"
                autoComplete="off"
                name="demo-email"
              />
            </label>
            <label className="field">
              Sample street address
              <input
                required
                defaultValue="123 Gallery Lane"
                autoComplete="off"
                name="demo-address"
              />
            </label>
            <div className="two-grid">
              <label className="field">
                City
                <input
                  required
                  defaultValue="Portland"
                  autoComplete="off"
                  name="demo-city"
                />
              </label>
              <label className="field">
                State
                <input
                  required
                  defaultValue="Oregon"
                  autoComplete="off"
                  name="demo-state"
                />
              </label>
            </div>
            <div className="two-grid">
              <label className="field">
                ZIP / postal code
                <input
                  required
                  defaultValue="97201"
                  autoComplete="off"
                  name="demo-zip"
                />
              </label>
              <label className="field">
                Country
                <select name="demo-country">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
              </label>
            </div>
          </div>
          <div className="form-card">
            <h2>A demo, from start to finish.</h2>
            <p style={{ fontSize: 12, lineHeight: 1.9 }}>
              No card details, payment service, or real purchase. Confirming
              creates a local demo order and clears your demo cart.
            </p>
            <label
              className="filter-option"
              style={{ marginTop: 20, alignItems: "flex-start" }}
            >
              <input required type="checkbox" name="demo-confirmation" />I
              understand this is a simulated order and nothing will be charged
              or shipped.
            </label>
          </div>
        </form>
        <CartSummary checkout />
      </div>
    </div>
  );
}
export function FavoritesPage() {
  const { state, ready } = useDemo();
  const [tab, setTab] = useState("Artworks");
  const savedArt = artworks.filter((a) => state.favorites.includes(a.slug));
  const savedMasters = masterpieces.filter((w) =>
    state.favorites.includes("master-" + w.slug),
  );
  const savedPosts = [...state.posts, ...seedPosts].filter((p) =>
    state.saved.includes(p.slug),
  );
  return (
    <div className="container page-content">
      <div className="page-intro">
        <div>
          <span className="eyebrow">THE THINGS THAT MOVE YOU</span>
          <h1>Your little collection.</h1>
          <p>A place for the art and stories you want to return to.</p>
        </div>
      </div>
      <Tabs
        tabs={["Artworks", "Masterpieces", "Studio stories"]}
        value={tab}
        onChange={setTab}
      />
      <div style={{ marginTop: 30 }}>
        {!ready ? (
          <div className="skeleton" />
        ) : tab === "Artworks" ? (
          savedArt.length ? (
            <ArtworkGrid items={savedArt} />
          ) : (
            <EmptyState
              title="You haven't saved any paintings yet."
              description="Tap the heart on a piece that speaks to you."
              href="/artworks"
            />
          )
        ) : tab === "Masterpieces" ? (
          savedMasters.length ? (
            <div className="museum-grid">
              {savedMasters.map((w) => (
                <MasterpieceCard work={w} key={w.slug} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="A collection across centuries."
              description="Save a masterpiece and keep a little history close."
              href="/masters"
              label="Explore the Masters"
            />
          )
        ) : savedPosts.length ? (
          <div className="three-grid">
            {savedPosts.map((p) => (
              <PostCard post={p} key={p.slug} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="A place for a little inspiration."
            description="Save a studio story to find it here again."
            href="/community"
            label="Visit the community"
          />
        )}
      </div>
      <DemoNotice>Your collection is saved only in this browser.</DemoNotice>
    </div>
  );
}
