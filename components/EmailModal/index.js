import { MESSAGE } from "constants/variables";
import usePersonalSign from "hooks/usePersonalSign";
import { setCookie } from "nookies";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import EMAIL_REGEX from "util/emailRegex";
import Button from "../button";
import Input from "../input";
import Modal from "../modal";
import { useEmailModalOpen, useEmailModalToggle } from "./state";

const EmailModal = () => {
  const open = useEmailModalOpen();
  const toggle = useEmailModalToggle();

  const sign = usePersonalSign();

  const { handleSubmit, register, formState, errors, reset } = useForm();

  useEffect(() => reset(), [open]);

  const { isDirty, isSubmitting } = formState;

  const onSubmit = async (values) => {
    const { email } = values;

    try {
      if (!email) throw new Error("`email` is required");

      await sign(MESSAGE);

      /**
       * @todo Post email to DB here with a key / value pair of address / email
       */

      handleToggle();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = () => {
    setCookie(null, "email_modal_completed", true, {
      maxAge: 30 * 24 * 60 * 60,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    });
    toggle();
  };

  return (
    <Modal isOpen={open} onDismiss={handleToggle}>
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-12">
          <p className="text-center text-xl mb-3">Almost there</p>
          <div className="w-full h-1 bg-pink-pure" />
          <p className="text-center text-grey-pure leading-tight mt-6">
            Your email address is only used to send you important updates.
          </p>
        </div>

        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoFocus
            autoComplete="email"
            placeholder="Your email address"
            id="email"
            name="email"
            required
            type="email"
            error={errors.email}
            ref={register({
              required: "Please fill out this field",
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email",
              },
            })}
          />

          <div className="mt-6 mb-8">
            <Button
              full
              type="submit"
              disabled={isSubmitting || !isDirty}
              submitting={isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>

        <p className="text-center">
          <button
            onClick={handleToggle}
            className="font-medium text-sm underline"
          >
            Skip for now
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default EmailModal;
