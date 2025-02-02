import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import ThemeProvider from "@/context/ThemeContext";
import Alert from "@/components/Alert";
import AdsterraBanner from "@/components/AdsterraBanner";

export default function App({ Component, pageProps }) {
  
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Alert />
        <Component {...pageProps} />;
        <Footer />
        <AdsterraBanner />
      </ThemeProvider>
    </>
  );
}
