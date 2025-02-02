import Script from "next/script";
import { useEffect } from "react";

const AdsterraBanner = () => {
  useEffect(() => {
    window.atOptions = {
      key: "fd93cea955d272d5c1f7b9e14ef08fcb",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };
  }, []);

  return (
    <div>
      {/* Adsterra Ad Script */}
      <Script
        strategy="afterInteractive"
        src="//www.highperformanceformat.com/fd93cea955d272d5c1f7b9e14ef08fcb/invoke.js"
      />
      
      {/* Ad Container */}
      <div id="container-fd93cea955d272d5c1f7b9e14ef08fcb"></div>
    </div>
  );
};

export default AdsterraBanner;
