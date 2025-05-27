"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { type Episode } from "@/lib/episodes";
import { EpisodePlayButton } from "../podcast/EpisodePlayButton";
import Link from "next/link";

interface Props {
  episodes: Episode[];
}

function PauseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
      />
    </svg>
  );
}

function PlayIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
    </svg>
  );
}
const EpisodesSection = ({ episodes }: Props) => {
  const router = useRouter();
  const [, setCurrentSeason] = useState(1);
  const seasonsScrollRef = useRef<HTMLDivElement>(null);

  const seasons = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Season ${i + 1}`,
    disabled: i > 0, // Only Season 1 enabled for now
  }));

  const scrollSeasons = (direction: "left" | "right") => {
    if (seasonsScrollRef.current) {
      const container = seasonsScrollRef.current.querySelector("div");
      if (container) {
        // Get width of one season item including its dot and gap
        const seasonItems = container.children;
        if (seasonItems.length > 0) {
          const itemWidth = seasonItems[0].getBoundingClientRect().width;
          const scrollAmount = direction === "left" ? -itemWidth : itemWidth;

          // Get current scroll position
          const currentScroll = container.scrollLeft;
          const maxScroll = container.scrollWidth - container.clientWidth;

          // Calculate new scroll position
          const newScroll = Math.max(
            0,
            Math.min(maxScroll, currentScroll + scrollAmount)
          );

          container.scrollTo({
            left: newScroll,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <div className="max-w-[1440px] md:mt-10 mx-auto md:px-8 px-4">
      {/* Header Section */}
      <div className="border-b border-[#3246DC] pb-6 flex justify-between items-center">
        <h1 className="font-druk md:text-[60px] font-medium  text-[36px] leading-[45px] mix-blend-color-dodge md:leading-[60px] text-[#3246DC]">
          EPISODES
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/space/create")}
          className="md:px-4 md:py-4 py-[10.5px] px-4 bg-[#3246DC] border font-bold md:text-[16px] md:leading-[11px] text-[12px] leading-[15px] border-[#638BEF] rounded-sm text-[#111111] font-source-code-pro"
        >
          Create Podcast
        </motion.button>
      </div>

      {/* Seasons Navigation */}
      {/* Seasons Navigation */}
      <div className="border-b border-[#3246DC] py-6">
        <div className="relative flex items-center">
          <div ref={seasonsScrollRef} className="w-[calc(100%-60px)]">
            <div className="flex gap-6 md:gap-10 overflow-x-auto scrollbar-hide no-scrollbar">
              {seasons.map((season, index, arr) => (
                <div
                  key={season.id}
                  className="flex-shrink-0 flex items-center gap-6 md:gap-10"
                >
                  <button
                    onClick={() =>
                      !season.disabled && setCurrentSeason(season.id)
                    }
                    className={`font-source-code-pro text-base whitespace-nowrap tracking-[0.02em] 
                ${season.disabled ? "opacity-50 cursor-not-allowed" : ""} 
                text-[#638BEF]`}
                  >
                    {season.name}
                  </button>
                  {index !== arr.length - 1 && (
                    <div className="w-[5px] h-[5px] bg-[#3246DC]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-[10px] items-center ml-4">
            <button
              onClick={() => scrollSeasons("left")}
              className="hover:opacity-80 transition-opacity p-4 -m-4" // Add padding and negative margin
              aria-label="Previous season"
            >
              <div className="flex items-center justify-center">
                <Image
                  src="/icons/ArrowLeft.svg"
                  alt=""
                  width={12}
                  height={12}
                />
              </div>
            </button>
            <button
              onClick={() => scrollSeasons("right")}
              className="hover:opacity-80 transition-opacity p-4 -m-4"
              aria-label="Next season"
            >
              <div className=" flex items-center justify-center">
                <Image
                  src="/icons/ArrowRight.svg"
                  alt=""
                  width={12}
                  height={12}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="grid md:grid-cols-2 grid-cols-1 mt-8 gap-8 md:mt-10 lg:gap-10">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
};

const EpisodeCard = ({ episode }: { episode: Episode }) => {
  const date = new Date(episode.published);

  return (
    <div className="w-full border-b border-[#3246DC] pb-6 space-y-[10px] md:space-y-7">
      <p className="font-source-code-pro text-sm text-[#3246DC]">
        {date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className=" space-y-[10px] md:space-y-4">
        <h2 className="font-source-code-pro text-sm font-bold text-white">
          {episode.title}
        </h2>
        <p className="font-source-code-pro text-sm italic text-white">
          {episode.description}
        </p>
        <p className="font-source-code-pro text-sm text-[#3246DC]">
          {episode.lang}
        </p>
      </div>

      <div className="flex items-center gap-4 md:pt-3">
        <EpisodePlayButton
          episode={episode}
          className="flex items-center gap-x-3 font-source-code-pro text-sm"
          playing={
            <>
              <PauseIcon className="h-2.5 w-2.5 fill-current" />
              <span aria-hidden="true">Listen</span>
            </>
          }
          paused={
            <>
              <PlayIcon className="h-2.5 w-2.5 fill-current" />
              <span aria-hidden="true">Listen</span>
            </>
          }
        />

        <span className="text-white">/</span>
        <Link
          href={`/space/${episode.id}`}
          aria-label={`Show notes for episode ${episode.title}`}
          className="font-source-code-pro text-sm text-white"
        >
          Show notes
        </Link>
      </div>
    </div>
  );
};

export default EpisodesSection;
