import { commify } from "@ethersproject/units";
import Button from "components/button";
import Input from "components/input";
import TweetButton from "components/TweetButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import errorMessages from "util/errorMessages";
import EMAIL_REGEX from "util/emailRegex";

const checkPlace = async (email) => {
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

const signup = async (email) => {
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

const TWEET = `https://twitter.com/intent/tweet?url=https%3A%2F%2Funion.finance%2Fwaitlist&via=unionprotocol&text=${encodeURIComponent(
  "Screw credit scores. Join Union."
)}`;

const WaitlistSignupForm = () => {
  const [placeData, placeDataSet] = useState(null);

  const { handleSubmit, register, errors, formState, watch } = useForm();

  const watchedEmail = watch("email");

  const { isSubmitting, isSubmitted } = formState;

  const onSubmit = async (data) => {
    const { email } = data;

    try {
      await signup(email);

      const data = await checkPlace(email);

      placeDataSet(data);
    } catch (e) {
      console.error(e);
    }
  };

  if (isSubmitted && placeData)
    return (
      <div className="max-w-md">
        <h2 className="mb-4 text-3xl md:text-4xl font-semibold leading-tight">
          You're on the list <br />{" "}
          <span className="text-4xl md:text-5xl lg:text-6xl">
            {"#" + commify(placeData?.position ?? "")}
          </span>
        </h2>

        <p className="text-lg mb-6">
          We'll send an email to{" "}
          <span className="underline">{watchedEmail ?? "your email"}</span>{" "}
          <br /> when Union is ready to try out.
        </p>

        <TweetButton href={TWEET}>Spread the word</TweetButton>
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl md:text-3xl mb-6">
        Borrow cash from friends, <br />
        no collateral needed
      </h2>

      <p className="text-lg mb-6 md:mb-10 md:max-w-lg">
        Join the waitlist to become an Alpha tester of Union. Lend or borrow
        cash from friends and stake your digital dollars to earn UNION tokens.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="md:flex space-y-4 md:space-y-0 md:space-x-4 md:max-w-xl"
      >
        <Input
          type="email"
          name="email"
          className="md:flex-1"
          autoComplete="email"
          placeholder="name@email.com"
          id="email"
          error={errors.email}
          ref={register({
            required: errorMessages.required,
            pattern: {
              value: EMAIL_REGEX,
              message: errorMessages.validEmail,
            },
          })}
        />

        <Button
          full
          wide
          className="md:w-auto"
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

export default WaitlistSignupForm;
