import { useState, type CSSProperties, type PointerEvent } from "react";
import { RotateCw } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { getCareerData, getPortfolioExtensions } from "@/data";
import { getAboutFacts } from "@/data/about";
import backgroundImg from "@/assets/background-general.webp";
import profilePic from "@/assets/profile-pic.webp";
import { Section } from "./Section";

const RESTING_TILT = { x: 0, y: 0, mx: 50, my: 50 };

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-primary/60">{label}</p>
      <p className="font-display text-xs sm:text-sm tracking-wider uppercase text-foreground">{value}</p>
    </div>
  );
}

function Barcode() {
  // Fixed bar widths so the card looks the same on every render.
  const bars = Array.from({ length: 42 }, (_, i) => ((i * 7) % 5) + 1);
  return (
    <div className="flex h-7 min-w-0 items-stretch gap-[2px] overflow-hidden" aria-hidden="true">
      {bars.map((width, i) => (
        <span key={i} className="shrink-0 bg-foreground/70" style={{ width }} />
      ))}
    </div>
  );
}

/** The About section: a holographic ID card that tilts toward the cursor and flips to an off-duty side. */
export function About() {
  const career = getCareerData();
  const { personal } = career;
  const { about } = getPortfolioExtensions();
  const { current, since, yearsBuilding, gpa } = getAboutFacts(career);
  const intro = about.intro({ location: personal.location, role: current.title, company: current.company });
  const initials = personal.name
    .split(" ")
    .map((part) => part[0])
    .join("");
  const cardId = `${initials}-${new Date().getFullYear()}-${personal.location.slice(0, 3).toUpperCase()}`;

  const [tilt, setTilt] = useState(RESTING_TILT);
  const [flipped, setFlipped] = useState(false);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    // Touch screens have no hover, so the card only tilts for a mouse.
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 14, y: (px - 0.5) * 18, mx: px * 100, my: py * 100 });
  };

  const cardStyle = {
    "--rx": `${tilt.x}deg`,
    "--ry": `${tilt.y + (flipped ? 180 : 0)}deg`,
    "--mx": `${tilt.mx}%`,
    "--my": `${tilt.my}%`,
  } as CSSProperties;

  const facts = [
    { value: `${yearsBuilding}+`, label: "Years building software" },
    ...(gpa ? [{ value: gpa.value.toFixed(2), label: `${gpa.degree} GPA (of ${gpa.scale.toFixed(1)})` }] : []),
  ];

  return (
    <Section id={SECTION_IDS.about} title="About Me" background={backgroundImg}>
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center">
        <div className="space-y-4">
          <div className="holo-stage" onPointerMove={handlePointerMove} onPointerLeave={() => setTilt(RESTING_TILT)}>
            <div className="holo-card" style={cardStyle}>
              {/* Front. The hidden side is aria-hidden so screen readers only read the visible one. */}
              <div role="group" aria-label="ID card" aria-hidden={flipped} className="holo-face flex flex-col p-5 sm:p-7">
                <div className="holo-foil" aria-hidden="true" />
                <div className="relative flex items-center justify-between mb-5 font-mono text-[10px] tracking-[0.25em] text-primary/80">
                  <span>OPERATOR ID</span>
                  <span>{cardId}</span>
                </div>
                <div className="relative flex gap-4 sm:gap-6">
                  <div className="holo-portrait relative w-24 sm:w-32 aspect-[3/4] shrink-0 overflow-hidden rounded-md border border-primary/40">
                    <img
                      src={profilePic}
                      alt={`Portrait of ${personal.name}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-[50%_20%] scale-125 origin-[50%_25%]"
                    />
                  </div>
                  <div className="min-w-0 space-y-3">
                    <h3 className="font-display text-lg sm:text-2xl tracking-widest uppercase font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                      {personal.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      <Field label="DESIGNATION" value={personal.title} />
                      <Field label="BASE" value={personal.location} />
                      <Field label="ASSIGNMENT" value={current.company} />
                      <Field label="ACTIVE SINCE" value={since} />
                    </div>
                  </div>
                </div>
                <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">{intro}</p>
                {/* Pinned to the bottom: both sides are as tall as the taller back. */}
                <div className="relative mt-auto pt-5 flex items-end justify-between gap-4">
                  <Barcode />
                  <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[10px] tracking-widest text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> STATUS: ACTIVE
                  </span>
                </div>
              </div>

              {/* Back */}
              <div role="group" aria-label="Off-duty profile" aria-hidden={!flipped} className="holo-face holo-back p-5 sm:p-7">
                <div className="holo-foil" aria-hidden="true" />
                <div className="relative flex items-center justify-between mb-5 font-mono text-[10px] tracking-[0.25em] text-primary/80">
                  <span>OFF-DUTY PROFILE</span>
                  <span>REVERSE</span>
                </div>
                <div className="relative space-y-4">
                  {about.interests.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex gap-3">
                      <Icon className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                      <div>
                        <h4 className="font-display text-sm font-normal tracking-widest uppercase text-foreground">{title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-primary/20 pt-4">
                    <p className="font-mono text-[10px] tracking-[0.25em] text-primary/70 mb-2">GOING DEEPER INTO</p>
                    <div className="space-y-2.5">
                      {about.deepening.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="flex gap-2.5">
                          <Icon className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                          <div>
                            <h4 className="text-sm font-medium tracking-normal text-foreground">{title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className="flex items-center gap-2 font-display text-xs tracking-[0.2em] uppercase text-primary border border-primary/40 rounded-md px-4 py-2 hover:bg-primary/10 transition-colors"
            >
              <RotateCw className="h-3.5 w-3.5" /> {flipped ? "Show front" : "Flip card · off duty"}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="font-display text-xs font-normal tracking-[0.25em] text-primary/80 mb-4">HOW I WORK</h3>
            <div className="space-y-4">
              {about.principles.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-normal tracking-wider text-foreground">{title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {facts.map(({ value, label }) => (
              <div key={label} className="border border-primary/20 bg-background/60 px-4 py-3 rounded-md">
                <p className="font-display text-2xl text-primary">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
