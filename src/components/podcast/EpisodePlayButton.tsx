"use client";

import { type Episode } from "@/lib/episodes";
import { useAudioPlayer } from "./AudioProvider";

export function EpisodePlayButton({
  episode,
  playing,
  paused,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  episode: Episode;
  playing: React.ReactNode;
  paused: React.ReactNode;
}) {
  const player = useAudioPlayer(episode);

  return (
    <button
      type="button"
      onClick={() => player.toggle()}
      aria-label={`${player.playing ? "Pause" : "Play"} episode ${
        episode.title
      }`}
      {...props}
    >
      {player.playing ? playing : paused}
    </button>
  );
}
