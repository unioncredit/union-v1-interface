import { useEmailModalOpen, useEmailModalToggle } from "@contexts/Application";
import { setCookie } from "nookies";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import Modal from "./modal";

const EmailModal = () => {
  const open = useEmailModalOpen();
  const toggle = useEmailModalToggle();

  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    setTimeout(() => {
      console.log(values);
      handleToggle();
    }, 1000);
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
            ref={register}
            required
            type="email"
          />

          <div className="mt-6 mb-8">
            <Button type="submit" full>
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
