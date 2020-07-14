import Button from "components/button";
import Input from "components/input";
import Head from "next/head";
import { useForm } from "react-hook-form";
import EMAIL_REGEX from "util/emailRegex";
import { useState } from "react";
import { commify } from "@ethersproject/units";

const waitlistPlaceCheck = async (email) => {
  const res = await fetch("/api/waitlist/place", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status > 200) {
    const { error } = await res.json();
    return error;
  }

  const { result } = await res.json();

  return result;
};

const waitlistSignup = async (email) => {
  const res = await fetch("/api/waitlist/signup", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await res.json();

  return data;
};

const WaitlistSignup = () => {
  const [placeData, placeDataSet] = useState(null);

  const { handleSubmit, register, errors, formState } = useForm();

  const { isSubmitting, isSubmitted } = formState;

  const onSubmit = async (data, e) => {
    const { email } = data;

    try {
      await waitlistSignup(email);

      const data = await waitlistPlaceCheck(email);

      placeDataSet(data);
    } catch (e) {
      console.error(e);
    }
  };

  if (isSubmitted && placeData)
    return (
      <div className="max-w-md">
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-none mb-6 md:mb-8 font-semibold">
          {"#" + commify(placeData.position)}
        </h2>
        <p className="text-lg md:text-xl leading-tight font-normal mb-6 md:mb-8 md:max-w-md">
          You're on the waitlist. We'll let you know when your invite to sign up
          is ready.
        </p>

        <Button
          href="https://twitter.com/unionprotocol"
          target="_blank"
          rel="noopener"
          secondary
          wide
        >
          Spread the word
        </Button>
      </div>
    );

  return (
    <div className="">
      <h2 className="text-2xl md:text-3xl mb-6">Union Alpha</h2>

      <p className="md:text-xl leading-tight font-normal mb-6 md:mb-10 md:max-w-sm">
        Secure a spot on the waitlist for the Alpha program.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="sm:max-w-sm"
      >
        <Input
          type="email"
          name="email"
          className="mb-4"
          autoComplete="email"
          placeholder="name@email.com"
          id="email"
          ref={register({
            required: "Please fill out this field",
            pattern: {
              value: EMAIL_REGEX,
              message: "Please enter a valid email",
            },
          })}
        />

        <Button
          full
          type="submit"
          disabled={isSubmitting}
          submitting={isSubmitting}
          submittingText={"Join Waitlist"}
        >
          Join Waitlist
        </Button>
      </form>
    </div>
  );
};

export default function WaitlistPage() {
  return (
    <div>
      <Head>
        <title>Waitlist | Union</title>
        <meta property="og:title" content="Waitlist | Union" />
        <meta name="twitter:title" content="Waitlist | Union" />
      </Head>

      <section className="pt-10 pb-4 sm:pb-10 sm:pt-20 lg:pt-32">
        <div className="container-sm">
          <div className="flex flex-col sm:flex-row sm:-mx-6">
            <div className="w-full sm:w-1/2 sm:p-8 mb-12 sm:mb-0">
              <div className="w-full">
                <WaitlistSignup />
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
    </div>
  );
}
