import Demo from "@/components/Demo";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Head from "next/head";


export default function LandingPage() {

 
  
  return (
      <>
      <Head>
        <title>TextEase . Find Your Ease</title>
        <link rel="icon" type="image/png" href="fevicon.webp" />
      </Head>
    <div>
      <Hero />
      <Features />
      <Demo />
    </div>
      </>
  );
}


