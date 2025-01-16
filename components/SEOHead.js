import Head from "next/head";

const WSEOHead = ({ title, description, keywords, url }) => {
  const siteName = "TextEase - Your Ultimate Text Tools";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  // Generate keywords dynamically based on features
  const featureKeywords = features.map((feature) => feature.title).join(", ");

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta
        name="description"
        content={
          description ||
          "TextEase offers powerful tools to transform, optimize, and manage text with ease. From base64 encoding to JSON conversion, we've got it all."
        }
      />
      <meta
        name="keywords"
        content={
          keywords ||
          `text tools, text manipulation, text features, ${featureKeywords}`
        }
      />
      <meta name="author" content="TextEase" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />

      {/* Open Graph / Social Sharing */}
      <meta property="og:title" content={fullTitle} />
      <meta
        property="og:description"
        content={
          description ||
          "TextEase offers all the text tools you need in one place. Discover advanced text utilities like encryption, markdown conversion, QR code generation, and more."
        }
      />
      <meta property="og:url" content={url || "https://texteaseutils.vercel.app"} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="/images/textease-social-preview.png"
      />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta
        name="twitter:description"
        content={
          description ||
          "Explore TextEase for text-to-JSON conversion, markdown generation, spell check, QR codes, and many more advanced tools!"
        }
      />
      <meta name="twitter:image" content="/images/textease-social-preview.png" />
      <meta name="twitter:site" content="@TextEase" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  );
};

export default WSEOHead;
