import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import ThemeProvider from "@/context/ThemeContext";

export default function App({ Component, pageProps }) {
  
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Component {...pageProps} />;
        <Footer />
      </ThemeProvider>
    </>
  );
}
