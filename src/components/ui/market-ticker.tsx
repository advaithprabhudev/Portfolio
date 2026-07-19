import { MILESTONES, PROJECTS } from '../../App';

const TICKERS = [
  { symbol: 'WORK', label: 'Projects shipped', value: PROJECTS.length, href: '/portfolio/#work' },
  { symbol: 'CAREER', label: 'Milestones hit', value: MILESTONES.length, href: '/portfolio/#career' },
];

export function MarketTicker() {
  return (
    <div className="market-ticker" role="group" aria-label="Portfolio stats">
      {TICKERS.map(({ symbol, label, value, href }) => (
        <a key={symbol} href={href} className="market-ticker__item" aria-label={`${label}: ${value}. Go to ${symbol.toLowerCase()} section`}>
          <span className="market-ticker__symbol">{symbol}</span>
          <span className="market-ticker__price">{value}</span>
          <span className="market-ticker__change" aria-hidden="true">
            ▲ {value}
          </span>
        </a>
      ))}
    </div>
  );
}
