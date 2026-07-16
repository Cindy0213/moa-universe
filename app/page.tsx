import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { HeroSection } from "@/components/home/HeroSection";
import { LightstickAiWidget } from "@/components/home/LightstickAiWidget";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <HeroSection />
      <LightstickAiWidget />
    </>
  );
}
