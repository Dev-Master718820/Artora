"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Download,
  Lock,
  MessageCircle,
  Mic,
  MicOff,
  MonitorUp,
  Palette,
  PenTool,
  PhoneOff,
  Play,
  Send,
  Star,
  Users,
  Video,
  VideoOff,
} from "lucide-react";
import { courses, academyCategories, availableTimes } from "@/data/courses";
import { artists, tutors } from "@/data/artists";
import { money, searchMatches, uid } from "@/lib/utils";
import { useDemo } from "@/context/demo-context";
import type { Artist, Course } from "@/types";
import { ArtistCard } from "@/components/artists/artist-card";
import { CourseCard } from "./course-card";
import {
  ArtImage,
  Breadcrumbs,
  ButtonLink,
  DemoNotice,
  EmptyState,
  FollowButton,
  Modal,
  SearchInput,
  SectionHeading,
  Tabs,
} from "@/components/shared/ui";
export function AcademyHome() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [format, setFormat] = useState("");
  const filtered = courses.filter(
    (c) =>
      searchMatches(
        q,
        c.title,
        c.category,
        artists.find((a) => a.slug === c.tutor)?.name || "",
      ) &&
      (!category || c.category === category) &&
      (!level || c.level === level) &&
      (!format || c.format === format),
  );
  return (
    <div className="container page-content">
      <div className="academy-hero">
        <div className="academy-hero-copy">
          <span className="eyebrow">ARTORA ACADEMY</span>
          <h1>
            A little curiosity.
            <br />A whole new
            <br />
            <em>creative world.</em>
          </h1>
          <p>
            Learn painting from people who love it. Welcoming classes, personal
            guidance, and room to find your own way.
          </p>
          <a className="button" href="#classes">
            Find your next lesson
            <ArrowUpRight size={16} />
          </a>
        </div>
        <ArtImage
          src="/images/banners/academy.jpg"
          alt="Creative painting materials ready for an art lesson"
          loading="eager"
        />
      </div>
      <div className="chips">
        {academyCategories.slice(0, 6).map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "active" : ""}`}
            onClick={() => setCategory(category === c ? "" : c)}
          >
            {c}
          </button>
        ))}
      </div>
      <section className="section" id="classes">
        <SectionHeading
          eyebrow="SOMETHING TO LOOK FORWARD TO"
          title="Your next creative chapter."
          description="Start where you are. Make something you love."
        />
        <div className="academy-filters">
          <SearchInput
            value={q}
            onChange={setQ}
            placeholder="Search lessons, artists, or techniques…"
          />
          <select
            aria-label="Class category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Every art form</option>
            {academyCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            aria-label="Class difficulty"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Every level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
          </select>
          <select
            aria-label="Lesson format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="">Every format</option>
            <option>Private lesson</option>
            <option>Group class</option>
            <option>Recorded course</option>
          </select>
        </div>
        {filtered.length ? (
          <div className="academy-grid">
            {filtered.map((c) => (
              <CourseCard course={c} key={c.slug} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No classes available for this selection."
            description="Try another medium or a different kind of lesson."
          />
        )}
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="REAL ARTISTS. GENEROUS TEACHERS."
          title="Learn from a human."
          description="A fresh perspective and a little encouragement go a long way."
        />
        <div className="four-grid">
          {tutors.slice(0, 4).map((t) => (
            <div key={t.slug}>
              <ArtistCard artist={t} />
              <Link
                href={"/learn/tutors/" + t.slug}
                className="text-link"
                style={{ marginTop: 15 }}
              >
                Meet your tutor
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <div
        className="challenge-banner"
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <div>
          <span className="eyebrow">STEP INSIDE THE STUDIO</span>
          <h2>A classroom without the commute.</h2>
          <p>Take a look around our interactive classroom demo.</p>
        </div>
        <ButtonLink href="/learn/classroom" secondary>
          Preview the classroom
          <Play size={14} />
        </ButtonLink>
      </div>
      <DemoNotice>
        All class listings, tutor reviews, prices, and schedules are fictional.
        Bookings are simulations stored only in your browser.
      </DemoNotice>
    </div>
  );
}
export function ClassDetail({ course }: { course: Course }) {
  const tutor = artists.find((a) => a.slug === course.tutor)!;
  const { toast } = useDemo();
  const [tab, setTab] = useState("Overview");
  const [preview, setPreview] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[{ label: "Learn", href: "/learn" }, { label: course.title }]}
      />
      <div className="course-detail-layout">
        <div>
          <span className="eyebrow">
            {course.level} · {course.category}
          </span>
          <h1>{course.title}</h1>
          <p className="course-intro">{course.description}</p>
          <Link
            className="product-artist"
            href={"/learn/tutors/" + tutor.slug}
            style={{ marginTop: 23 }}
          >
            <ArtImage src={tutor.image} alt={tutor.name} />
            <span>
              With {tutor.name}
              <small>
                {tutor.experience} years of creating · Sample rating{" "}
                {course.rating}/5
              </small>
            </span>
          </Link>
          <div className="course-main-cover">
            <ArtImage src={course.image} alt={course.title} loading="eager" />
          </div>
          <div className="course-stats">
            <span>
              <BookOpen size={14} />
              {course.lessons.length} lessons
            </span>
            <span>
              <Clock size={14} />
              {course.duration}
            </span>
            <span>
              <Users size={14} />
              {course.format}
            </span>
          </div>
          <Tabs
            tabs={["Overview", "Curriculum", "Reviews", "Materials"]}
            value={tab}
            onChange={setTab}
          />
          {tab === "Overview" ? (
            <div className="prose">
              <h3>A little practice. A new perspective.</h3>
              <p>{course.description}</p>
              <h3>What you will learn</h3>
              <p>
                Build a thoughtful composition, mix harmonious colors, see light
                and shadow, and bring a finished study together. Your tutor will
                share practical ways to keep developing after the lesson.
              </p>
              <p>
                No perfect painting required. Bring a little curiosity and a
                willingness to try something new.
              </p>
            </div>
          ) : tab === "Curriculum" ? (
            <div style={{ marginTop: 15 }}>
              {course.lessons.map((l, i) => (
                <div className="curriculum-row" key={l}>
                  <span>{i + 1}</span>
                  <strong>{l}</strong>
                  <small>{12 + i * 3} min</small>
                  {i === 0 || enrolled ? (
                    <button onClick={() => setPreview(true)}>
                      Preview
                      <Play
                        size={11}
                        style={{ display: "inline", marginLeft: 5 }}
                      />
                    </button>
                  ) : (
                    <Lock size={13} />
                  )}
                </div>
              ))}
            </div>
          ) : tab === "Reviews" ? (
            <>
              <p className="field-help" style={{ marginTop: 20 }}>
                Fictional student reviews for demonstration.
              </p>
              {[
                "A calm, encouraging introduction. I finally understand how to approach a painting.",
                "The small practical tips made such a difference. Looking forward to painting again.",
              ].map((r, i) => (
                <div className="review" key={r}>
                  <strong>{["Olivia R.", "James H."][i]}</strong>
                  <span>★★★★★ · Sample student</span>
                  <p>{r}</p>
                </div>
              ))}
            </>
          ) : (
            <div className="prose">
              <h3>A simple kit to get started.</h3>
              <p>
                Bring a small selection of paints suitable for your medium, a
                flat and a round brush, a palette, paper or canvas, a pencil,
                and a jar of water or appropriate brush cleaner.
              </p>
              <button
                className="button secondary"
                onClick={() => {
                  const blob = new Blob(
                    [
                      "ARTORA · SAMPLE MATERIALS GUIDE\n\nPaints suitable for your medium\nA flat brush and round brush\nPalette, paper or canvas\nPencil and eraser\nWater or suitable brush cleaner\n\nThis is a frontend demonstration.",
                    ],
                    { type: "text/plain" },
                  );
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "artora-materials-guide.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Download materials list
                <Download size={14} />
              </button>
            </div>
          )}
        </div>
        <aside className="booking-panel">
          <span className="eyebrow">MAKE TIME FOR YOURSELF</span>
          <h3 style={{ marginTop: 14 }}>A new skill starts here.</h3>
          <div className="price">
            {money(course.price)}
            <small>
              {" "}
              / {course.format === "Recorded course" ? "course" : "person"} ·
              Demo
            </small>
          </div>
          <ul>
            <li>Guidance from a practicing artist</li>
            <li>Practical, approachable lessons</li>
            <li>A materials list to get you started</li>
            <li>Something you made, just for you</li>
          </ul>
          {course.format === "Private lesson" ? (
            <ButtonLink
              className="full"
              href={"/learn/tutors/" + tutor.slug + "#book"}
            >
              Choose your session
              <Calendar size={15} />
            </ButtonLink>
          ) : (
            <button
              className="button full"
              onClick={() => {
                setEnrolled(true);
                toast(
                  "Demo enrollment confirmed. Explore the lesson previews—no payment was taken.",
                );
              }}
            >
              {enrolled ? (
                <>
                  <Check size={15} />
                  Demo enrollment confirmed
                </>
              ) : (
                <>
                  Enroll · Demo
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          )}
          <button
            className="button secondary full"
            style={{ marginTop: 11 }}
            onClick={() => setPreview(true)}
          >
            <Play size={14} />
            Preview a lesson
          </button>
          <p className="field-help" style={{ marginTop: 15 }}>
            No payment or real enrollment. Lesson previews illustrate the future
            experience.
          </p>
          <hr />
          <Link className="text-link" href="/learn/classroom">
            Take a classroom tour
            <ArrowRight size={13} />
          </Link>
        </aside>
      </div>
      <DemoNotice />
      <Modal
        open={preview}
        onOpenChange={setPreview}
        title="A little look inside"
      >
        <div className="preview-player">
          <ArtImage src={course.image} alt="Lesson reference artwork" />
          <h3>{course.lessons[0]}</h3>
          <p>
            Start by looking for the biggest shapes in your reference. Make a
            light sketch, choose three main colors, and try a small study before
            moving to a larger surface.
          </p>
          <p>Written lesson preview · No video stream is connected.</p>
          <ButtonLink href="/learn/classroom" secondary>
            Explore the classroom
            <ArrowRight size={14} />
          </ButtonLink>
        </div>
      </Modal>
    </div>
  );
}
export function TutorProfile({ tutor }: { tutor: Artist }) {
  const { state, update, toast } = useDemo();
  const [tab, setTab] = useState("About");
  const [type, setType] = useState("Private painting lesson");
  const [date, setDate] = useState("2026-11-05");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [goals, setGoals] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const rate = duration === 30 ? 40 : duration === 60 ? 70 : 100;
  const ownCourses = courses.filter((c) => c.tutor === tutor.slug);
  function book(e: React.FormEvent) {
    e.preventDefault();
    if (!time) {
      setError("Choose a time for your session.");
      return;
    }
    if (date < "2026-10-31") {
      setError("Choose a date after October 30, 2026.");
      return;
    }
    if (
      state.bookings.some(
        (b) => b.tutor === tutor.slug && b.date === date && b.time === time,
      )
    ) {
      setError(
        "You already have a demo booking for this time. Choose another slot.",
      );
      return;
    }
    const id = "LESSON-" + uid().slice(0, 8).toUpperCase();
    update((s) => ({
      ...s,
      bookings: [
        ...s.bookings,
        { id, tutor: tutor.slug, date, time, duration, type, price: rate },
      ],
    }));
    setConfirmation(id);
    setError("");
    toast(
      "Your demo lesson is saved. No tutor was contacted and no payment was taken.",
    );
  }
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[{ label: "Learn", href: "/learn" }, { label: tutor.name }]}
      />
      <div className="profile-heading" style={{ marginTop: 30 }}>
        <div className="profile-identity">
          <ArtImage src={tutor.image} alt={tutor.name} />
          <div className="profile-name">
            <span className="eyebrow">ARTIST & GENEROUS GUIDE</span>
            <h1>{tutor.name}</h1>
            <p>
              {tutor.location} · {tutor.experience} years of creating
            </p>
            <p style={{ marginTop: 7, color: "#9b753b" }}>
              ★ {tutor.rating} · Fictional tutor rating
            </p>
          </div>
        </div>
        <FollowButton slug={tutor.slug} />
      </div>
      <div className="course-detail-layout">
        <div>
          <Tabs
            tabs={["About", "Classes", "Student reviews"]}
            value={tab}
            onChange={setTab}
          />
          {tab === "About" ? (
            <div className="prose">
              <h3>Come as you are. Create something new.</h3>
              <p>{tutor.bio}</p>
              <h3>My approach to teaching</h3>
              <p>
                A relaxed studio atmosphere, practical demonstrations, and
                feedback that helps you see your next step. I adapt each session
                to what you are curious about, whether that is a first painting
                or a project that needs a fresh perspective.
              </p>
              <div className="chips">
                {[...tutor.specialties, ...tutor.mediums].map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <h3>A little from the studio.</h3>
              <div className="two-grid">
                {ownCourses.slice(0, 2).map((c) => (
                  <CourseCard course={c} key={c.slug} />
                ))}
              </div>
            </div>
          ) : tab === "Classes" ? (
            <div className="two-grid" style={{ marginTop: 25 }}>
              {ownCourses.map((c) => (
                <CourseCard course={c} key={c.slug} />
              ))}
            </div>
          ) : (
            <>
              <p className="field-help" style={{ marginTop: 20 }}>
                Sample student feedback. These are fictional demo reviews.
              </p>
              {[
                "Patient, practical, and full of little moments that made things click.",
                "A really welcoming lesson. I left with new ideas and the confidence to try them.",
              ].map((r, i) => (
                <div className="review" key={r}>
                  <strong>{["Amelia R.", "Charlotte H."][i]}</strong>
                  <span>★★★★★</span>
                  <p>{r}</p>
                </div>
              ))}
            </>
          )}
        </div>
        <aside className="booking-panel" id="book">
          {confirmation ? (
            <>
              <div className="success-icon">
                <Check size={25} />
              </div>
              <h3>A little time for creativity.</h3>
              <p style={{ fontSize: 12, lineHeight: 1.9 }}>
                Your demo session with {tutor.name} is saved for {date} at{" "}
                {time} Eastern Time.
              </p>
              <p className="field-help" style={{ marginTop: 15 }}>
                Reference: {confirmation}
                <br />
                No invitation was sent. No payment was taken.
              </p>
              <ButtonLink href="/profile/activity" className="full">
                View demo activity
                <ArrowRight size={14} />
              </ButtonLink>
              <button
                className="text-link"
                style={{ marginTop: 15 }}
                onClick={() => {
                  setConfirmation("");
                  setTime("");
                }}
              >
                Explore another session
              </button>
            </>
          ) : (
            <>
              <span className="eyebrow">A LITTLE CREATIVE SPACE</span>
              <h3 style={{ marginTop: 13 }}>Book a 1:1 lesson.</h3>
              <p className="field-help" style={{ marginBottom: 20 }}>
                Pick a sample session. All times are Eastern Time.
              </p>
              <form className="booking-form" onSubmit={book}>
                <label>
                  Lesson type
                  <select
                    aria-label="Lesson type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {[
                      "Private painting lesson",
                      "Portfolio review",
                      "Project guidance",
                      "Creative consultation",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Date
                  <input
                    type="date"
                    min="2026-10-31"
                    max="2026-12-31"
                    required
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTime("");
                    }}
                  />
                </label>
                <div>
                  <label>Available times · Eastern Time</label>
                  <div className="time-grid">
                    {availableTimes.map((t) => (
                      <button
                        type="button"
                        className={`selection-card ${time === t ? "active" : ""}`}
                        key={t}
                        disabled={state.bookings.some(
                          (b) =>
                            b.tutor === tutor.slug &&
                            b.date === date &&
                            b.time === t,
                        )}
                        onClick={() => {
                          setTime(t);
                          setError("");
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <label>
                  Duration
                  <select
                    aria-label="Duration"
                    value={duration}
                    onChange={(e) => setDuration(+e.target.value)}
                  >
                    <option value={30}>30 minutes · $40</option>
                    <option value={60}>60 minutes · $70</option>
                    <option value={90}>90 minutes · $100</option>
                  </select>
                </label>
                <label>
                  Your goals (optional)
                  <textarea
                    rows={2}
                    style={{ minHeight: 75 }}
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="What would you love to work on?"
                  />
                </label>
                <div className="booking-summary">
                  <strong>{money(rate)}</strong>
                  {duration} minutes
                  <br />
                  {time ? date + " · " + time : "Choose a date & time"}
                </div>
                {error && (
                  <p className="error-text" role="alert">
                    {error}
                  </p>
                )}
                <button className="button accent full" type="submit">
                  Confirm demo booking
                  <ArrowRight size={14} />
                </button>
                <p className="field-help">
                  A frontend simulation. No payment, calendar invite, or tutor
                  contact.
                </p>
              </form>
            </>
          )}
        </aside>
      </div>
      <DemoNotice>
        Schedules and prices are predefined sample data. No calendar or video
        service is connected.
      </DemoNotice>
    </div>
  );
}
export function Classroom() {
  const { toast } = useDemo();
  const [tab, setTab] = useState("Chat");
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  const [draw, setDraw] = useState(false);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([
    {
      name: "Emma Carter",
      text: "Welcome to the demo studio! We are exploring warm light and cool shadows.",
    },
    {
      name: "James Cooper",
      text: "That contrast in the mountains is beautiful.",
    },
  ]);
  const [notes, setNotes] = useState(
    "Start with the large shapes. Keep the sky light and the reflections a little softer than the mountains.",
  );
  const [playing, setPlaying] = useState(false);
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[
          { label: "Learn", href: "/learn" },
          { label: "Classroom preview" },
        ]}
      />
      <div className="classroom">
        <div className="classroom-header">
          <div>
            <span
              className="eyebrow"
              style={{ color: "#b5bcad", fontSize: 8, marginBottom: 8 }}
            >
              ARTORA ACADEMY · THE CREATIVE STUDIO
            </span>
            <h1>Light & Landscape with Emma</h1>
          </div>
          <span>VISUAL DEMO · NOT LIVE</span>
        </div>
        <div className="classroom-layout">
          <div>
            <div className="classroom-screen">
              <ArtImage
                src="/images/artworks/mountain.jpg"
                alt="Landscape reference for a simulated painting lesson"
              />
              <ArtImage
                src="/images/artists/emma.jpg"
                alt="Emma Carter, demo tutor"
                className="classroom-tutor"
              />
              {!playing ? (
                <div className="play-center">
                  <button
                    className="button secondary"
                    style={{ color: "white", borderColor: "#fff8" }}
                    onClick={() => setPlaying(true)}
                  >
                    <Play size={18} />
                    Start lesson preview
                  </button>
                  <span>No camera, microphone, or live connection.</span>
                </div>
              ) : (
                <div
                  className="play-center"
                  style={{
                    justifyContent: "flex-end",
                    padding: 25,
                    background: "linear-gradient(0deg,#0009,transparent 65%)",
                  }}
                >
                  <span>
                    01 · Look for the three biggest shapes before you begin.
                  </span>
                  <button
                    className="button small"
                    onClick={() => setPlaying(false)}
                  >
                    Pause preview
                  </button>
                </div>
              )}
              {draw && (
                <svg
                  className="classroom-annotation"
                  viewBox="0 0 600 500"
                  aria-label="Sample compositional annotation"
                >
                  <path d="M100 360 Q250 220 450 340 M210 270 L300 140 L375 270" />
                </svg>
              )}
            </div>
            <div className="classroom-controls">
              <button
                aria-label="Toggle simulated microphone"
                className={mic ? "active" : ""}
                onClick={() => {
                  setMic(!mic);
                  toast(
                    "Demo control only. No microphone access is requested.",
                  );
                }}
              >
                {mic ? <Mic size={17} /> : <MicOff size={17} />}
              </button>
              <button
                aria-label="Toggle simulated camera"
                className={camera ? "active" : ""}
                onClick={() => {
                  setCamera(!camera);
                  toast("Demo control only. No camera access is requested.");
                }}
              >
                {camera ? <Video size={17} /> : <VideoOff size={17} />}
              </button>
              <button
                aria-label="Show composition annotations"
                className={draw ? "active" : ""}
                onClick={() => setDraw(!draw)}
              >
                <PenTool size={17} />
              </button>
              <button
                aria-label="Show lesson materials"
                onClick={() => setTab("Materials")}
              >
                <BookOpen size={17} />
              </button>
              <button
                aria-label="End demo preview"
                onClick={() => {
                  setPlaying(false);
                  setMic(false);
                  setCamera(false);
                  setDraw(false);
                  toast("Preview ended. Keep creating.");
                }}
              >
                <PhoneOff size={17} />
              </button>
            </div>
            <div
              className="avatar-stack"
              style={{ justifyContent: "center", marginTop: 24 }}
            >
              {artists.slice(0, 5).map((a) => (
                <ArtImage
                  src={a.image}
                  alt={`${a.name}, sample participant`}
                  key={a.slug}
                />
              ))}
            </div>
          </div>
          <aside className="classroom-chat">
            <Tabs
              tabs={["Chat", "Notes", "Materials"]}
              value={tab}
              onChange={setTab}
            />
            {tab === "Chat" ? (
              <>
                {messages.map((m, i) => (
                  <div key={i}>
                    <p>
                      <strong style={{ color: "var(--ink)" }}>{m.name}</strong>
                      <br />
                      {m.text}
                    </p>
                  </div>
                ))}
                <form
                  className="comment-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!chat.trim()) return;
                    setMessages((m) => [
                      ...m,
                      { name: "You · Demo visitor", text: chat.trim() },
                    ]);
                    setChat("");
                  }}
                >
                  <label className="sr-only" htmlFor="classroom-chat">
                    Classroom message
                  </label>
                  <textarea
                    id="classroom-chat"
                    placeholder="Add a little to the conversation…"
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                    rows={2}
                    maxLength={500}
                  />
                  <button className="button small" type="submit">
                    Send
                    <Send size={12} />
                  </button>
                </form>
              </>
            ) : tab === "Notes" ? (
              <>
                <p>Your session-only notebook.</p>
                <label htmlFor="lesson-notes" className="sr-only">
                  Lesson notes
                </label>
                <textarea
                  id="lesson-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={12}
                />
              </>
            ) : (
              <>
                <p>
                  <strong>Keep it simple.</strong>
                  <br />A round brush, a flat brush, a small palette, and paper
                  or canvas.
                </p>
                <p>
                  Suggested colors: warm yellow, burnt sienna, ultramarine blue,
                  and white.
                </p>
                <ArtImage
                  src="/images/banners/brushes.jpg"
                  alt="Painting materials"
                  style={{ height: 160, borderRadius: 3 }}
                />
              </>
            )}
          </aside>
        </div>
      </div>
      <DemoNotice>
        This classroom is an interactive visual preview. It does not connect to
        a real teacher or request camera or microphone permissions. Chat and
        notes last for this page session.
      </DemoNotice>
    </div>
  );
}
