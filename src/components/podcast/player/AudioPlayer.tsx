"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { ForwardButton } from "./ForwardButton";
import { MuteButton } from "./MuteButton";
import { PlaybackRateButton } from "./PlaybackRateButton";
import { PlayButton } from "./PlayButton";
import { RewindButton } from "./RewindButton";
import { Slider } from "./Slider";
import { useAudioPlayer } from "../AudioProvider";

function parseTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  return [hours, minutes, seconds];
}

function formatHumanTime(seconds: number) {
  const [h, m, s] = parseTime(seconds);
  return `${h} hour${h === 1 ? "" : "s"}, ${m} minute${
    m === 1 ? "" : "s"
  }, ${s} second${s === 1 ? "" : "s"}`;
}

export function AudioPlayer() {
  const player = useAudioPlayer();
  const wasPlayingRef = useRef(false);
  const [currentTime, setCurrentTime] = useState<number | null>(
    player.currentTime
  );

  useEffect(() => {
    setCurrentTime(null);
  }, [player.currentTime]);

  if (!player.episode) {
    return null;
  }

  return (
    <div className="flex  items-center gap-6 bg-[#111111] dark:bg-[#111111] px-4 py-4 shadow  backdrop-blur-sm  md:px-6">
      <div className="mb-[env(safe-area-inset-bottom)] flex max-w-[1240px] mx-auto flex-1 flex-col gap-3 overflow-hidden p-1">
        <Link
          href={`/space/${player.episode.id}`}
          className="truncate text-center text-sm font-source-code-pro text-[16px] leading-6 font-bold text-slate-900 dark:text-white md:text-left"
          title={player.episode.title}
        >
          {player.episode.title}
        </Link>
        <div className="flex justify-between items-center gap-6">
          <div className="hidden md:block">
            <PlayButton player={player} />
          </div>
          <div className="flex items-center md:hidden">
            <MuteButton player={player} />
          </div>
          <div className="flex flex-none items-center gap-4">
            <RewindButton player={player} />
            <div className="md:hidden">
              <PlayButton player={player} />
            </div>
            <ForwardButton player={player} />
          </div>
          <Slider
            label="Current time"
            maxValue={player.duration}
            step={1}
            value={[currentTime ?? player.currentTime]}
            onChange={([value]) => setCurrentTime(value)}
            onChangeEnd={([value]) => {
              player.seek(value);
              if (wasPlayingRef.current) {
                player.play();
              }
            }}
            numberFormatter={{ format: formatHumanTime } as Intl.NumberFormat}
            onChangeStart={() => {
              wasPlayingRef.current = player.playing;
              player.pause();
            }}
          />
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <PlaybackRateButton player={player} />
            </div>
            <div className="hidden items-center md:flex">
              <MuteButton player={player} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
