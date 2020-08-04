import { useWeb3React } from "@web3-react/core";
import Input from "components/input";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import useCopy from "hooks/useCopy";
import { Fragment } from "react";

export default function AccountView() {
  const { account } = useWeb3React();

  const [isCopied, copy] = useCopy();
  const handleCopy = () => copy(account);

  const { data, error } = use3BoxPublicData(account);
  const has3BoxName = !!data && !error && data?.name;

  return (
    <Fragment>
      <div className="container">
        <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8">
          <h1 className="mb-6">My account</h1>

          <Input
            className="mb-6"
            label="Your address"
            readOnly
            setMax={handleCopy}
            setMaxLabel=""
            setMaxValue={isCopied ? "Copied!" : "Copy"}
            value={account}
          />

          {has3BoxName && (
            <p>
              Looks like you're using 3box! Update your public profile on{" "}
              <a
                className="underline"
                href={`https://3box.io/${account}/edit`}
                rel="noopener noreferrer"
                target="_blank"
              >
                3Box
              </a>
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
}
