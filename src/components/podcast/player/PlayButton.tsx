import { type PlayerAPI } from "../AudioProvider";
import { PauseIcon } from "../PauseIcon";
import { PlayIcon } from "../PlayIcon";

export function PlayButton({ player }: { player: PlayerAPI }) {
  const Icon = player.playing ? PauseIcon : PlayIcon;

  return (
    <button
      type="button"
      className="group relative flex h-4 w-4 flex-shrink-0 items-center justify-center "
      onClick={() => player.toggle()}
      aria-label={player.playing ? "Pause" : "Play"}
    >
      <div className="absolute -inset-3 md:hidden" />
      <Icon className="h-4 w-4 fill-[#638BEF] group-active:fill-white/80 md:h-7 md:w-7" />
    </button>
  );
}
