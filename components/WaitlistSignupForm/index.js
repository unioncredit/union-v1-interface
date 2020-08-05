import { commify } from "@ethersproject/units";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EMAIL_REGEX from "util/emailRegex";
import Button from "../button";
import Input from "../input";
import errorMessages from "text/errorMessages";

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

const WaitlistSignupForm = () => {
  const [placeData, placeDataSet] = useState(null);

  const { handleSubmit, register, errors, formState } = useForm();

  const { isSubmitting, isSubmitted } = formState;

  const onSubmit = async (data, e) => {
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
    <div>
      <h2 className="text-2xl md:text-3xl mb-6">Union Alpha</h2>

      <p className="md:text-xl leading-tight font-normal mb-6 md:mb-10 md:max-w-sm">
        Secure a spot on the waitlist for the Alpha program, or collect a{" "}
        <strong>Golden Ticket</strong> to get early access.
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
