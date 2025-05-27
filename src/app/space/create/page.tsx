import CustomPodcast from "@/components/createPodcast/CustomPodcast";

export default async function Home() {
  return (
    <div>
      <CustomPodcast />
    </div>
  );
}

export const revalidate = 10;
