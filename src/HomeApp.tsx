import { BalatroBackground } from './components/ui/balatro-background';
import { MusicPlayer } from './components/ui/music-player';
import { TitleScreen } from './components/ui/title-screen';

export default function HomeApp() {
  return (
    <main className="relative isolate min-h-[100dvh] overflow-hidden">
      <BalatroBackground initialTheme="menu" />
      <MusicPlayer />
      <TitleScreen />
    </main>
  );
}
