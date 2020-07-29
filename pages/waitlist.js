import WaitlistSignupForm from "components/WaitlistSignupForm";
import Head from "next/head";

export default function WaitlistPage() {
  return (
    <div>
      <Head>
        <title>Waitlist | Union</title>
        <meta property="og:title" content="Waitlist | Union" />
        <meta name="twitter:title" content="Waitlist | Union" />
      </Head>

      <section className="pt-8 pb-10 sm:pt-12 sm:pb-16 md:pt-24 md:pb-32">
        <div className="container-sm">
          <div className="flex flex-col sm:flex-row sm:-mx-6">
            <div className="w-full sm:w-1/2 sm:p-8 mb-12 sm:mb-0">
              <div className="w-full">
                <WaitlistSignupForm />
              </div>
            </div>
            <div className="w-full self-end sm:w-1/2 sm:p-8 flex justify-end">
              <img
                className="w-56 sm:w-72"
                src="/images/learn-more.svg"
                alt="Learn more about Union"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-sm">
        <div className="divider"></div>
      </section>
    </div>
  );
}
