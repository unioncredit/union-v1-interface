import ErrorBoundary from "components/errorBoundary";
import Footer from "components/footer";
import Navigation from "components/navigation";
import useFathom from "hooks/useFathom";
import "../css/tailwind.css";
import Error from "./_error";

export default function UnionApp({ Component, pageProps }) {
  useFathom();

  return (
    <ErrorBoundary fallback={<Error />}>
      <div className="flex flex-col min-h-screen">
        <header>
          <Navigation />
        </header>

        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
