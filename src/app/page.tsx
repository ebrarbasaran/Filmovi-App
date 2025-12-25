import HeroSection from "@/components/dashboard/HeroSection";
import MovieSection from "@/components/dashboard/MovieSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection/>
      <MovieSection title="Trending Movies"/>
      <MovieSection title="Popular Movies"/>
      <MovieSection title="Now Playing"/>
    </div>
  );
}
