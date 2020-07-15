import { useWeb3React } from "@web3-react/core";
import Button from "components/button";
import Input from "components/input";
import { MESSAGE } from "constants/variables";
import useCopy from "hooks/useCopy";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import EMAIL_REGEX from "util/emailRegex";

export default function AccountView() {
  const { library, account } = useWeb3React();

  const { register, handleSubmit, formState, errors, reset } = useForm();

  useEffect(() => reset(), [open]);

  const { isDirty, isSubmitting } = formState;

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

          <Button secondary>Connect 3Box</Button>

          <form
            method="POST"
            className="mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              autoComplete="email"
              className="mb-4"
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

            <Input
              className="mb-16"
              label="Your address"
              readOnly
              setMax={handleCopy}
              setMaxLabel=""
              setMaxValue={isCopied ? "Copied!" : "Copy"}
              value={account}
            />

            <Button
              full
              type="submit"
              disabled={isSubmitting || !isDirty}
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
