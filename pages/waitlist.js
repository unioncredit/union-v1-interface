import Button from "components/button";
import Input from "components/input";
import delay from "lib/delay";
import Head from "next/head";
import { useForm } from "react-hook-form";
import EMAIL_REGEX from "util/emailRegex";

const WaitlistSignup = () => {
  const { handleSubmit, register, errors, formState } = useForm();

  const { isSubmitting, isSubmitted } = formState;

  const onSubmit = async (data, e) => {
    const { email } = data;

    try {
      await delay();
      console.log(email);
    } catch (err) {
      console.error(err);
    }
  };

  if (isSubmitted) return null;

  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)} method="POST">
      <Input
        type="email"
        label="Email"
        name="email"
        autoComplete="email"
        placeholder="Your email address"
        className="mb-4"
        id="email"
        ref={register({
          required: "Please fill out this field",
          pattern: {
            value: EMAIL_REGEX,
            message: "Please enter a valid email",
          },
        })}
        error={errors.email}
      />

      <Button
        full
        type="submit"
        disabled={isSubmitting}
        submitting={isSubmitting}
        submittingText={"Signing up..."}
      >
        Submit
      </Button>
    </form>
  );
};

export default function WaitlistPage() {
  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Waitlist | Union</title>
        <meta property="og:title" content="Waitlist | Union" />
        <meta name="twitter:title" content="Waitlist | Union" />
      </Head>

      <div className="container">
        <h1 className="mb-8">Waitlist</h1>

        <WaitlistSignup />
      </div>
    </div>
  );
}
