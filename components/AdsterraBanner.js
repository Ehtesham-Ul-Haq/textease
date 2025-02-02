import Script from "next/script";

const AdsterraBanner = () => {
  return (
    <div>
      {/* Adsterra Script */}
      <Script
        strategy="afterInteractive"
        async
        data-cfasync="false"
        src="//pl25751639.profitablecpmrate.com/9bffe5685db3025c137f516d8e0b06ab/invoke.js"
      />
      
      {/* Ad Container */}
      <div id="container-9bffe5685db3025c137f516d8e0b06ab"></div>
    </div>
  );
};

export default AdsterraBanner;
