"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Brush,
  Check,
  CheckCircle2,
  Heart,
  ImagePlus,
  MessageCircle,
  Palette,
  Plus,
  Send,
  Share2,
  Target,
  Upload,
  Users,
} from "lucide-react";
import {
  posts as seedPosts,
  postCategories,
  comments as seedComments,
  annotations as seedAnnotations,
  critiqueCategories,
  feedbackOptions,
} from "@/data/community-posts";
import { artists } from "@/data/artists";
import { mediums } from "@/data/artworks";
import { challenges } from "@/data/challenges";
import { groups } from "@/data/groups";
import { useDemo } from "@/context/demo-context";
import { uid } from "@/lib/utils";
import type { Annotation, Post } from "@/types";
import {
  ArtImage,
  ButtonLink,
  DemoNotice,
  EmptyState,
  FollowButton,
  Modal,
  SectionHeading,
  Tabs,
} from "@/components/shared/ui";
function author(slug: string) {
  return (
    artists.find((a) => a.slug === slug) || {
      name: "You · Demo visitor",
      image: "/images/artists/emma.jpg",
      slug: "demo-visitor",
    }
  );
}
export function PostCard({ post }: { post: Post }) {
  const { state, toggle } = useDemo();
  const artist = author(post.artist);
  const liked = state.likes.includes(post.slug);
  const saved = state.saved.includes(post.slug);
  const count = [...seedComments, ...state.comments].filter(
    (c) => c.post === post.slug,
  ).length;
  return (
    <article className="post-card">
      <div className="post-author">
        <Link
          href={
            post.artist === "demo-visitor"
              ? "/profile"
              : "/artists/" + artist.slug
          }
        >
          <ArtImage src={artist.image} alt={artist.name} />
        </Link>
        <span>
          <Link
            href={
              post.artist === "demo-visitor"
                ? "/profile"
                : "/artists/" + artist.slug
            }
          >
            {artist.name}
          </Link>
          <small>{post.category}</small>
        </span>
        {post.artist !== "demo-visitor" && (
          <FollowButton slug={artist.slug} compact />
        )}
      </div>
      <Link href={"/community/posts/" + post.slug}>
        <ArtImage src={post.image} alt={post.title} />
      </Link>
      <div className="post-content">
        <Link href={"/community/posts/" + post.slug}>
          <h3>{post.title}</h3>
        </Link>
        <p>
          {post.description.slice(0, 125)}
          {post.description.length > 125 ? "…" : ""}
        </p>
        <div className="post-actions">
          <button
            aria-label={`${liked ? "Unlike" : "Like"} ${post.title}`}
            aria-pressed={liked}
            onClick={() => toggle("likes", post.slug)}
            className={liked ? "active" : ""}
          >
            <Heart size={15} fill={liked ? "currentColor" : "none"} />
            {post.likes + Number(liked)}
          </button>
          <Link
            href={"/community/posts/" + post.slug}
            aria-label={`${count} comments on ${post.title}`}
          >
            <MessageCircle size={14} />
            {count}
          </Link>
          <button
            className={saved ? "active" : ""}
            aria-label={`${saved ? "Unsave" : "Save"} post ${post.title}`}
            aria-pressed={saved}
            onClick={() => toggle("saved", post.slug)}
          >
            <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
export function CommunityFeed() {
  const { state } = useDemo();
  const [tab, setTab] = useState("For you");
  const [category, setCategory] = useState("");
  let all = [...state.posts, ...seedPosts].filter(
    (p) => !category || p.category === category,
  );
  if (tab === "Following")
    all = all.filter((p) => state.follows.includes(p.artist));
  if (tab === "Latest")
    all = all.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (tab === "Popular")
    all = all.toSorted(
      (a, b) =>
        b.likes +
        Number(state.likes.includes(b.slug)) -
        (a.likes + Number(state.likes.includes(a.slug))),
    );
  return (
    <div className="container page-content">
      <div className="community-hero">
        <div className="community-hero-copy">
          <span className="eyebrow">THE STUDIO DOOR IS ALWAYS OPEN</span>
          <h1>
            A community
            <br />
            that creates together.
          </h1>
          <p>
            Share your work, find a fresh perspective, and make a little room
            for inspiration.
          </p>
          <ButtonLink href="/community/create">
            Share your art
            <Plus size={14} />
          </ButtonLink>
        </div>
        <ArtImage
          src="/images/banners/studio.jpg"
          alt="A colorful artist's workspace with paint and creative materials"
          loading="eager"
        />
      </div>
      <Tabs
        tabs={["For you", "Following", "Latest", "Popular"]}
        value={tab}
        onChange={setTab}
      />
      <div className="feed-layout">
        <aside className="feed-nav">
          <h4>YOUR CREATIVE WORLD</h4>
          <button
            className={!category ? "active" : ""}
            onClick={() => setCategory("")}
          >
            <Palette size={14} />
            All posts
          </button>
          {postCategories.map((c) => (
            <button
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
              key={c}
            >
              <Brush size={13} />
              {c}
            </button>
          ))}
          <h4>A LITTLE MORE CONNECTION</h4>
          <Link href="/community/groups">
            <Users size={13} />
            Artist groups
          </Link>
          <Link href="/community/challenges">
            <Target size={13} />
            Monthly challenge
          </Link>
          <h4>POPULAR TAGS</h4>
          <div>
            {[
              "watercolor",
              "portrait",
              "landscape",
              "painting",
              "sketchbook",
            ].map((t) => (
              <Link className="chip" href={"/artworks?q=" + t} key={t}>
                #{t}
              </Link>
            ))}
          </div>
        </aside>
        <div>
          {all.length ? (
            <div className="post-grid">
              {all.map((p) => (
                <PostCard post={p} key={p.slug} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={
                tab === "Following"
                  ? "Your creative circle starts here."
                  : "No posts in this corner yet."
              }
              description={
                tab === "Following"
                  ? "Follow a few artists and their studio stories will appear here."
                  : "Share something you have been working on."
              }
              href={tab === "Following" ? "/artists" : "/community/create"}
              label={
                tab === "Following" ? "Meet the artists" : "Share your art"
              }
            />
          )}
        </div>
        <aside className="feed-aside">
          <div className="panel">
            <span className="eyebrow">THIS MONTH'S INVITATION</span>
            <Link href="/community/challenges" className="challenge-preview">
              <ArtImage
                src="/images/artworks/coast.jpg"
                alt="Golden hour challenge"
              />
              <span>
                Chase the
                <br />
                golden hour.
              </span>
            </Link>
            <p>
              A moment of warmth. A different way of seeing. What does golden
              hour look like to you?
            </p>
            <ButtonLink
              href="/community/challenges"
              secondary
              className="small full"
            >
              Explore the challenge
              <ArrowRight size={12} />
            </ButtonLink>
          </div>
          <div>
            <span className="eyebrow">FIND YOUR PEOPLE</span>
            {groups.slice(0, 3).map((g) => (
              <Link
                href="/community/groups"
                className="group-mini"
                key={g.slug}
              >
                <ArtImage src={g.image} alt="" />
                <span>
                  {g.name}
                  <small>A space to share & grow</small>
                </span>
                <ArrowRight size={12} />
              </Link>
            ))}
          </div>
        </aside>
      </div>
      <DemoNotice>
        Studio stories, artists, likes, and comments are sample content. Your
        demo posts and interactions are saved only in this browser.
      </DemoNotice>
    </div>
  );
}
export function PostComposer() {
  const router = useRouter();
  const { update, toast } = useDemo();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(postCategories[0]);
  const [medium, setMedium] = useState(mediums[0]);
  const [tags, setTags] = useState("");
  const [feedback, setFeedback] = useState(feedbackOptions[0]);
  const [error, setError] = useState("");
  const currentUrl = useRef("");
  const transferred = useRef(false);
  useEffect(
    () => () => {
      if (currentUrl.current && !transferred.current)
        URL.revokeObjectURL(currentUrl.current);
    },
    [],
  );
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) {
      setError(
        "Add an image so the community can see what you have been creating.",
      );
      return;
    }
    if (title.trim().length < 3 || description.trim().length < 10) {
      setError(
        "Add a title of at least 3 characters and a description of at least 10 characters.",
      );
      return;
    }
    const slug = "your-art-" + uid();
    const post: Post = {
      slug,
      title: title.trim(),
      description: description.trim(),
      image,
      artist: "demo-visitor",
      category,
      medium,
      tags: [
        ...new Set(
          tags
            .split(",")
            .map((t) => t.trim().replace(/^#/, ""))
            .filter(Boolean),
        ),
      ].slice(0, 10),
      feedback,
      likes: 0,
      createdAt: new Date().toISOString(),
      sessionImage: true,
    };
    transferred.current = true;
    update((s) => ({ ...s, posts: [post, ...s.posts] }));
    toast(
      "Your demo post is in the community. Thanks for sharing a little of yourself.",
    );
    router.push("/community");
  }
  return (
    <div className="container page-content">
      <div className="page-intro">
        <div>
          <span className="eyebrow">EVERY BRUSHSTROKE HAS A STORY</span>
          <h1>Share what you've been making.</h1>
          <p>
            Finished, unfinished, or finding its way. There's a place for it
            here.
          </p>
        </div>
      </div>
      <div className="composer-layout">
        <aside className="composer-sidebar">
          <h3>
            A little courage.
            <br />A new connection.
          </h3>
          <p>You don't need to have it all figured out to share your work.</p>
          <div style={{ marginTop: 30 }}>
            {["Your artwork", "The story", "A little feedback"].map((t, i) => (
              <div
                className="wizard-step active"
                style={{ flexDirection: "row", marginBottom: 22 }}
                key={t}
              >
                <i>{i + 1}</i>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </aside>
        <form onSubmit={submit} className="composer-main form-card">
          <div className="field">
            <label>Your artwork</label>
            <label className="upload-zone">
              {image ? (
                <ArtImage
                  src={image}
                  alt="Your artwork preview"
                  className="upload-preview"
                />
              ) : (
                <>
                  <ImagePlus size={30} />
                  <span>Drop your inspiration here, or choose an image</span>
                  <small>JPG, PNG or WebP · Maximum 8 MB</small>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                aria-label="Upload your artwork"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  if (
                    !["image/jpeg", "image/png", "image/webp"].includes(
                      f.type,
                    ) ||
                    f.size > 8 * 1024 * 1024
                  ) {
                    setError(
                      "Please choose a JPG, PNG, or WebP image under 8 MB.",
                    );
                    return;
                  }
                  if (currentUrl.current)
                    URL.revokeObjectURL(currentUrl.current);
                  const url = URL.createObjectURL(f);
                  currentUrl.current = url;
                  setImage(url);
                  setError("");
                }}
              />
            </label>
            <p className="field-help">
              Images stay in this browser tab. Text is saved locally; after a
              reload, your post will show an image placeholder.
            </p>
          </div>
          <div className="field">
            <label htmlFor="post-title">Give it a name</label>
            <input
              id="post-title"
              required
              minLength={3}
              maxLength={100}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sunset at the coast"
            />
          </div>
          <div className="field">
            <label htmlFor="post-description">Tell us the story</label>
            <textarea
              id="post-description"
              required
              minLength={10}
              maxLength={2000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What inspired this? What did you discover along the way?"
            />
          </div>
          <div className="two-grid">
            <label>
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {postCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Medium
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
              >
                {mediums.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="field" style={{ marginTop: 23 }}>
            <label htmlFor="post-tags">Tags (optional)</label>
            <input
              id="post-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="landscape, watercolor, goldenhour"
            />
            <p className="field-help">Separate up to 10 tags with commas.</p>
          </div>
          <div className="field">
            <label>What kind of feedback feels right?</label>
            {feedbackOptions.map((f) => (
              <label className="filter-option" key={f}>
                <input
                  type="radio"
                  name="feedback"
                  checked={feedback === f}
                  onChange={() => setFeedback(f)}
                />
                {f}
              </label>
            ))}
            <p className="field-help">
              Image annotations are available only when you choose constructive
              critique or technical feedback.
            </p>
          </div>
          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}
          <div className="wizard-bottom">
            <Link href="/community" className="button secondary">
              Back to the studio
            </Link>
            <button type="submit" className="button">
              Post to community
              <ArrowRight size={14} />
            </button>
          </div>
        </form>
        <aside className="composer-preview panel">
          <span className="eyebrow">A LITTLE PREVIEW</span>
          {image ? (
            <ArtImage src={image} alt="Post preview" />
          ) : (
            <div
              className="image-fallback"
              style={{ height: 220, marginBottom: 20 }}
            >
              <span>
                YOUR NEXT
                <br />
                <i>little masterpiece.</i>
              </span>
            </div>
          )}
          <h3>{title || "Your story starts here."}</h3>
          <p>
            {description || "Your artwork and a little of the story behind it."}
          </p>
          <div className="chips" style={{ marginTop: 15 }}>
            <span className="chip">{category}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
export function PostDetail({ slug }: { slug: string }) {
  const { state, ready, update, toggle, toast } = useDemo();
  const post = [...state.posts, ...seedPosts].find((p) => p.slug === slug);
  const [comment, setComment] = useState("");
  const [critique, setCritique] = useState(false);
  const [category, setCategory] = useState(critiqueCategories[0]);
  const [pending, setPending] = useState<{ x: number; y: number } | null>(null);
  const [text, setText] = useState("");
  const [active, setActive] = useState("");
  if (!post)
    return (
      <div className="container page-content">
        {ready ? (
          <EmptyState
            title="This studio story isn't here."
            description="A local demo post is visible only in the browser where it was created."
            href="/community"
            label="Back to the community"
          />
        ) : (
          <div className="skeleton" />
        )}
      </div>
    );
  const creator = author(post.artist);
  const canCritique = ["Constructive critique", "Technical feedback"].includes(
    post.feedback,
  );
  const annotations = [...seedAnnotations, ...state.annotations].filter(
    (a) => a.post === slug,
  );
  const comments = [...seedComments, ...state.comments].filter(
    (c) => c.post === slug,
  );
  const selected = annotations.find((a) => a.id === active);
  function point(e: MouseEvent<HTMLDivElement>) {
    if (!critique || !canCritique) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPending({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setText("");
  }
  function annotate(e: React.FormEvent) {
    e.preventDefault();
    if (!pending || text.trim().length < 5) return;
    const item: Annotation = {
      id: uid(),
      post: slug,
      ...pending,
      category,
      text: text.trim(),
      artist: "demo-visitor",
    };
    update((s) => ({ ...s, annotations: [...s.annotations, item] }));
    setActive(item.id);
    setPending(null);
    setText("");
    toast("Your feedback annotation has been added.");
  }
  return (
    <div className="container page-content">
      <Link
        href="/community"
        className="text-link"
        style={{ marginBottom: 26 }}
      >
        <ArrowLeft size={13} />
        Back to the studio
      </Link>
      <div className="post-detail-title">
        <div>
          <div className="product-artist" style={{ marginBottom: 13 }}>
            <ArtImage src={creator.image} alt={creator.name} />
            <span>
              {creator.name}
              <small>{post.category} · Demo studio story</small>
            </span>
          </div>
          <h1>{post.title}</h1>
        </div>
        {post.artist !== "demo-visitor" && <FollowButton slug={post.artist} />}
      </div>
      <div className="post-detail-layout">
        <div>
          <div
            className={`post-detail-image ${critique ? "critique-mode" : ""}`}
            onClick={point}
          >
            <ArtImage src={post.image} alt={post.title} loading="eager" />
            {canCritique &&
              annotations.map((a, i) => (
                <button
                  className={`annotation-pin ${a.id === active ? "active" : ""}`}
                  style={{ left: a.x + "%", top: a.y + "%" }}
                  key={a.id}
                  aria-label={`${a.category} annotation ${i + 1}: ${a.text}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(a.id);
                  }}
                >
                  {i + 1}
                </button>
              ))}
          </div>
          <div className="post-actions">
            <button
              className={state.likes.includes(slug) ? "active" : ""}
              onClick={() => toggle("likes", slug)}
              aria-label="Like this painting"
              aria-pressed={state.likes.includes(slug)}
            >
              <Heart
                size={19}
                fill={state.likes.includes(slug) ? "currentColor" : "none"}
              />
              {post.likes + Number(state.likes.includes(slug))}
            </button>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <MessageCircle size={18} />
              {comments.length}
            </span>
            <button
              onClick={() => toggle("saved", slug)}
              aria-label="Save this post"
              aria-pressed={state.saved.includes(slug)}
            >
              <Bookmark
                size={17}
                fill={state.saved.includes(slug) ? "currentColor" : "none"}
              />
              {state.saved.includes(slug) ? "Saved" : "Save"}
            </button>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(location.href);
                  toast("Link copied. Share a little inspiration.");
                } catch {
                  toast("Copy this page URL from your browser to share it.");
                }
              }}
            >
              <Share2 size={17} />
              Share
            </button>
          </div>
          <p className="post-detail-copy">{post.description}</p>
          <div className="chips">
            {post.tags.map((t) => (
              <span className="chip" key={t}>
                #{t}
              </span>
            ))}
          </div>
          <div className="critique-controls">
            {canCritique ? (
              <>
                <button
                  className={`button ${critique ? "accent" : "secondary"}`}
                  aria-pressed={critique}
                  onClick={() => setCritique(!critique)}
                >
                  <Target size={14} />
                  {critique ? "Critique mode on" : "Add constructive critique"}
                </button>
                <select
                  aria-label="Critique category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {critiqueCategories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </>
            ) : (
              <span className="field-help">
                This artist prefers: {post.feedback}. Please respect their
                creative space.
              </span>
            )}
          </div>
          {critique && (
            <p className="field-help">
              Click a place on the painting to add kind, specific feedback.
              Keyboard users can use the centered annotation option below.
            </p>
          )}
          {critique && (
            <button
              className="text-link"
              style={{ marginTop: 10, fontSize: 10 }}
              onClick={() => {
                setPending({ x: 50, y: 50 });
                setText("");
              }}
            >
              Add an annotation at the center
              <Plus size={12} />
            </button>
          )}
          {selected && canCritique && (
            <div className="annotation-note">
              <strong>
                {selected.category} · {author(selected.artist).name}
              </strong>
              {selected.text}
            </div>
          )}
          <SectionHeading title="More from the studio." />
          <div className="two-grid">
            {seedPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((p) => (
                <PostCard post={p} key={p.slug} />
              ))}
          </div>
        </div>
        <aside className="comments-panel">
          <h3>A fresh perspective.</h3>
          <p className="field-help" style={{ marginBottom: 25 }}>
            Kind words. Useful observations. Room to grow.
          </p>
          <div className="comments-list">
            {comments.map((c) => (
              <div className="comment" key={c.id}>
                <ArtImage
                  src={author(c.artist).image}
                  alt={author(c.artist).name}
                />
                <div>
                  <strong>{author(c.artist).name}</strong>
                  <small>Studio visitor</small>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
            {canCritique &&
              annotations.map((a) => (
                <button
                  key={a.id}
                  className="comment"
                  style={{ textAlign: "left", width: "100%", padding: 0 }}
                  onClick={() => setActive(a.id)}
                >
                  <ArtImage
                    src={author(a.artist).image}
                    alt={author(a.artist).name}
                  />
                  <div>
                    <strong>{author(a.artist).name}</strong>
                    <br />
                    <span className="comment-category">{a.category}</span>
                    <p>{a.text}</p>
                  </div>
                </button>
              ))}
          </div>
          <form
            className="comment-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!comment.trim()) return;
              update((s) => ({
                ...s,
                comments: [
                  ...s.comments,
                  {
                    id: uid(),
                    post: slug,
                    artist: "demo-visitor",
                    text: comment.trim(),
                    createdAt: new Date().toISOString(),
                  },
                ],
              }));
              setComment("");
              toast("Your comment is part of the conversation.");
            }}
          >
            <label htmlFor="comment-text">Add to the conversation</label>
            <textarea
              id="comment-text"
              placeholder="Share a thoughtful observation…"
              required
              maxLength={1500}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="button small">
              Post comment
              <Send size={13} />
            </button>
          </form>
          <p className="field-help">
            Comments are a browser-local demo. They are not sent to the artist.
          </p>
        </aside>
      </div>
      <Modal
        open={!!pending}
        onOpenChange={(open) => {
          if (!open) setPending(null);
        }}
        title="A thoughtful little observation"
      >
        <form onSubmit={annotate}>
          <label htmlFor="annotation-category">Feedback category</label>
          <select
            id="annotation-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {critiqueCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <label htmlFor="annotation-text" style={{ marginTop: 20 }}>
            What do you notice?
          </label>
          <textarea
            id="annotation-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            minLength={5}
            maxLength={1000}
            placeholder="Try being specific, kind, and actionable…"
          />
          <button
            className="button full"
            type="submit"
            style={{ marginTop: 18 }}
          >
            Add feedback
            <Plus size={14} />
          </button>
        </form>
      </Modal>
      <DemoNotice>
        Feedback here is creative critique, separate from collector reviews.
        Your annotations and comments stay in this browser.
      </DemoNotice>
    </div>
  );
}
export function GroupsPage() {
  const { state, toggle } = useDemo();
  return (
    <div className="container page-content">
      <div className="page-intro">
        <div>
          <span className="eyebrow">YOUR PEOPLE ARE HERE</span>
          <h1>Find your creative circle.</h1>
          <p>
            Small communities, shared curiosity, and a little encouragement
            along the way.
          </p>
        </div>
      </div>
      <div className="four-grid">
        {groups.map((g) => (
          <article className="group-card" key={g.slug}>
            <ArtImage src={g.image} alt={g.name} />
            <div>
              <h3>{g.name}</h3>
              <p>{g.description}</p>
              <button
                className={`button full ${state.follows.includes("group-" + g.slug) ? "selected" : "secondary"}`}
                onClick={() => toggle("follows", "group-" + g.slug)}
              >
                {state.follows.includes("group-" + g.slug) ? (
                  <>
                    <Check size={14} />
                    Joined demo group
                  </>
                ) : (
                  <>
                    Join demo group
                    <Plus size={14} />
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </div>
      <DemoNotice>
        Joining a sample group is a browser-local preference. No membership is
        created.
      </DemoNotice>
    </div>
  );
}
export function ChallengesPage() {
  return (
    <div className="container page-content">
      <div className="page-intro">
        <div>
          <span className="eyebrow">
            A SMALL PROMPT. A WORLD OF POSSIBILITIES.
          </span>
          <h1>Make something this month.</h1>
          <p>A little invitation to see things differently.</p>
        </div>
      </div>
      {challenges.map((c, i) => (
        <section className="community-hero" key={c.slug}>
          <div className="community-hero-copy">
            <span className="eyebrow">
              {c.date} ·{" "}
              {i === 0 ? "CURRENT CHALLENGE" : "UPCOMING INSPIRATION"}
            </span>
            <h1 style={{ fontSize: 35 }}>{c.title}</h1>
            <p>{c.description}</p>
            <p>
              <strong>Your prompt:</strong> {c.prompt}
            </p>
            <ButtonLink href="/community/create">
              Share your interpretation
              <ArrowRight size={14} />
            </ButtonLink>
          </div>
          <ArtImage src={c.image} alt={c.title} />
        </section>
      ))}
      <DemoNotice>
        These are sample creative prompts. Posts are saved locally; no
        competition entry or prize is created.
      </DemoNotice>
    </div>
  );
}
