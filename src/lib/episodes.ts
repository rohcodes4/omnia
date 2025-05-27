export interface Episode {
  id: number;
  title: string;
  published: Date;
  description: string;
  content: string;
  lang: string;
  audio: {
    src: string;
    type: string;
  };
}

interface PodcastResponse {
  podcasts: Array<{
    id: number;
    configuration: {
      podcast_name: string;
      output_language: string;
    };
    created_at: string;
    description: string;
    content: string;
    audio_url: string;
  }>;
}

export async function getAllEpisodes(): Promise<Episode[]> {
  try {
    const response = await fetch(
      "https://api.gasguard.xyz/mediaai/api/podcasts"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PodcastResponse = await response.json();

    const episodes: Episode[] = data.podcasts.map((podcast) => ({
      id: podcast.id,
      title: podcast.description || "",
      published: new Date(podcast.created_at),
      description: podcast.configuration.podcast_name,
      lang: podcast.configuration.output_language || "",
      content: podcast.content || "",
      audio: {
        src: `https://api.gasguard.xyz/mediaai${podcast.audio_url}`,
        type: "audio/mpeg",
      },
    }));

    // Sort episodes by published date in descending order (newest first)
    return episodes.sort(
      (a, b) => a.published.getTime() - b.published.getTime()
    );
  } catch (error) {
    console.error("Error fetching podcast data:", error);
    throw error;
  }
}
