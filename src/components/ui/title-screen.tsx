import { MarketTicker } from './market-ticker';

export function TitleScreen() {
  return (
    <section
      id="home"
      data-balatro-theme="menu"
      className="title-screen min-h-[100dvh]"
      aria-labelledby="title-screen-name"
    >
      <div className="title-screen__vignette" aria-hidden="true" />
      <div className="title-screen__content">
        <h1 id="title-screen-name" className="title-screen__logo" aria-label="Advaith">
          <span className="title-screen__name">Adv</span>
          <span className="title-screen__card" aria-hidden="true">
            <span className="title-screen__card-corner">A<br />♠</span>
            <span className="title-screen__card-suit">♠</span>
            <span className="title-screen__card-corner title-screen__card-corner--bottom">A<br />♠</span>
          </span>
          <span className="title-screen__name">ith</span>
        </h1>

        <nav className="title-screen__menu" aria-label="Portfolio menu">
          <a className="title-screen__button title-screen__button--play" href="/portfolio/">
            Play
          </a>
          <a className="title-screen__button title-screen__button--contact" href="/portfolio/#contact">
            Contact Me
          </a>
        </nav>

        <MarketTicker />
      </div>
    </section>
  );
}
