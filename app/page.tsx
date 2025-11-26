"use client";

import { useState } from "react";
import LoadingSequence from "@/components/LoadingSequence";
import Hero from "@/components/Hero";
import TwitchSection from "@/components/TwitchSection";
import SocialLinks from "@/components/SocialLinks";
import ContentFeed from "@/components/ContentFeed";
import TweetWall from "@/components/TweetWall";
import Footer from "@/components/Footer";

import NavigationSidebar from "@/components/NavigationSidebar";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {!loadingComplete && (
        <LoadingSequence onComplete={() => setLoadingComplete(true)} />
      )}
      {loadingComplete && <NavigationSidebar />}
      <main className="min-h-screen">
        <section id="hero">
          <Hero />
        </section>
        <section id="live">
          <TwitchSection />
        </section>
        <section id="links">
          <SocialLinks />
        </section>
        <section id="feed">
          <ContentFeed />
        </section>
        <section id="tweets">
          <TweetWall />
        </section>
        <Footer />
      </main>
    </>
  );
}
