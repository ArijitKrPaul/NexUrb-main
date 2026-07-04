import earth from "../assets/2.mp4";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  {
    code: "OPS",
    title: "Project Management",
    description:
      "Track every department's projects in one place — what's shipped, what's in progress, and what's stalled.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M4 5h16M4 5v14a1 1 0 001 1h6M4 5l2-2h4l2 2M20 5v6M14 20l3-3 3 3M17 17v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    code: "STOCK",
    title: "Inventory Management",
    description:
      "See stock levels, coordinators, and queue position for every project's materials at a glance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4m0-14v14m9-14v10l-9 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    code: "CIVIC",
    title: "Public Complaints",
    description:
      "Residents can lodge infrastructure issues directly, so problems reach the right department faster.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M5 3v18M5 3h11l-2 4 2 4H5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function CornerMarks() {
  return (
    <>
      <span className="pointer-events-none absolute left-6 top-6 h-6 w-6 border-l-2 border-t-2 border-[#F7F5F1]/40" />
      <span className="pointer-events-none absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-[#F7F5F1]/40" />
      <span className="pointer-events-none absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-[#F7F5F1]/40" />
      <span className="pointer-events-none absolute bottom-6 right-6 h-6 w-6 border-b-2 border-r-2 border-[#F7F5F1]/40" />
    </>
  );
}

export default function HomeComponent() {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleRegistration = () => navigate("/register");

  return (
    <div
      className="w-full scroll-smooth"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* SCREEN 1 — hero */}
      <section className="relative h-screen w-full overflow-hidden bg-[#10161F] text-[#F7F5F1]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        >
          <source src={earth} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#10161F] via-[#10161F]/60 to-[#10161F]/20" />

        <CornerMarks />

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-14">
          <h2
            className="text-2xl tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
            }}
          >
            NexUrb
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogin}
              className="rounded-sm border border-[#F7F5F1]/30 px-5 py-2 text-sm tracking-wide text-[#F7F5F1] transition-colors hover:border-[#FF6A3D] hover:text-[#FF6A3D]"
            >
              Log in
            </button>
            <button
              onClick={handleRegistration}
              className="rounded-sm bg-[#FF6A3D] px-5 py-2 text-sm font-medium tracking-wide text-[#10161F] transition-colors hover:bg-[#ff7f59]"
            >
              Register
            </button>
          </div>
        </nav>

        {/* Hero copy */}
        <div className="relative z-10 flex h-[calc(100%-88px)] flex-col justify-end px-6 pb-20 md:px-14 md:pb-24">
          <p
            className="mb-3 text-xs tracking-[0.25em] text-[#FF6A3D]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            CIVIC INFRASTRUCTURE PLATFORM
          </p>
          <h1
            className="mb-6 text-5xl leading-tight md:text-7xl"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
            }}
          >
            NexUrb
          </h1>
          <div className="w-full flex justify-center">
            <p className="max-w-xl text-base leading-relaxed text-[#F7F5F1]/80 md:text-lg w-[500px]">
              NexUrb keeps project and inventory management in one system, and
              gives the public a direct line to report infrastructural issues —
              so departments stay coordinated and residents stay heard.
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#F7F5F1]/50">
          <span
            className="text-[10px] tracking-[0.2em]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            SCROLL
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 animate-bounce"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* SCREEN 2 — features */}
      <section className="flex h-screen w-full flex-col justify-center bg-[#EDEBE6] px-6 py-16 text-[#10161F] md:px-14">
        <div className="mx-auto w-full max-w-6xl">
          <p
            className="mb-2 text-xs tracking-[0.25em] text-[#FF6A3D]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            WHAT NEXURB DOES
          </p>
          <h2
            className="mb-10 text-3xl md:text-4xl"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
            }}
          >
            Three modules, one platform
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.code}
                className="group relative rounded-sm border border-[#4C5B6B]/25 bg-[#F7F5F1] p-7 transition-all hover:-translate-y-1 hover:border-[#FF6A3D]/60 hover:shadow-lg"
              >
                <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-[#4C5B6B]/40" />
                <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[#4C5B6B]/40" />

                <p
                  className="mb-4 text-[11px] tracking-[0.2em] text-[#4C5B6B]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {f.code}
                </p>
                <div className="mb-4 text-[#FF6A3D] transition-colors group-hover:text-[#10161F]">
                  {f.icon}
                </div>
                <h3
                  className="mb-3 text-lg"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4C5B6B]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mx-auto mt-12 w-full max-w-6xl text-center text-xs text-[#4C5B6B]/70">
          <p>&copy; NexUrb</p>
        </footer>
      </section>
    </div>
  );
}
