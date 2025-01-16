import MarkdownConverter from "@/components/MarkdownConverter";
import WSEOHead from "@/components/SEOHead";

const Markdown = () => {
  return (
    <>
      <WSEOHead
        title="Markdown Converter - TextEase"
        description="Easily convert Markdown text into HTML with live preview. Make your content more dynamic by converting Markdown to HTML instantly."
        keywords="Markdown converter, Markdown to HTML, text utilities, live preview"
        url="https://texteaseutils.vercel.app/utils/markdownconverter"
      />
      <div>
        <MarkdownConverter />
      </div>
    </>
  );
};

export default Markdown;
