"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Download,
  Plus,
} from "lucide-react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// Custom styles for the audio player
const customPlayerStyles = `
  .rhap_container {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
  }
  .rhap_progress-section {
    margin: 0;
  }
  .rhap_time {
    color: inherit;
  }
  .rhap_progress-bar {
    background-color: #e5e7eb;
  }
  .rhap_progress-filled {
    background-color: #2563eb;
  }
  .rhap_progress-indicator {
    background: #2563eb;
  }
  .rhap_button-clear {
    color: #2563eb;
  }
  .rhap_main-controls-button {
    color: #2563eb;
  }
  .rhap_volume-button {
    color: #2563eb;
  }
  .rhap_volume-bar {
    background-color: #e5e7eb;
  }
  .dark .rhap_progress-bar {
    background-color: #374151;
  }
  .dark .rhap_time {
    color: #9ca3af;
  }
  .rhap_progress-indicator {
    width: 14px;
    height: 14px;
    margin-left: -7px;
    top: -5px;
  }
  .rhap_progress-bar-show-download {
    background-color: #e5e7eb;
  }
  .rhap_download-progress {
    background-color: #94a3b8;
  }
  .dark .rhap_download-progress {
    background-color: #4b5563;
  }
`;

// Utility Functions
const formatDate = (dateString: any) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Components
const InfoItem = ({ label, value }: any) => (
  <div className="flex flex-col">
    <span className="text-xs text-[#3246DC] font-source-code-pro font-medium">
      {label}
    </span>
    <span className="font-medium text-[#FFFFFF] text-base font-source-code-pro">
      {value}
    </span>
  </div>
);

const StatusBadge = ({ status }: any) => {
  const statusConfig: any = {
    completed: {
      icon: CheckCircle,
      className: "bg-[#638BEF] text-[#111111]",
    },
    pending: {
      icon: Clock,
      className:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    failed: {
      icon: XCircle,
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center gap-3 rounded px-3 py-1 uppercase ${config.className}`}
    >
      <span className=" font-source-code-pro font-bold text-xs">{status}</span>
      <Icon className="h-3 w-3" />
    </div>
  );
};

const StatsCard = ({ title, value }: any) => (
  <div
    className={`rounded bg-[#3246DC] max-w-[302.5px] w-full h-[114px] border-none`}
  >
    <CardContent className="pt-3">
      <div className=" mb-2 text-[#111111] whitespace-nowrap font-bold font-source-code-pro text-base">
        {title}
      </div>

      <div className="text-[#111111] font-medium font-druk text-[48px] leading-[48px]">
        {value}
      </div>
    </CardContent>
  </div>
);

const PodcastCard = ({ podcast }: any) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const audioUrl = `https://api.gasguard.xyz/mediaai${podcast.audio_url}`;
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${podcast.configuration.podcast_name}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className=" w-full rounded overflow-hidden border-none bg-[#111111] transition-all duration-300">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <CardTitle className="text-[#fffff] font-source-code-pro text-base  font-bold">
              {podcast.configuration.podcast_tagline}
            </CardTitle>
            <p className="text-[#638BEF] font-source-code-pro text-xs font-medium">
              {podcast.configuration.podcast_name}
            </p>
          </div>
          <StatusBadge status={podcast.status} />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div className="space-y-2">
              <InfoItem
                label="Created"
                value={formatDate(podcast.created_at)}
              />
              <InfoItem
                label="Cost"
                value={`${podcast.amount_sol.toFixed(4)} SOL`}
              />
              <InfoItem
                label="Word Count"
                value={`${podcast.configuration.word_count.toFixed(4)} words`}
              />
            </div>
            <div className="space-y-2">
              <InfoItem
                label="Creativity"
                value={`${podcast.configuration.creativity * 100}%`}
              />
              <InfoItem
                label="Speaker 1"
                value={podcast.configuration.roles_person1}
              />
              <InfoItem
                label="Speaker 2"
                value={podcast.configuration.roles_person2}
              />
            </div>
          </div>

          {podcast.status === "completed" && (
            <div className="flex flex-wrap gap-6 sm:flex-nowrap">
              <div className="w-full">
                <AudioPlayer
                  src={`https://api.gasguard.xyz/mediaai${podcast.audio_url}`}
                  autoPlayAfterSrcChange={false}
                  showJumpControls={false}
                  layout="horizontal"
                  customProgressBarSection={[
                    RHAP_UI.CURRENT_TIME,
                    RHAP_UI.PROGRESS_BAR,
                    RHAP_UI.DURATION,
                  ]}
                  customControlsSection={[
                    RHAP_UI.MAIN_CONTROLS,
                    RHAP_UI.VOLUME_CONTROLS,
                  ]}
                  style={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
                />
              </div>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-1 w-full md:w-fit justify-center whitespace-nowrap border text-[#3246DC] text-base font-bold font-source-code-pro  py-[5px] px-[10px] border-[#3246DC] rounded "
              >
                {isDownloading ? (
                  <>
                    Downloading...
                    <Loader2 className="h-[14px] w-[14px] animate-spin" />
                  </>
                ) : (
                  <>
                    Download Audio
                    <Download className="h-[14px] w-[14px]" />
                  </>
                )}
              </button>

              {/* <div className="mt-4 flex items-center gap-4">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-x-3 text-sm font-bold leading-6 text-violet-500 hover:text-violet-700 active:text-violet-900"
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
         
          </div> */}
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded border-none bg-[#111111]  p-12 text-center min-h-[300px]">
    {/* <div className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-700">
      <Plus className="h-6 w-6 text-gray-600 dark:text-gray-400" />
    </div> */}
    <h3 className="mb-2 text-[#fffff] font-source-code-pro text-xl  font-bold">
      No podcasts yet
    </h3>
    <p className="mb-4 text-[#638BEF] font-source-code-pro text-base font-medium">
      Get started by creating your first podcast
    </p>
    <Link
      href="/space/create"
      className="flex items-center gap-1 w-full md:w-fit justify-center whitespace-nowrap border text-[#3246DC] text-base font-bold font-source-code-pro  py-[5px] px-[10px] border-[#3246DC] rounded "
    >
      Create New Podcast
    </Link>
  </div>
);

// Main Component
const UserProfile = () => {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.gasguard.xyz/mediaai/api/users/${(
            publicKey as any
          ).toString()}/podcasts`
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (connected) fetchUserData();
  }, [connected, publicKey]);

  if (loading) {
    return (
      <div className="max-w-[1440px] min-h-[calc(100vh-136px)] relative mx-auto md:pt-[133px] pt-[130px] md:px-8 px-4 xl:px-[100px] space-y-[27px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="max-w-[1440px] font-source-code-pro min-h-[calc(100vh-136px)] relative mx-auto md:pt-[133px] pt-[130px] md:px-[100px] px-8 space-y-[27px] flex items-center justify-center text-3xl font-bold">
        Please Connect your wallet
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1440px] font-source-code-pro min-h-[calc(100vh-136px)] relative mx-auto md:pt-[133px] pt-[130px] md:px-[100px] px-8 space-y-[27px] flex items-center justify-center text-3xl font-bold text-red-600">
        Error: {error}
      </div>
    );
  }

  const filteredPodcasts = userData?.podcasts.filter((podcast: any) =>
    statusFilter === "all" ? true : podcast.status === statusFilter
  );

  return (
    <>
      <style jsx global>
        {customPlayerStyles}
      </style>
      <div className="max-w-[1440px] min-h-[calc(100vh-136px)] relative mx-auto md:pt-[133px] pt-[130px] md:px-8 px-4 xl:px-[100px] space-y-[27px]">
        <div className="relative">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-3 group relative z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.button>
        </div>

        {userData && (
          <>
            <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 md:items-end">
              <div>
                <h1 className="font-druk text-[36px] md:text-[60px] font-medium leading-[45px] md:leading-[60px] text-left  decoration-skip-ink-none uppercase text-[#3246DC] mix-blend-color-dodge">
                  Your Podcast Dashboard
                </h1>
                <p className="text-base font-medium text-[#638BEF] font-source-code-pro">
                  Manage and listen to your generated podcasts
                </p>
              </div>
              <Link
                href="/space/create"
                className="flex items-center h-fit gap-1 w-full md:w-fit justify-center whitespace-nowrap border text-[#3246DC] text-base font-bold font-source-code-pro  py-[5px] px-[10px] border-[#3246DC] rounded "
              >
                Create Podcast
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-[10px] md:grid-cols-4">
              <StatsCard
                title="Total Podcasts"
                value={userData.user.total_podcasts.toFixed(3)}
              />
              <StatsCard
                title="Completed"
                value={userData.user.completed_podcasts.toFixed(3)}
              />
              <StatsCard
                title="Total Spent"
                value={`${userData.user.total_sol_spent.toFixed(3)} SOL`}
              />
              <StatsCard
                title="Pending"
                value={userData.user.pending_podcasts.toFixed(3)}
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-druk text-[36px] md:text-[60px] font-medium leading-[45px] md:leading-[60px] text-left  decoration-skip-ink-none uppercase text-[#3246DC] mix-blend-color-dodge">
                  Your Podcasts
                </h1>
                <select
                  className="rounded border border-[#3246DC] px-[10px] py-[5px] text-[#3246DC] font-source-code-pro font-bold text-base bg-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Podcasts</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="grid gap-6">
                {filteredPodcasts?.length > 0 ? (
                  filteredPodcasts.map((podcast: any) => (
                    <PodcastCard key={podcast.id} podcast={podcast} />
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
