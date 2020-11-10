import Footer from "components/Footer";
import Logo from "components/logo";
import Link from "next/link";
import { Fragment } from "react";

export default function ErrorView() {
  return (
    <Fragment>
      <header>
        <nav className="border-b bg-white">
          <div className="w-full mx-auto px-4 max-w-screen-xl-gutter">
            <ul className="flex items-center justify-between">
              <li className="py-4 h-20 flex items-center justify-start">
                <Link href="/">
                  <a>
                    <Logo />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <div className="my-8 md:my-10">
          <div className="container">
            <div className="text-center pt-32 pb-64">
              <h1>Something went wrong</h1>

              <p className="text-lg mt-4">
                An unexpected error occurred{" "}
                <a className="underline" href="mailto:support@union.finance">
                  contact Support
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </Fragment>
  );
}
