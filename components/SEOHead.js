import Head from "next/head";

const WSEOHead = ({ title, description, keywords, url }) => {
  const siteName = "TextEase - Your Ultimate Text Tools";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;


  const features = [
    { title: "Convert to Sentence Case", icon: "📝" },
    { title: "Encode to Base64", icon: "🔒" },
    { title: "Extract Numbers", icon: "🔢" },
    { title: "Extract Links", icon: "🔗" },
    { title: "Extract Text", icon: "📋" },
    { title: "Remove Special Characters", icon: "🚫" },
    { title: "Copy Text", icon: "📋" },
    { title: "Paste from Clipboard", icon: "📥" },
    { title: "Reverse Text", icon: "🔄" },
    { title: "Start Listening", icon: "👂" },
    { title: "Undo Action", icon: "↩️" },
    { title: "Redo Action", icon: "↪️" },
    { title: "Convert to Uppercase", icon: "🔠" },
    { title: "Convert to Lowercase", icon: "🔡" },
    { title: "Capitalize First Letter", icon: "🔤" },
    { title: "Clear Text", icon: "❌" },
    { title: "Text-to-Speech", icon: "🔊" },
    { title: "Remove Extra Spaces", icon: "✂️" },
    { title: "Text Translation", icon: "🌍" },
    { title: "Text Summarization", icon: "📖" },
    { title: "Word Count", icon: "📝" },
    { title: "Font Customization", icon: "🖋️" },
    { title: "Text Alignment", icon: "📐" },
    { title: "Text Highlighting", icon: "🔆" },
    { title: "Find and Replace", icon: "🔍" },
    { title: "Spell Check", icon: "✔️" },
    { title: "Text Comparison", icon: "🔎" },
    { title: "Text to QR Code", icon: "📱" },
    { title: "Create Word Cloud", icon: "☁️" },
    { title: "Save Text as File", icon: "💾" },
    { title: "Text Encryption/Decryption", icon: "🔑" },
    { title: "Text to Markdown", icon: "📄" },
    { title: "Character Encoding", icon: "🔠" },
    { title: "Search Text in File", icon: "🔍" },
    { title: "Text to Image", icon: "🖼️" },
    { title: "Link Shortening", icon: "🔗" },
    { title: "Text Formatting", icon: "✍️" },
    { title: "Text Reading Speed Adjuster", icon: "⏩" },
    { title: "Count Syllables", icon: "📊" },
    { title: "Text-to-PDF", icon: "📄" },
    { title: "Grammar Check", icon: "🧹" },
    { title: "Convert Text to Emoji", icon: "😄" },
    { title: "Text to CSV/Excel", icon: "📊" },
    { title: "Remove Empty Lines", icon: "🧹" },
    { title: "Text to LaTeX", icon: "📚" },
    { title: "Highlight Keywords", icon: "🔦" },
    { title: "Text Size Adjuster", icon: "🔍" },
    { title: "Speech-to-Text", icon: "🎙️" },
  ];
  

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
        content="/logo.webp"
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
      <meta name="twitter:image" content="/logo.webp" />
      <meta name="twitter:site" content="@TextEase" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* google console */}
      <meta name="google-site-verification" content="IyD2TfD0g0PP5B-dWgM5z-T2Yh5nG91tLwc8QqNDMj8" />
    </Head>
  );
};

export default WSEOHead;
