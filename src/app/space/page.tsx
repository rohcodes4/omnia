import EpisodesSection from "@/components/space/EpisodesSection";
import PodcastCarousel from "@/components/space/PodcastCarousel";
import SpaceHero from "@/components/space/SpaceHero";
import { getAllEpisodes } from "@/lib/episodes";

export default async function Space() {
  const episodes = await getAllEpisodes();

  return (
    <>
      <div className="pb-[130px] md:pb-0">
        <SpaceHero />
        <div className="px-8 md:hidden block mb-12">
          <PodcastCarousel />
        </div>
      </div>

      <EpisodesSection episodes={episodes} />
    </>
  );
}

export const revalidate = 60;
