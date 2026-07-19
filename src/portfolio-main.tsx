import { StrictMode, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

function PortfolioEntry() {
  useLayoutEffect(() => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    const rootStyle = document.documentElement.style;
    const previousScrollBehavior = rootStyle.scrollBehavior;
    rootStyle.scrollBehavior = 'auto';
    target.scrollIntoView({ block: 'start' });

    const frame = requestAnimationFrame(() => {
      rootStyle.scrollBehavior = previousScrollBehavior;
    });

    return () => {
      cancelAnimationFrame(frame);
      rootStyle.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioEntry />
  </StrictMode>,
);
