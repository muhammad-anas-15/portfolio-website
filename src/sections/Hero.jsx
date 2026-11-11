import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiDownload } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { profile } from "../data/portfolio";
import { asset, article } from "../lib/helpers";
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
  "radial-gradient(ellipse 52% 60% at 50% 45%, #000 55%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 14%)";

const iconBtn =
  "grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.02] text-lg text-soft transition hover:border-accent/60 hover:text-accent";

const Hero = () => {
  const { word, text } = useTypewriter(profile.roles);
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pt-24">
      {/* faint grid behind the hero */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />

      <div className="container-page relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        {/* ── Text ── */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-sm tracking-[0.2em] text-accent uppercase"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mt-4 font-display text-[3.4rem] leading-[0.95] font-bold tracking-[-0.04em] text-cream sm:text-7xl lg:text-[5.6rem]"
          >
            {profile.firstName}
            <br />
            {profile.lastName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-6 min-h-[2.6em] font-display text-2xl font-semibold tracking-tight text-soft sm:min-h-[1.3em] sm:text-[2rem]"
            aria-label={`I'm ${article(word)} ${word}`}
          >
            I'm {article(word)}{" "}
            <span className="text-gradient">{text}</span>
            <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[3px] animate-pulse bg-accent" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            <Highlight text={profile.tagline} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary">
              View My Work <FiArrowRight />
            </a>
            <a href="#contact" className="btn-ghost">
              Let's Talk <FiArrowUpRight />
            </a>
            <a href={asset(profile.resume)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Resume <FiDownload />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-8 flex items-center gap-4 text-sm text-muted"
          >
            <span>Find me on</span>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconBtn}>
              <SiGithub />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconBtn}>
              <FaLinkedinIn />
            </a>
          </motion.div>
        </div>

        {/* ── Portrait (hover = "read the source" code lens) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease }}
          // lifted on laptops so the visible face lines up with the text column's centre
          className="relative order-1 mx-auto w-full max-w-[300px] sm:max-w-[370px] lg:order-2 lg:max-w-[430px] lg:-translate-y-[9%] xl:max-w-[470px]"
        >
          {/* brand glows behind the head */}
          <div aria-hidden className="absolute left-[15%] top-[14%] h-[50%] w-[70%] rounded-full bg-accent/[0.16] blur-[90px]" />
          <div aria-hidden className="absolute bottom-[14%] right-[4%] h-[42%] w-[55%] rounded-full bg-violet/[0.18] blur-[100px]" />

          <CodePortrait
            src={asset(profile.photo)}
            alt={`Portrait of ${profile.name}`}
            mask={PHOTO_MASK}
            className="relative h-[400px] sm:h-[490px] lg:h-[min(590px,76vh)] xl:h-[min(640px,76vh)]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
