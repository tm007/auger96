"use client";

import { useState } from "react";
import LoadingSequence from "@/components/LoadingSequence";
import Hero from "@/components/Hero";
import TwitchSection from "@/components/TwitchSection";
import SocialLinks from "@/components/SocialLinks";
import ContentFeed from "@/components/ContentFeed";
import TweetWall from "@/components/TweetWall";
import Footer from "@/components/Footer";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {!loadingComplete && (
        <LoadingSequence onComplete={() => setLoadingComplete(true)} />
      )}
      <main className="min-h-screen">
        <Hero />
        <TwitchSection />
        <SocialLinks />
        <ContentFeed />
        <TweetWall />
        <Footer />
      </main>
    </>
  );
}
