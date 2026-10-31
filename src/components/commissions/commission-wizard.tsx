"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ImagePlus,
  Palette,
  Upload,
} from "lucide-react";
import { useDemo } from "@/context/demo-context";
import { artists } from "@/data/artists";
import { categories, mediums, styles } from "@/data/artworks";
import { matchArtists, money, uid } from "@/lib/utils";
import type { CommissionDraft } from "@/types";
import {
  ArtImage,
  ButtonLink,
  DemoNotice,
  EmptyState,
} from "@/components/shared/ui";
export function CommissionWizard() {
  const { state, update, ready } = useDemo();
  const [step, setStep] = useState(0);
  const [references, setReferences] = useState<string[]>([]);
  const refUrls = useRef<string[]>([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState("");
  const draft = state.commission;
  const names = [
    "Your idea",
    "Your style",
    "Budget & date",
    "Your artist",
    "The details",
  ];
  const candidates = matchArtists(artists, draft);
  const picked = artists.find((a) => a.slug === draft.artist);
  const set = <K extends keyof CommissionDraft>(
    key: K,
    value: CommissionDraft[K],
  ) => update((s) => ({ ...s, commission: { ...s.commission, [key]: value } }));
  useEffect(() => {
    if (!ready) return;
    const slug = new URLSearchParams(location.search).get("artist");
    if (slug && artists.some((a) => a.slug === slug && a.available))
      update((s) => ({ ...s, commission: { ...s.commission, artist: slug } }));
  }, [ready, update]);
  useEffect(() => () => refUrls.current.forEach(URL.revokeObjectURL), []);
  function next() {
    setError("");
    if (step === 0 && draft.description.trim().length < 15) {
      setError(
        "Tell us a little more about your idea (at least 15 characters).",
      );
      return;
    }
    if (step === 2 && (!draft.deadline || draft.deadline < "2026-10-31")) {
      setError("Choose a completion date after October 30, 2026.");
      return;
    }
    if (
      step === 2 &&
      draft.artist &&
      !candidates.some((a) => a.slug === draft.artist)
    )
      set("artist", "");
    if (step === 3 && !candidates.some((a) => a.slug === draft.artist)) {
      setError("Choose one of the artists matched to your preferences.");
      return;
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (submitted)
    return (
      <div className="container page-content">
        <div className="success-state">
          <div className="success-icon">
            <Check size={28} />
          </div>
          <span className="eyebrow">YOUR IDEA IS THE BEGINNING</span>
          <h1>A story worth painting.</h1>
          <p>
            Your demo request for <strong>{picked?.name}</strong> is saved in
            this browser. No artist has been contacted and no payment is due.
          </p>
          <p className="field-help">Demo reference {submitted}</p>
          <ButtonLink href="/profile">
            View your demo activity
            <ArrowRight size={15} />
          </ButtonLink>
          <ButtonLink href="/artworks" secondary>
            Keep exploring
          </ButtonLink>
        </div>
      </div>
    );
  return (
    <div className="container page-content">
      <div className="wizard-container">
        <div className="wizard-header">
          <span className="eyebrow">HUMAN HANDS. YOUR IMAGINATION.</span>
          <h1>Let's make it personal.</h1>
          <p>
            A favorite place, a familiar face, a feeling. It all starts with
            your idea.
          </p>
        </div>
        <div className="wizard-steps">
          {names.map((name, i) => (
            <div
              key={name}
              className={`wizard-step ${i === step ? "active" : i < step ? "complete" : ""}`}
              aria-current={i === step ? "step" : undefined}
            >
              <i>{i < step ? <Check size={11} /> : i + 1}</i>
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="form-card">
          {step === 0 ? (
            <>
              <h2>Tell us what you imagine.</h2>
              <p>
                A few details help us find the right person to bring your idea
                to life.
              </p>
              <div className="field">
                <label>What would you like to create?</label>
                <div className="selection-grid">
                  {categories.slice(0, 6).map((c) => (
                    <button
                      className={`selection-card ${draft.subject === c ? "active" : ""}`}
                      key={c}
                      onClick={() => set("subject", c)}
                    >
                      <Palette size={17} />
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label htmlFor="commission-description">Your idea</label>
                <textarea
                  id="commission-description"
                  rows={4}
                  maxLength={2000}
                  placeholder="A painting of the little beach where we spent our summers, with warm light and a sense of calm…"
                  value={draft.description}
                  onChange={(e) => set("description", e.target.value)}
                />
                <p className="field-help">
                  {draft.description.length}/2,000 characters · Your draft saves
                  automatically in this browser.
                </p>
              </div>
              <div className="field">
                <label>Reference photos (optional)</label>
                <label className="upload-zone">
                  <Upload size={23} />
                  <span>Add a little inspiration</span>
                  <small>JPG, PNG or WebP · Up to 3 images · 8 MB each</small>
                  <input
                    aria-label="Upload commission references"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []).slice(
                        0,
                        3,
                      );
                      if (
                        files.some(
                          (f) =>
                            !["image/jpeg", "image/png", "image/webp"].includes(
                              f.type,
                            ) || f.size > 8 * 1024 * 1024,
                        )
                      ) {
                        setError("Choose JPG, PNG, or WebP images under 8 MB.");
                        return;
                      }
                      refUrls.current.forEach(URL.revokeObjectURL);
                      const urls = files.map(URL.createObjectURL);
                      refUrls.current = urls;
                      setReferences(urls);
                      setError("");
                    }}
                  />
                </label>
                {references.length > 0 && (
                  <div className="thumbnail-row">
                    {references.map((src, i) => (
                      <div className="thumbnail" key={src}>
                        <ArtImage src={src} alt={"Reference " + (i + 1)} />
                      </div>
                    ))}
                  </div>
                )}
                <p className="field-help">
                  Photos stay in this tab and are never uploaded. Reselect them
                  after a page reload.
                </p>
              </div>
              <div className="field">
                <label htmlFor="special-instructions">
                  Anything else? (optional)
                </label>
                <textarea
                  id="special-instructions"
                  rows={2}
                  style={{ minHeight: 80 }}
                  value={draft.instructions}
                  onChange={(e) => set("instructions", e.target.value)}
                  placeholder="A meaningful detail, a favorite color, or something to leave out…"
                />
              </div>
            </>
          ) : step === 1 ? (
            <>
              <h2>Make it feel like you.</h2>
              <p>
                A few preferences to help your artist find the right direction.
              </p>
              <div className="field">
                <label>Painting style</label>
                <div className="selection-grid">
                  {styles.map((s) => (
                    <button
                      key={s}
                      className={`selection-card ${draft.style === s ? "active" : ""}`}
                      onClick={() => set("style", s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="two-grid">
                <label>
                  Medium
                  <select
                    value={draft.medium}
                    onChange={(e) => set("medium", e.target.value)}
                  >
                    {mediums.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Size
                  <select
                    value={draft.size}
                    onChange={(e) => set("size", e.target.value)}
                  >
                    {[
                      "12 × 16 inches",
                      "18 × 24 inches",
                      "24 × 18 inches",
                      "30 × 40 inches",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="field" style={{ marginTop: 25 }}>
                <label htmlFor="inspiration-color">A color to begin with</label>
                <input
                  id="inspiration-color"
                  type="color"
                  value={draft.color}
                  onChange={(e) => set("color", e.target.value)}
                  style={{
                    width: 65,
                    height: 45,
                    border: "1px solid var(--border)",
                    padding: 4,
                    borderRadius: 4,
                  }}
                />
                <p className="field-help">
                  This color will appear in your brief. It is a starting point
                  for your artist.
                </p>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <h2>A little room to create.</h2>
              <p>Choose a comfortable budget and a date you have in mind.</p>
              <div className="field">
                <label htmlFor="commission-budget">
                  Maximum budget · {money(draft.budget)}
                </label>
                <input
                  id="commission-budget"
                  type="range"
                  min={200}
                  max={1500}
                  step={50}
                  value={draft.budget}
                  onChange={(e) => set("budget", +e.target.value)}
                />
                <div className="range-label">
                  <span>$200</span>
                  <span>$1,500</span>
                </div>
              </div>
              <div className="field">
                <label htmlFor="commission-date">
                  Preferred completion date
                </label>
                <input
                  id="commission-date"
                  type="date"
                  min="2026-10-31"
                  value={draft.deadline}
                  onChange={(e) => set("deadline", e.target.value)}
                />
              </div>
              <p className="inline-note">
                This is a demonstration brief. Budget and dates help match
                sample artists; they do not reserve a commission or create a
                payment obligation.
              </p>
            </>
          ) : step === 3 ? (
            <>
              <h2>A human connection.</h2>
              <p>
                Matched by subject, medium, style, and your budget. Choose the
                person whose work speaks to you.
              </p>
              {candidates.length ? (
                candidates.map((artist, i) => (
                  <div
                    className={`match-card ${draft.artist === artist.slug ? "selected" : ""}`}
                    key={artist.slug}
                  >
                    <ArtImage src={artist.image} alt={artist.name} />
                    <div>
                      <h3>{artist.name}</h3>
                      <p>{artist.bio}</p>
                      <div className="match-meta">
                        {artist.specialties.join(" · ")}
                        <br />
                        {artist.mediums.includes(draft.medium)
                          ? "Works in your medium"
                          : "Explore a different medium"}
                        {artist.specialties.includes(draft.subject)
                          ? " · Subject match"
                          : ""}
                      </div>
                    </div>
                    <div className="match-actions">
                      <strong>From {money(artist.minimum)}</strong>
                      <button
                        className={`button small ${draft.artist === artist.slug ? "accent" : "secondary"}`}
                        onClick={() => set("artist", artist.slug)}
                      >
                        {draft.artist === artist.slug ? (
                          <>
                            <Check size={13} />
                            Selected
                          </>
                        ) : (
                          "Choose artist"
                        )}
                      </button>
                      <Link
                        className="text-link"
                        style={{ fontSize: 9 }}
                        href={"/artists/" + artist.slug}
                      >
                        View portfolio
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="Let's give your idea more room."
                  description="No available artists fit this budget. Go back and adjust it to see more matches."
                />
              )}
            </>
          ) : (
            <>
              <h2>Your next chapter, in paint.</h2>
              <p>
                Take a final look at your idea before saving your demo request.
              </p>
              <div className="summary-grid">
                <div>
                  <small>Your idea</small>
                  <strong>{draft.subject}</strong>
                  <p style={{ marginTop: 7, fontSize: 12 }}>
                    {draft.description}
                  </p>
                </div>
                <div>
                  <small>Your artist</small>
                  <div className="product-artist" style={{ margin: 0 }}>
                    {picked && (
                      <ArtImage src={picked.image} alt={picked.name} />
                    )}
                    <span>{picked?.name}</span>
                  </div>
                </div>
                <div>
                  <small>Style & medium</small>
                  {draft.style} · {draft.medium}
                </div>
                <div>
                  <small>Size</small>
                  {draft.size}
                </div>
                <div>
                  <small>Maximum budget</small>
                  {money(draft.budget)}
                </div>
                <div>
                  <small>Preferred completion</small>
                  {draft.deadline}
                </div>
                <div>
                  <small>Color inspiration</small>
                  <span
                    style={{
                      display: "inline-block",
                      width: 17,
                      height: 17,
                      background: draft.color,
                      verticalAlign: "middle",
                      marginRight: 8,
                      borderRadius: 3,
                    }}
                  />
                  {draft.color}
                </div>
                <div>
                  <small>Reference photos</small>
                  {references.length} session-only{" "}
                  {references.length === 1 ? "image" : "images"}
                </div>
                {draft.instructions && (
                  <div style={{ gridColumn: "1/-1" }}>
                    <small>Special instructions</small>
                    {draft.instructions}
                  </div>
                )}
              </div>
              <DemoNotice>
                This saves a demo request in your browser. It does not contact
                an artist, place an order, or take payment.
              </DemoNotice>
            </>
          )}
          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}
          <div className="wizard-bottom">
            <button
              className="button secondary"
              disabled={step === 0}
              onClick={() => {
                setStep((s) => s - 1);
                setError("");
              }}
            >
              <ArrowLeft size={14} />
              Back
            </button>
            <span>STEP {step + 1} OF 5</span>
            {step < 4 ? (
              <button className="button" onClick={next}>
                Continue
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                className="button accent"
                onClick={() => {
                  const id = "ART-" + uid().slice(0, 8).toUpperCase();
                  setSubmitted(id);
                  update((s) => ({
                    ...s,
                    commission: { ...s.commission, submittedId: id },
                  }));
                }}
              >
                Submit Demo Request
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
