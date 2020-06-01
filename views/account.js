import { useWeb3React } from "@web3-react/core";
import Button from "components/button";
import Input from "components/input";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import EMAIL_REGEX from "util/emailRegex";
import useCopy from "hooks/useCopy";

const MESSAGE = `Hello from the Union team. Please verify your email and wallet ownership by signing this message. This doesn't cost anything and your email won't be publicly visible.`;

export default function AccountView() {
  const { library, account } = useWeb3React();

  const { register, handleSubmit, formState, errors, reset } = useForm();

  useEffect(() => reset(), [open]);

  const { dirty, isSubmitting } = formState;

  const [isCopied, copy] = useCopy();

  const handleCopy = () => copy(account);

  const onSubmit = async (values) => {
    const { email } = values;

    try {
      if (!email) throw new Error("`email` is required");

      const signer = library.getSigner();

      const signature = await signer.signMessage(MESSAGE);

      /**
       * @todo Post email to DB here with a key / value pair of address / email
       */
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8">
          <h1 className="mb-6">My account</h1>

          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <Input
              autoComplete="email"
              className="mb-10"
              id="email"
              label="Your email"
              name="email"
              type="email"
              placeholder="name@email.com"
              error={errors.email}
              ref={register({
                required: "Please fill out this field",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email",
                },
              })}
            />

            <div className="mb-16">
              <p className="mb-2 text-type-light">Your address</p>
              <button
                className="font-medium py-1 w-full truncate text-sm text-left focus:outline-none hover:underline"
                onClick={handleCopy}
                title={account}
                type="button"
              >
                {isCopied ? "Copied!" : account}
              </button>
            </div>

            <Button
              full
              type="submit"
              disabled={isSubmitting || !dirty}
              submitting={isSubmitting}
            >
              Save changes
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
