import { cache } from "react";
import { notFound } from "next/navigation";
import { EpisodePlayButton } from "@/components/podcast/EpisodePlayButton";
import { PauseIcon } from "@/components/podcast/PauseIcon";
import { getAllEpisodes } from "@/lib/episodes";
import StyledTranscript from "@/components/podcast/StyledTranscript";
import { PlayIcon } from "@/components/podcast/PlayIcon";
import Image from "next/image";
import Link from "next/link";

const getEpisode = cache(async (id: string) => {
  const allEpisodes = await getAllEpisodes();
  const episode = allEpisodes.find((episode) => episode.id.toString() === id);

  if (!episode) {
    notFound();
  }

  return episode;
});

export async function generateMetadata(props: {
  params: Promise<{ episode: string }>;
}) {
  const params = await props.params;
  const episode = await getEpisode(params.episode);

  return {
    title: episode.title,
  };
}

export default async function Episode(props: {
  params: Promise<{ episode: string }>;
}) {
  const params = await props.params;
  const episode = await getEpisode(params.episode);
  const date = new Date(episode.published);

  return (
    <div className="max-w-[1440px] relative mx-auto md:pt-[133px] pt-[130px] md:px-8 px-4 xl:px-[100px] space-y-10">
      {/* Back Button */}
      <Link
        href="/space"
        className="flex gap-3 items-center group w-fit cursor-pointer"
      >
        {" "}
        <Image
          src="/icons/BackIcon.svg"
          alt="Back"
          width={7}
          height={12}
          className="transform group-hover:translate-x-[-2px] transition-transform"
        />
        <span className="font-source-code-pro text-sm font-medium leading-[17.5px] text-[#638BEF]">
          Back
        </span>
      </Link>

      <div className="flex flex-col md:flex-row lg:gap-[75px] mt-6">
        {/* Left Content */}
        <div className="max-w-[485px] w-full space-y-3">
          {/* Date */}
          <p className="font-source-code-pro text-sm leading-7 text-[#3246DC]">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Title */}
          <h1 className="font-druk text-[60px] leading-[60px]  mix-blend-color-dodge text-[#3246DC] max-w-[256px]">
            {episode.title}
          </h1>

          {/* Podcast Name */}
          <p className="font-source-code-pro text-base font-bold leading-6 text-[#638BEF]">
            {episode.description}
          </p>

          {/* Play Button */}
          <div className="pt-4">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-3 text-white group"
              playing={
                <>
                  <PauseIcon className="h-4 w-4 fill-current" />
                  <span className="font-source-code-pro text-sm">Listen</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-4 w-4 fill-current" />
                  <span className="font-source-code-pro text-sm">Listen</span>
                </>
              }
            />
          </div>
        </div>

        {/* Right Content - Transcript */}

        <StyledTranscript content={episode.content} />
      </div>
    </div>
  );
}
