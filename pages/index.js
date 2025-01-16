import Demo from "@/components/Demo";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import WSEOHead from "@/components/SEOHead";
import Head from "next/head";


export default function LandingPage() {



  return (
    <>
      <WSEOHead
        title="Home"
        description="Discover a wide range of text tools, from text transformation to JSON generation, at TextEase."
        keywords="text tools, JSON maker, spell check, text-to-emoji, QR code generator"
        url="https://texteaseutils.vercel.app"
      />
      <div>
        <Hero />
        <Features />
        <Demo />
      </div>
    </>
  );
}


