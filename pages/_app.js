import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import ThemeProvider from "@/context/ThemeContext";
import Alert from "@/components/Alert";

export default function App({ Component, pageProps }) {
  
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Alert />
        <Component {...pageProps} />;
        <Footer />
      </ThemeProvider>
    </>
  );
}
