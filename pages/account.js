import Button from "@components/button";
import Input from "@components/input";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { useForm } from "react-hook-form";
import LoggedOutCard from "@components/loggedOutCard";

const MESSAGE = `Hello from the Union team. Please verify your email and wallet ownership by signing this message. This doesn't cost anything and your email won't be publicly visible.`;

export default function AccountPage() {
  const { library, account } = useWeb3React();

  if (!(account && library))
    return (
      <div className="my-8 md:my-10">
        <Head>
          <title>Account | Union</title>
          <meta property="og:title" content="Account | Union" />
          <meta name="twitter:title" content="Account | Union" />
        </Head>

        <LoggedOutCard />
      </div>
    );

  const { register, handleSubmit } = useForm();

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
    <div className="my-8 md:my-10">
      <Head>
        <title>Account | Union</title>
        <meta property="og:title" content="Account | Union" />
        <meta name="twitter:title" content="Account | Union" />
      </Head>

      <div className="container">
        <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8">
          <h1 className="mb-6">My account</h1>

          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <Input
              autoComplete="email"
              className="mb-16"
              id="email"
              label="Your email"
              name="email"
              required
              placeholder="name@email.com"
              ref={register}
              type="email"
            />

            <Button type="submit" full>
              Save changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
