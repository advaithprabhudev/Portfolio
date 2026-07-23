import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { NotebookCard } from './components/ui/notebook-card';
import { Tape } from './components/ui/tape';
import { Pin } from './components/ui/pin';
import { Polaroid } from './components/ui/polaroid';
import { MarginDoodles } from './components/ui/margin-doodles';
import Floating, { FloatingElement } from './components/ui/parallax-floating';
import { ParallaxLayer, ScrollScene } from './components/ui/scroll-scene';
import { ScrollThread } from './components/ui/svg-follow-scroll';
import { BalatroBackground } from './components/ui/balatro-background';
import { MusicPlayer } from './components/ui/music-player';
import { Cube } from './components/ui/cube';

const LINK_CLASS =
  'font-mono text-xs font-semibold uppercase tracking-[0.15em] underline decoration-[var(--marker)] decoration-2 underline-offset-4 hover:text-[var(--marker)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--marker)] focus-visible:outline-offset-4 rounded-none';

export const MILESTONES = [
  {
    year: '2025-2026',
    title: 'Codeforces Competitive Programmer',
    desc: 'Applying data structures and algorithms in rated competitive programming contests.',
  },
  {
    year: '2025',
    title: 'International Business Olympiad: Higher Distinction',
    desc: 'Scored 256/300 in the International Business Olympiad.',
  },
  {
    year: '2025',
    title: 'Top 5, FedEx JA International Trade Challenge',
    desc: 'National finalist across 40+ teams in an international trade competition.',
  },
];

export const PROJECTS = [
  {
    id: '01',
    title: 'Collatz Monte Carlo',
    tags: 'Python · Random Walk · NumPy',
    desc: 'Monte Carlo modelling of Collatz parity vectors to probe stochastic convergence behaviour.',
    // TODO: replace with the real repo slug
    repoUrl: 'https://github.com/advaith-prabhu/collatz-monte-carlo',
    rotate: -3,
    depth: 1,
    pos: 'top-[2%] left-[2%]',
  },
  {
    id: '02',
    title: 'ML Momentum Strategies',
    tags: 'Python · ML · Statistical Modelling',
    desc: 'Sharpe ratio and max drawdown analysis on 15 NYSE equities using MLP-filtered momentum systems.',
    repoUrl: 'https://github.com/advaith-prabhu/ml-momentum-strategies',
    rotate: 2.5,
    depth: 2,
    pos: 'top-[0%] left-[52%]',
  },
  {
    id: '03',
    title: 'Honeypot',
    tags: 'Claude API · AI Systems · Security',
    desc: 'AI-powered penetration testing tool built for SME threat detection and automated vulnerability reporting.',
    repoUrl: 'https://github.com/advaith-prabhu/honeypot',
    rotate: 3,
    depth: 1.5,
    pos: 'top-[54%] left-[6%]',
  },
  {
    id: '04',
    title: 'Fourier Transformations',
    tags: 'NumPy · Python · Jupyter',
    desc: 'Empirical distribution analysis of Fourier transforms using spectral density functions.',
    repoUrl: 'https://github.com/advaith-prabhu/fourier-transformations',
    rotate: -2.5,
    depth: 1,
    pos: 'top-[56%] left-[54%]',
  },
];

const SKILLS = [
  { label: 'Languages', skills: ['Python', 'C++', 'JavaScript', 'LaTeX'] },
  {
    label: 'Frameworks & Libraries',
    skills: ['NumPy', 'Pandas', 'Scikit-learn', 'Framer Motion', 'React', 'Matplotlib'],
  },
  {
    label: 'Mathematics & Theory',
    skills: [
      'Markov Chains',
      'Monte Carlo Methods',
      'Stochastic Processes',
      'Information Theory',
      'Fourier Analysis',
      'Linear Algebra',
      'Probability Theory',
    ],
  },
  { label: 'Tools & Infra', skills: ['Git', 'GitHub', 'Jupyter', 'VS Code', 'Codeforces', 'LaTeX (Overleaf)'] },
];

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[var(--marker)]">
      № {n}: {children}
    </p>
  );
}

function ProjectCard({
  id,
  title,
  tags,
  desc,
  repoUrl,
  rotate,
  className = '',
}: {
  id: string;
  title: string;
  tags: string;
  desc: string;
  repoUrl: string;
  rotate: number;
  className?: string;
}) {
  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-[var(--paper)] text-[var(--paper-text)] border-[1.5px] border-[var(--paper-text)] p-5 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--marker)] focus-visible:outline-offset-4 ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, boxShadow: '6px 6px 0 rgba(14,13,12,0.9)' }}
    >
      <Tape className="-top-3 left-1/2 -translate-x-1/2 w-16" rotate={-3} color="rgba(255,75,46,0.35)" />
      <div
        className="h-32 w-full mb-4 border-[1.5px] border-[var(--paper-text)] bg-cover bg-center"
        style={{ backgroundImage: "url('https://placehold.co/480x300/0e0d0c/3a352c?text=preview')" }}
      />
      <div className="flex items-start gap-3">
        <span className="font-mono text-xs font-bold opacity-40">{id}</span>
        <div className="flex-1">
          <p className="font-mono font-bold text-base">{title}</p>
          <p className="font-mono text-[10px] uppercase tracking-wider opacity-50 mt-1">{tags}</p>
          <p className="font-mono text-xs leading-relaxed opacity-75 mt-2 line-clamp-2">{desc}</p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--marker-deep)] mt-3 group-hover:text-[var(--marker)]">
            View on GitHub ↗
          </p>
        </div>
      </div>
    </a>
  );
}

export default function App() {
  const threadOriginRef = useRef<HTMLSpanElement>(null);

  return (
    <main className="relative isolate">
      <BalatroBackground initialTheme="hero" />
      <MusicPlayer />

      <header className="sticky top-0 z-40 flex items-center justify-between px-[6vw] py-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink-text)]/80 bg-[var(--ink)]/85 backdrop-blur-sm border-b border-[var(--ink-text)]/10">
        <a href="/" className="font-semibold hover:text-[var(--marker)] transition-colors">Advaith Prabhu</a>
        <nav className="hidden sm:flex gap-6">
          <a href="#about" className="hover:text-[var(--marker)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--marker)] focus-visible:outline-offset-4">About</a>
          <a href="#work" className="hover:text-[var(--marker)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--marker)] focus-visible:outline-offset-4">Work</a>
          <a href="#contact" className="hover:text-[var(--marker)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--marker)] focus-visible:outline-offset-4">Contact</a>
        </nav>
      </header>

      <div className="relative overflow-hidden">
        <ScrollThread className="z-10" originRef={threadOriginRef} />

        {/* Hero */}
        <ScrollScene id="portfolio" data-balatro-theme="hero" className="relative min-h-[100dvh] flex flex-col justify-center px-[6vw] py-24 overflow-hidden scroll-mt-12">
          <div aria-hidden="true" className="paper-grain section-wash absolute inset-0 z-0" />
          <MarginDoodles tone="onLight" side="left" />
          <MarginDoodles tone="onLight" side="right" />

          <ParallaxLayer className="absolute top-24 left-[6vw] z-20" distance={14}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[var(--paper-text)]/50">
              Quant · CS · Markets
            </p>
          </ParallaxLayer>

          <div className="relative z-20 grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <ParallaxLayer className="flex flex-col gap-10" distance={30} scale={0.012}>
              <h1 className="font-display uppercase leading-[0.82] text-[clamp(3.2rem,11vw,9rem)] text-[var(--paper-text)]">
                Hi, I&rsquo;m
                <br />
                <span className="text-[var(--marker)]">Adva<span ref={threadOriginRef}>i</span>th.</span>
              </h1>

              <p className="font-mono max-w-md text-sm md:text-base leading-relaxed text-[var(--paper-text)]/80">
                <span className="text-[var(--marker)] font-semibold">Ever since</span> I started losing to a clock on
                Codeforces, I&rsquo;ve had a thing for systems that are exact until they aren&rsquo;t: stochastic
                processes, markets, and code.
                <br />
                <br />
                <span className="text-[var(--marker)] font-semibold">I build</span> at the intersection of
                mathematics and markets: quantitative CS student, competitive programmer, occasional
                trade-competition finalist.
              </p>
            </ParallaxLayer>

            <ParallaxLayer className="hidden md:flex items-center justify-center" distance={-38} rotate={0.7} scale={0.018}>
              <Cube
                size={280}
                perspective={900}
                rotateX={-24}
                rotateY={24}
                cubeColor="var(--paper)"
                borderColor="var(--paper-text)"
                borderWidth={2}
                borderRadius={4}
                faceColorFront="var(--marker)"
                faceColorBack="var(--marker-deep)"
              />
            </ParallaxLayer>
          </div>

        </ScrollScene>

        {/* About */}
        <ScrollScene id="about" data-balatro-theme="about" className="relative px-[6vw] py-[16vh] flex justify-center overflow-hidden scroll-mt-12">
          <div aria-hidden="true" className="paper-grain section-wash absolute inset-0 z-0" />
          <MarginDoodles tone="onLight" side="left" />
          <ParallaxLayer className="relative z-20 w-full max-w-3xl" distance={48} rotate={0.7} scale={0.018}>
            <Reveal>
              <NotebookCard rotate={-1.25} className="p-8 md:p-16">
              <Tape className="-top-3 left-10 w-24" rotate={-6} />
              <Tape className="-top-3 right-10 w-24" rotate={5} color="rgba(255,75,46,0.35)" />
              <p className="font-display text-2xl md:text-3xl uppercase text-[var(--marker)] mb-10">About Me</p>
              <div className="flex flex-col md:flex-row gap-10 md:gap-16">
                <Polaroid
                  src="https://placehold.co/320x320/17140f/f3ead9?text=ADVAITH"
                  alt="Portrait of Advaith Prabhu"
                  caption="advaith.jpg"
                  rotate={3}
                  className="mx-auto md:mx-0 shrink-0"
                />
                <div className="flex-1 space-y-5">
                  <p className="font-mono text-sm md:text-base leading-relaxed">
                    I&rsquo;m a quantitative CS student building at the intersection of mathematics and markets,
                    modelling stochastic processes for fun, competing on Codeforces for the adrenaline, and
                    occasionally finishing near the top of international trade &amp; business competitions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider border-[1.5px] border-[var(--paper-text)] px-2 py-1">
                      Status: Online
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider border-[1.5px] border-[var(--paper-text)] px-2 py-1">
                      Focus: Quant Research
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                    <a href="https://linkedin.com/in/advaith-prabhu" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                      LinkedIn
                    </a>
                    <a href="https://github.com/advaith-prabhu" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                      GitHub
                    </a>
                    <a href="mailto:darsanaarun.sg@gmail.com" className={LINK_CLASS}>
                      Email
                    </a>
                  </div>
                </div>
              </div>
              </NotebookCard>
            </Reveal>
          </ParallaxLayer>
        </ScrollScene>

        {/* Career Milestones */}
        <ScrollScene id="career" data-balatro-theme="career" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-[6vw] py-[10vh] overflow-hidden scroll-mt-12">
          <div aria-hidden="true" className="paper-grain section-wash absolute inset-0 z-0" />
          <MarginDoodles tone="onLight" side="right" />
          <div className="relative z-20 w-full max-w-3xl">
            <ParallaxLayer distance={24}>
              <SectionLabel n="02">Career Milestones</SectionLabel>
              <h2 className="font-display uppercase leading-[0.85] text-[clamp(2.6rem,8vw,6rem)] text-[var(--paper-text)] mt-4 mb-12">
                Career
                <br />
                Milestones
              </h2>
            </ParallaxLayer>
            <div className="flex flex-col gap-8 max-w-3xl">
              {MILESTONES.map(({ year, title, desc }, i) => (
                <ParallaxLayer key={title} distance={36 + i * 12} rotate={i % 2 === 0 ? 0.25 : -0.25}>
                  <Reveal delay={i * 0.08}>
                    <div
                      className="relative bg-[var(--paper)] text-[var(--paper-text)] border-[1.5px] border-[var(--paper-text)] px-6 py-5"
                      style={{
                        transform: `rotate(${i % 2 === 0 ? -0.75 : 0.75}deg)`,
                        boxShadow: '5px 5px 0 rgba(14,13,12,0.9)',
                      }}
                    >
                      <Pin className="-top-3 left-6" />
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--marker-deep)]">
                        {year}
                      </p>
                      <p className="font-mono font-bold text-base md:text-lg mt-1">{title}</p>
                      <p className="font-mono text-sm leading-relaxed opacity-70 mt-2">{desc}</p>
                    </div>
                  </Reveal>
                </ParallaxLayer>
              ))}
            </div>
          </div>
        </ScrollScene>

        {/* Projects */}
        <ScrollScene id="work" data-balatro-theme="projects" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-[6vw] py-[10vh] overflow-hidden scroll-mt-12">
          <div aria-hidden="true" className="paper-grain section-wash absolute inset-0 z-0" />
          <MarginDoodles tone="onLight" side="left" />
          <div className="relative z-20 w-full max-w-5xl">
            <ParallaxLayer distance={22}>
              <SectionLabel n="03">Selected Projects</SectionLabel>
              <h2 className="font-display uppercase leading-[0.85] text-[clamp(2.6rem,8vw,6rem)] text-[var(--paper-text)] mt-4 mb-4">
                Selected
                <br />
                Projects
              </h2>
              <p className="hidden md:block font-mono text-xs uppercase tracking-wider text-[var(--paper-text)]/40 mb-10">
                Move your cursor. Each card links out to its GitHub repo
              </p>
            </ParallaxLayer>

            {/* Mobile: stacked list. The scattered layout below needs room to spread out. */}
            <ParallaxLayer className="flex flex-col gap-10 md:hidden" distance={38}>
              {PROJECTS.map((project, i) => (
                <Reveal key={project.title} delay={i * 0.06}>
                  <ProjectCard {...project} />
                </Reveal>
              ))}
            </ParallaxLayer>

            {/* Desktop: mouse-parallax scattered gallery */}
            <ParallaxLayer className="relative hidden md:block h-[680px] lg:h-[760px]" distance={54} scale={0.01}>
              <Floating sensitivity={0.6} className="overflow-visible">
                {PROJECTS.map(({ pos, depth, ...project }, i) => (
                  <FloatingElement key={project.title} depth={depth} className={pos}>
                    <Reveal delay={i * 0.06}>
                      <ProjectCard {...project} className="w-[280px]" />
                    </Reveal>
                  </FloatingElement>
                ))}
              </Floating>
            </ParallaxLayer>
          </div>
        </ScrollScene>

        {/* Skills */}
        <ScrollScene data-balatro-theme="skills" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-[6vw] py-[10vh] overflow-hidden">
          <div aria-hidden="true" className="paper-grain section-wash absolute inset-0 z-0" />
          <MarginDoodles tone="onLight" side="right" />
          <div className="relative z-20 w-full max-w-4xl">
            <ParallaxLayer distance={22}>
              <SectionLabel n="04">Skills &amp; Tools</SectionLabel>
              <h2 className="font-display uppercase leading-[0.85] text-[clamp(2.6rem,8vw,6rem)] text-[var(--paper-text)] mt-4 mb-14">
                The
                <br />
                Stack
              </h2>
            </ParallaxLayer>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl items-start">
              {SKILLS.map(({ label, skills }, i) => (
                <ParallaxLayer key={label} distance={32 + (i % 2) * 18} rotate={i % 2 === 0 ? 0.2 : -0.2}>
                  <Reveal delay={i * 0.06}>
                    <span className="inline-block font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--ink)] bg-[var(--marker)] px-3 py-1 mb-4">
                      {label}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-xs text-[var(--paper-text)]/80 border-[1.5px] border-[var(--paper-text)]/25 px-3 py-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </ParallaxLayer>
              ))}
            </div>
          </div>
        </ScrollScene>

        {/* Contact */}
        <ScrollScene id="contact" data-balatro-theme="contact" className="relative px-[6vw] py-[10vh] flex justify-center overflow-hidden scroll-mt-12">
          <div aria-hidden="true" className="paper-grain section-wash absolute inset-0 z-0" />
          <MarginDoodles tone="onLight" side="left" />
          <MarginDoodles tone="onLight" side="right" />
          <div className="relative z-20 w-full max-w-3xl">
            <ParallaxLayer distance={20}>
              <SectionLabel n="05">Get In Touch</SectionLabel>
              <h2 className="font-display uppercase leading-[0.85] text-[clamp(2.6rem,9vw,7rem)] text-[var(--paper-text)] mt-4 mb-12">
                Let&rsquo;s
                <br />
                Work Together
              </h2>
            </ParallaxLayer>

            <ParallaxLayer distance={46} rotate={-0.6} scale={0.015}>
              <Reveal>
                <NotebookCard rotate={1} ruled className="p-6 md:p-10">
                <Tape className="-top-3 left-8 w-24" rotate={-5} />
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--marker-deep)] mb-4">
                  What I&rsquo;m looking for
                </p>
                <ul className="font-mono text-sm space-y-2 mb-8">
                  <li>Research collaborations in quant / applied math</li>
                  <li>Quant &amp; software internships</li>
                  <li>Genuinely interesting problems</li>
                </ul>

                <div className="flex flex-wrap gap-x-8 gap-y-3 border-t-[1.5px] border-[var(--paper-text)]/20 pt-6">
                  <a href="https://linkedin.com/in/advaith-prabhu" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    LinkedIn
                  </a>
                  <a href="https://github.com/advaith-prabhu" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    GitHub
                  </a>
                  <a href="mailto:darsanaarun.sg@gmail.com" className={LINK_CLASS}>
                    Email
                  </a>
                  {/* TODO: replace placeholder href with real résumé PDF link */}
                  <a href="#resume" className={LINK_CLASS}>
                    Résumé
                  </a>
                </div>
                </NotebookCard>
              </Reveal>
            </ParallaxLayer>

            <p className="font-mono text-[11px] text-[var(--paper-text)]/40 mt-10">© 2026 Advaith Prabhu.</p>
          </div>
        </ScrollScene>
      </div>
    </main>
  );
}
