import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight, Check, Coins, Copy, Menu, Rocket, Shield, Sparkles, X } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  ["Story", "#story"],
  ["Token", "#token"],
  ["Fan Art", "#fan-art"],
  ["Links", "#links"],
];

const fanArt = [
  "/assets/baby-mame-surf-new.png",
  "/assets/baby-mame-temple.png",
  "/assets/baby-mame-candles.png",
  "/assets/baby-mame-chef.png",
  "/assets/baby-mame-trader.png",
  "/assets/baby-mame-moon-plan.png",
  "/assets/baby-mame-buy-dip.png",
  "/assets/baby-mame-room.png",
  "/assets/babybnb-yacht.png",
  "/assets/babybnb-park.png",
  "/assets/babybnb-mountain.png",
  "/assets/babybnb-sunset.png",
  "/assets/babybnb-city-flight.png",
];

const panels = [
  { title: "MAME City Blackout", copy: "MAME City loses all its power and falls into chaos." },
  { title: "The Golden Beacon", copy: "Baby MAME reaches the Golden Beacon just in time, restores the city's energy, and saves everyone." },
  { title: "Save OG Meme Culture", copy: "This is exactly how MAME will also save OG meme culture on BSC." },
];

const contractAddress = "0x8053432430A9E0171271bA785716f23DD2fa6666";
const buyUrl = "https://pancakeswap.finance/swap?outputCurrency=0x8053432430a9e0171271ba785716f23dd2fa6666&chainId=56&inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.85 });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="loader"
      animate={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      aria-hidden={done}
    >
      <img src="/assets/babybnb-logo.png" alt="" />
      <h2>BABY MAME</h2>
      <span>loading meme waves...</span>
    </motion.div>
  );
}

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 130, damping: 22 });
  const sy = useSpring(y, { stiffness: 130, damping: 22 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 18);
      y.set(event.clientY - 18);
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />;
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header className="navbar" initial={{ y: -90 }} animate={{ y: 0 }} transition={{ delay: 1.2, type: "spring", stiffness: 90 }}>
      <a href="#top" className="logo" aria-label="Baby Mame home">
        <img src="/assets/babybnb-logo.png" alt="Baby Mame logo" />
      </a>
      <nav>
        {navItems.map(([label, href]) => (
          <a key={label} href={href}>{label}</a>
        ))}
      </nav>
      <a className="buy-button" href={buyUrl} target="_blank" rel="noreferrer">Buy MAME <Coins size={18} /></a>
      <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <motion.div className="mobile-nav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href={buyUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Buy MAME</a>
        </motion.div>
      )}
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <div className="hero-parallax">
          <img src="/assets/babybnb-surf.png" alt="Baby Mame surfing a giant wave" />
        </div>
      </div>
      <div className="sunburst" />
      <div className="wave-lines" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55, duration: 0.8 }}>
        <span className="sticker">Continue the legacy</span>
        <h1>BABY<br />MAME</h1>
        <p>3% reflections in $Mame</p>
        <div className="hero-actions">
          <a href={buyUrl} target="_blank" rel="noreferrer" className="comic-btn primary">Buy MAME <ArrowUpRight size={22} /></a>
          <a href="#story" className="comic-btn dark">Read Story</a>
        </div>
      </motion.div>
      <motion.div className="hero-card card-one" animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }} transition={{ duration: 4.5, repeat: Infinity }}>
        <Sparkles size={20} />
        <strong>Save</strong>
        <span>OG meme culture</span>
      </motion.div>
      <motion.div className="hero-card card-two" animate={{ y: [0, 18, 0], rotate: [3, -2, 3] }} transition={{ duration: 5.2, repeat: Infinity }}>
        <Rocket size={20} />
        <strong>FIRST PUP</strong>
        <span>Of the last Shiba</span>
      </motion.div>
      
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee">
      <div>
        {Array.from({ length: 10 }).map((_, index) => <span key={index}>SAVE OG MEME CULTURE</span>)}
      </div>
      <div>
        {Array.from({ length: 10 }).map((_, index) => <span key={index}>SAVE OG MEME CULTURE</span>)}
      </div>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Story() {
  return (
    <section className="story section" id="story">
      <Reveal className="section-title">
        <span>THE STORY</span>
        <h2>From tiny paws to giant waves.</h2>
      </Reveal>
      <div className="story-grid">
        <Reveal className="story-frame">
          <video
            src="/assets/video-2026.mp4"
            poster="/assets/babybnb-city-flight.png"
            controls
            playsInline
            preload="metadata"
            aria-label="Baby Mame story video"
          />
        </Reveal>
        <div className="story-copy">
          {panels.map((item, index) => (
            <Reveal className="comic-panel" delay={index * 0.08} key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Token() {
  const [copied, setCopied] = useState(false);

  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="token section" id="token">
      <Reveal className="section-title center">
        <span>TOKEN</span>
        
        <h2>Simple, loud, community-first.</h2>
      </Reveal>
      <div className="token-grid">
        {[
          ["Supply", "420T", "Clean meme math for everyone."],
          ["Tax", "3/3", "3% reflection in $MAME"],
          ["Chain", "BNB", "Fast, familiar, secure"],
          ["LP", "Locked", "Built for trust and chaos control."],
        ].map(([label, value, copy], index) => (
          <Reveal className="token-card" delay={index * 0.06} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{copy}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="contract-card">
        <span>CA</span>
        <code>{contractAddress}</code>
        <button type="button" onClick={copyContract} aria-label="Copy contract address">
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </Reveal>
    </section>
  );
}

function FanArt() {
  const topRail = [...fanArt, ...fanArt];
  const bottomRail = [...fanArt.slice().reverse(), ...fanArt.slice().reverse()];
  const featuredArts = fanArt.slice(0, 6);

  return (
    <section className="fan section" id="fan-art">
      <div className="fan-rail fan-rail-top" aria-hidden="true">
        <div className="fan-track">
          {topRail.map((src, index) => (
            <figure className="fan-frame" key={`top-${src}-${index}`}>
              <img src={src} alt="" loading="lazy" />
            </figure>
          ))}
        </div>
      </div>

      <div className="fan-hero-card fan-hero-card-clean">
        <Reveal className="fan-copy">
          <span>FAN ART</span>
          <h2>Our Some Arts</h2>
          <p>Baby Mame surfing, cooking, plotting the moon, buying the dip, and lighting up every green candle.</p>
        </Reveal>
        <div className="fan-collage" aria-label="Baby Mame art gallery">
          {featuredArts.map((src, index) => (
            <motion.figure
              className={`fan-collage-card fan-collage-card-${index + 1}`}
              key={`featured-${src}`}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? -2 : 2, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <img src={src} alt={`Baby Mame artwork ${index + 1}`} loading="lazy" />
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="fan-rail fan-rail-bottom" aria-hidden="true">
        <div className="fan-track reverse">
          {bottomRail.map((src, index) => (
            <figure className="fan-frame" key={`bottom-${src}-${index}`}>
              <img src={src} alt="" loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Links() {
  return (
    <section className="links section" id="links">
      <div className="links-bg">
        <img src="/assets/babybnb-black.png" alt="Baby Mame with golden pacifier and BNB tag" />
      </div>
      <Reveal className="links-copy">
        <span className="sticker">Where legendary memes never die</span>
        <h2>DIE</h2>
      </Reveal>
      <div className="link-stack">
        {[
          { label: "Dexscreener", href: "https://dexscreener.com/bsc/0x44628fa4d474f302bb7121aff27962119c8a8313" },
          { label: "X (Twitter)", href: "https://x.com/Baby_Mame_Bnb" },
          { label: "Telegram", href: "https://t.me/BabyMame_BNB" },
        ].map((item, index) => (
          <Reveal delay={index * 0.06} key={item.label}>
            <a href={item.href} target={item.href === "#" ? undefined : "_blank"} rel={item.href === "#" ? undefined : "noreferrer"} className={index === 2 ? "blue" : ""}>
              <Shield size={22} />
              {item.label}
              <ArrowUpRight size={22} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <img src="/assets/babybnb-logo.png" alt="" />
      <span>2026 Baby Mame. Meme coin landing concept. DYOR.</span>
    </footer>
  );
}

export default function App() {
  useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-parallax", {
        yPercent: 0.5,
        ease: "none",
        force3D: true,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.35 },
      });
      gsap.to(".fan-rail-top", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ".fan", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".fan-rail-bottom", {
        xPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".fan", start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Loader />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Token />
        <FanArt />
        <Links />
      </main>
      <Footer />
    </>
  );
}
