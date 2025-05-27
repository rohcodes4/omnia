import FooterBottom from "@/components/FooterBottom";
import { AudioProvider } from "@/components/podcast/AudioProvider";
import { AudioPlayer } from "@/components/podcast/player/AudioPlayer";

export default function SpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AudioProvider>
      {children}
      <FooterBottom />
      <div className="fixed inset-x-0 bottom-0 z-[100] lg:left-112 xl:left-120">
        <AudioPlayer />
      </div>
    </AudioProvider>
  );
}
