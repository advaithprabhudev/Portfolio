import FlowArt, { FlowSection } from './components/ui/story-scroll';
import { LiquidCursor } from './components/ui/liquid-cursor';
import { SpecialText } from './components/ui/special-text';
import DelicateAsciiDots from './components/ui/delicate-ascii-dots';
import { TiltCard } from './components/ui/tilt-card';
import { InfiniteSlider } from './components/ui/infinite-slider';


export default function App() {
  return (
    <>
    <LiquidCursor />
    <FlowArt aria-label="Advaith Prabhu Portfolio">
      {/* Hero */}
      <FlowSection
        aria-label="Introduction"
        style={{ backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }}
      >
        <div>
          <p className="riso-headline font-mono text-sm font-bold uppercase tracking-[0.2em] opacity-60 mb-3">№ 01 — Introduction</p>
          <h1 className="riso-headline font-display text-[clamp(3rem,9vw,6rem)] font-extrabold leading-[0.85] uppercase tracking-tight text-balance">
            <SpecialText className="font-display text-[clamp(3rem,9vw,6rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
              Advaith
            </SpecialText>
            <br />
            <SpecialText
              className="font-display text-[clamp(3rem,9vw,6rem)] font-extrabold leading-[0.85] uppercase tracking-tight"
              delay={0.3}
            >
              Prabhu
            </SpecialText>
          </h1>
        </div>
        <hr className="border-t-2 border-dashed border-black/15" />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,1.75rem)] font-normal leading-relaxed opacity-70">
          Quantitative CS student building at the intersection of mathematics and markets
        </p>
        <InfiniteSlider gap={48} duration={30} durationOnHover={80} className="border-t-2 border-dashed border-black/15 pt-6 mt-2">
          {['QUANT', 'CS', 'MATH', 'MARKETS', 'ALGORITHMS', 'DATA'].map((word) => (
            <span
              key={word}
              className="riso-headline font-mono text-sm font-bold uppercase tracking-[0.2em] opacity-40 whitespace-nowrap"
            >
              {word}
            </span>
          ))}
        </InfiniteSlider>
        {/* Right column animated ASCII dots */}
        <div aria-hidden="true" className="hidden lg:block absolute right-0 top-0 h-full w-[40rem] overflow-hidden pointer-events-none">
          <DelicateAsciiDots
            backgroundColor="#F2E9D8"
            textColor="0, 131, 138"
            gridSize={60}
            animationSpeed={0.5}
          />
        </div>
      </FlowSection>

      {/* Internships & Awards */}
      <FlowSection
        aria-label="Internships & Awards"
        style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}
      >
        <div>
          <p className="riso-headline font-mono text-sm font-bold uppercase tracking-[0.2em] opacity-60 mb-3">№ 02 — Career Milestones</p>
          <h2 className="riso-headline font-display text-[clamp(2.5rem,6.5vw,4.5rem)] font-bold leading-[0.85] uppercase tracking-tight text-balance">
            Career
            <br />
            Milestones
          </h2>
        </div>
        <hr className="border-t-2 border-dashed border-white/15" />
        <div className="space-y-8 max-w-2xl">
          {[
            {
              year: '2025–2026',
              title: 'Codeforces Competitive Programmer',
              desc: 'Applying data structures and algorithms in rated competitive programming contests',
            },
            {
              year: '2025',
              title: 'International Business Olympiad — Higher Distinction',
              desc: 'Scored 256/300 in the International Business Olympiad',
            },
            {
              year: '2025',
              title: 'Top 5 — FedEx JA International Trade Challenge',
              desc: 'National finalist across 40+ teams in international trade competition',
            },
          ].map(({ year, title, desc }) => (
            <div key={title} className="border-t border-white/20 pt-6">
              <p className="font-mono text-sm font-bold uppercase tracking-wider opacity-70">{year}</p>
              <p className="font-mono text-[clamp(1rem,2.5vw,1.75rem)] font-bold mt-2">{title}</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-60 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </FlowSection>

      {/* Open Positions */}
      <FlowSection
        aria-label="Open Positions"
        style={{ backgroundColor: '#EFECE3', color: '#14120F' }}
      >
        <div>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            <span style={{ color: '#D93B1F' }}>№ 03</span> — Open Positions
          </p>
          <h2
            style={{ fontFamily: "'Anton', sans-serif" }}
            className="text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.9] uppercase tracking-tight text-balance"
          >
            Open <span style={{ color: '#D93B1F' }}>Positions</span>
          </h2>
        </div>
        <hr style={{ borderColor: 'rgba(20,18,15,.16)' }} className="border-t-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
          {[
            {
              ticker: '▲ CLZ',
              up: true,
              title: 'Collatz Monte Carlo',
              tags: 'Python · Random Walk · NumPy',
              desc: 'Monte Carlo modelling of Collatz parity vectors to probe stochastic convergence behaviour',
              url: 'https://github.com/advaithprabhudev/Distributions-Collatz-Map-Monte-Carlo',
            },
            {
              ticker: '▲ MOM',
              up: true,
              title: 'ML Momentum Strategies',
              tags: 'Python · ML · Statistical Modelling',
              desc: 'Sharpe ratio and max drawdown analysis on 15 NYSE equities using MLP-filtered momentum systems',
              url: 'https://github.com/advaithprabhudev/Momentum-Research-Project',
            },
            {
              ticker: '▼ HNY',
              up: false,
              title: 'Honeypot',
              tags: 'Claude API · AI Systems · Security',
              desc: 'AI-powered penetration testing tool built for SME threat detection and automated vulnerability reporting',
              url: 'https://github.com/advaithprabhudev/HoneyPot-Wars',
            },
            {
              ticker: '▲ FFT',
              up: true,
              title: 'Fourier Transformations',
              tags: 'NumPy · Python · Jupyter',
              desc: 'Empirical distribution analysis of Fourier transforms using spectral density functions',
              url: 'https://github.com/advaithprabhudev/Fourier-Transformations-using-Spectral-PDE',
            },
          ].map(({ ticker, up, title, tags, desc, url }) => (
            <a
              key={title}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-square focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              <TiltCard
                tiltLimit={10}
                scale={1.03}
                className="w-full h-full flex flex-col justify-between p-6 border-2"
                style={{ backgroundColor: '#EFECE3', borderColor: '#14120F', color: '#14120F' }}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: up ? '#0E7B4F' : '#D93B1F' }}
                    className="text-xs font-semibold"
                  >
                    {ticker}
                  </span>
                  <span aria-hidden="true" className="text-sm opacity-60">↗</span>
                </div>
                <div>
                  <h3
                    style={{ fontFamily: "'Anton', sans-serif" }}
                    className="text-[clamp(1.25rem,3vw,1.8rem)] uppercase leading-[1.05] mb-3"
                  >
                    {title}
                  </h3>
                  <p
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-2 opacity-80"
                  >
                    {tags}
                  </p>
                  <p className="text-sm leading-relaxed opacity-70">{desc}</p>
                </div>
              </TiltCard>
            </a>
          ))}
        </div>
      </FlowSection>

      {/* Skills */}
      <FlowSection
        aria-label="Skills"
        style={{ backgroundColor: 'var(--color-electric)', color: 'var(--color-white)' }}
      >
        <div>
          <p className="riso-headline font-mono text-sm font-bold uppercase tracking-[0.2em] opacity-60 mb-3">№ 04 — The Stack</p>
          <h2 className="riso-headline font-display text-[clamp(2.5rem,6.5vw,4.5rem)] font-bold leading-[0.85] uppercase tracking-tight text-balance">
            The
            <br />
            Stack
          </h2>
        </div>
        <hr className="border-t-2 border-dashed border-white/20" />
        <div className="flex flex-wrap gap-[3vw] max-w-4xl">
          {[
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
            {
              label: 'Tools & Infra',
              skills: ['Git', 'GitHub', 'Jupyter', 'VS Code', 'Codeforces', 'LaTeX (Overleaf)'],
            },
          ].map(({ label, skills }) => (
            <div key={label} className="min-w-[200px] flex-1">
              <p className="font-mono mb-4 text-sm font-bold uppercase tracking-wider">{label}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="font-mono px-3 py-1 bg-white/10 border border-white/30 rounded-sm text-[clamp(0.75rem,1vw,0.9rem)] opacity-90">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FlowSection>

      {/* Contact */}
      <FlowSection
        aria-label="Contact"
        style={{ backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }}
      >
        <div>
          <p className="riso-headline font-mono text-sm font-bold uppercase tracking-[0.2em] opacity-60 mb-3">№ 05 — Contact</p>
          <h2 className="riso-headline font-display text-[clamp(2.5rem,6.5vw,4.5rem)] font-bold leading-[0.85] uppercase tracking-tight text-balance">
            Let&apos;s
            <br />
            Work
            <br />
            Together
          </h2>
        </div>
        <hr className="border-t-2 border-dashed border-black/15" />
        <div className="mt-auto space-y-6">
          <div className="flex gap-2 items-center justify-start flex-wrap text-[clamp(0.85rem,1.3vw,1.05rem)]">
            <a href="https://www.linkedin.com/in/advaith-prabhu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 -mx-3 rounded-sm border-2 border-black/15 hover:opacity-70 hover:border-black/30 transition-opacity font-mono font-bold uppercase tracking-wider text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/advaithprabhudev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-sm border-2 border-black/15 hover:opacity-70 hover:border-black/30 transition-opacity font-mono font-bold uppercase tracking-wider text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href="mailto:prabhu.advaith@gmail.com" className="flex items-center gap-2 px-4 py-3 rounded-sm border-2 border-black/15 hover:opacity-70 hover:border-black/30 transition-opacity font-mono font-bold uppercase tracking-wider text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
              Gmail
            </a>
            <a href="https://drive.google.com/file/d/1nyxTBXBHIcHWc5BM2fyn7qPtwoEWzp4K/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-sm border-2 border-black/15 hover:opacity-70 hover:border-black/30 transition-opacity font-mono font-bold uppercase tracking-wider text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/></svg>
              Résumé
            </a>
          </div>
          <p className="text-xs opacity-70">© 2025 Advaith Prabhu. Built with React &amp; Framer Motion.</p>
        </div>
      </FlowSection>
    </FlowArt>
    </>
  );
}
