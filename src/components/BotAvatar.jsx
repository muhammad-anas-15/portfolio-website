import { motion } from "framer-motion";

/**
 * Animated assistant avatar (pure SVG + framer-motion), drawn in theme tokens.
 * mood: "idle"     bobbing, blinking, glancing around
 *       "thinking" eyes scan left and right, the mouth becomes bouncing dots
 */
const BotAvatar = ({ size = 40, mood = "idle", ring = true }) => {
  const thinking = mood === "thinking";

  return (
    <span className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      {ring && (
        <span
          aria-hidden
          className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-accent/70 [animation-duration:8s]"
        />
      )}
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="relative">
        <circle cx="32" cy="32" r={ring ? 28 : 32} className="fill-card-2" />

        <motion.g
          animate={{ y: thinking ? [0, -1, 0] : [0, -1.8, 0] }}
          transition={{ duration: thinking ? 0.8 : 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* antenna */}
          <line x1="32" y1="19" x2="32" y2="12" className="stroke-accent" strokeWidth="2" strokeLinecap="round" />
          <motion.circle
            cx="32"
            cy="10.5"
            r="2.8"
            className="fill-accent-bright"
            animate={{ opacity: [1, 0.35, 1], scale: thinking ? [1, 1.3, 1] : 1 }}
            transition={{ duration: thinking ? 0.6 : 1.8, repeat: Infinity }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />

          {/* head */}
          <rect x="13" y="19" width="38" height="31" rx="12" className="fill-panel stroke-accent" strokeWidth="1.6" />
          {/* ears */}
          <rect x="9.5" y="29" width="4" height="10" rx="2" className="fill-accent" />
          <rect x="50.5" y="29" width="4" height="10" rx="2" className="fill-accent" />

          {/* eyes */}
          <motion.g
            animate={{ x: thinking ? [-2.5, 2.5, -2.5] : [0, 0, 2, 2, 0, -2, -2, 0] }}
            transition={{ duration: thinking ? 1.1 : 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "blink 4.2s infinite" }}>
              <rect x="22" y="28" width="6" height="9" rx="3" className="fill-accent-bright" />
              <rect x="36" y="28" width="6" height="9" rx="3" className="fill-accent-bright" />
            </g>
          </motion.g>

          {/* cheeks */}
          <circle cx="19.5" cy="40" r="2" className="fill-violet" opacity="0.6" />
          <circle cx="44.5" cy="40" r="2" className="fill-violet" opacity="0.6" />

          {/* mouth */}
          {thinking ? (
            [26.5, 32, 37.5].map((cx, i) => (
              <motion.circle
                key={cx}
                cx={cx}
                cy="43"
                r="1.7"
                className="fill-accent"
                animate={{ y: [0, -2.5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))
          ) : (
            <path d="M26 42 Q32 47 38 42" fill="none" className="stroke-accent" strokeWidth="2" strokeLinecap="round" />
          )}
        </motion.g>
      </svg>
    </span>
  );
};

export default BotAvatar;
