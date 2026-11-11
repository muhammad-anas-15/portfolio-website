import { useEffect, useRef, useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { profile } from "../data/portfolio";
import { asset, article } from "../lib/helpers";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap";
import Highlight from "../components/Highlight";
import CodePortrait from "../components/CodePortrait";

/** Typewriter that cycles through the roles. */
function useTypewriter(words) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? 35 : 70;
    if (!deleting && length === word.length) delay = 1800;
    const t = setTimeout(() => {
      if (!deleting && length === word.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [length, deleting, index, words]);

  return { word: words[index], text: words[index].slice(0, length) };
}

// Soft oval fade + extra fade at the top so the photo melts into the page
const PHOTO_MASK =
  "radial-gradient(ellipse 52% 60% at 50% 45%, var(--color-mask) 55%, transparent 100%), linear-gradient(to bottom, transparent 0%, var(--color-mask) 14%)";

const iconBtn =
  "grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.02] text-lg text-soft transition-[border-color,color] duration-200 hover:border-accent/60 hover:text-accent";

const Hero = () => {
  const { word, text } = useTypewriter(profile.roles);
  const scope = useRef(null);

  // Page-load entrance: the name rises letter by letter out of a mask,
  // then the role, tagline, actions and photo settle in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // words wrap the chars, so a narrow screen never breaks "Muhammad" mid-word
        const split = SplitText.create("[data-hero-name]", { type: "lines,words,chars", mask: "lines" });
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from("[data-hero-hello]", { y: 16, autoAlpha: 0, duration: 0.6 })
          .from(split.chars, { yPercent: 115, duration: 0.9, stagger: 0.028 }, 0.1)
          .from("[data-hero-photo]", { autoAlpha: 0, scale: 0.94, y: 20, duration: 1.2, ease: "power3.out" }, 0.15)
          .from("[data-hero-item]", { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0.45);
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section id="home" ref={scope} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pt-24">
      {/* faint grid behind the hero */}
      <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />

      <div className="container-page relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-6">
        {/* ── Text ── */}
        <div data-scrub="hero-copy" className="order-2 lg:order-1">
          <p data-hero-hello className="text-lg text-accent">
            Hello, I’m
          </p>

          <h1
            data-hero-name
            className="mt-3 font-display text-[clamp(2.4rem,12.5vw,3.4rem)] leading-[0.95] font-bold tracking-[-0.04em] text-cream sm:text-7xl lg:text-[5.6rem]"
          >
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>

          <p
            data-hero-item
            className="mt-6 min-h-[2.6em] font-display text-2xl font-bold tracking-tight text-soft sm:min-h-[1.3em] sm:text-[2rem]"
            aria-label={`I’m ${article(word)} ${word}`}
          >
            I’m {article(word)} <span className="text-accent">{text}</span>
            <span aria-hidden className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[3px] bg-accent" />
          </p>

          <p data-hero-item className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            <Highlight text={profile.tagline} />
          </p>

          <div data-hero-item className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" data-magnetic="0.35" className="btn-primary">
              View my work
            </a>
            <a href="#contact" data-magnetic="0.3" className="btn-ghost">
              Let’s talk
            </a>
            <a href={asset(profile.resume)} target="_blank" rel="noopener noreferrer" data-magnetic="0.3" className="btn-ghost">
              Resume
            </a>
          </div>

          <div data-hero-item className="mt-8 flex items-center gap-3 text-sm text-muted">
            <span className="mr-1">Find me on</span>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-magnetic="0.45" className={iconBtn}>
              <SiGithub />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-magnetic="0.45" className={iconBtn}>
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* ── Portrait (hover = "read the source" code lens) ── */}
        <div data-scrub="hero-photo" className="relative order-1 lg:order-2">
          <div
            data-hero-photo
            // lifted on laptops so the visible face lines up with the text column's centre
            className="relative mx-auto w-full max-w-[300px] sm:max-w-[370px] lg:max-w-[430px] lg:-translate-y-[9%] xl:max-w-[470px]"
          >
            {/* soft brand glows behind the head */}
            <div aria-hidden className="absolute left-[15%] top-[14%] h-[50%] w-[70%] rounded-full bg-accent/[0.14] blur-[90px]" />
            <div aria-hidden className="absolute bottom-[14%] right-[4%] h-[42%] w-[55%] rounded-full bg-violet/[0.16] blur-[100px]" />

            <CodePortrait
              src={asset(profile.photo)}
              alt={`Portrait of ${profile.name}`}
              mask={PHOTO_MASK}
              className="relative h-[400px] sm:h-[490px] lg:h-[min(590px,76vh)] xl:h-[min(640px,76vh)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
