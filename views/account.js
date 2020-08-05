import { useWeb3React } from "@web3-react/core";
import Identicon from "components/identicon";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import useCopy from "hooks/useCopy";
import useENSName from "hooks/useENSName";
import { Fragment } from "react";
import getIPFSAssetLink from "util/getIPFSAssetLink";
import truncateAddress from "util/truncateAddress";
import Input from "components/input";
import Tooltip from "@reach/tooltip";

export default function AccountView() {
  const { account } = useWeb3React();

  const ENSName = useENSName(account);

  const [isCopied, copy] = useCopy();
  const handleCopy = () => copy(account);

  const { data, error } = use3BoxPublicData(account);
  const has3BoxName = !!data && !error && data?.name;
  const has3BoxProfileImage = !!data && !error && data?.image;

  return (
    <Fragment>
      <div className="container">
        <div className="max-w-sm mx-auto">
          <h1 className="h-12 leading-12 mb-4">My account</h1>
          <div className="bg-white border rounded p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center">
                {has3BoxProfileImage ? (
                  <img
                    alt={account}
                    async
                    className="rounded-full"
                    decoding="async"
                    loading="lazy"
                    src={getIPFSAssetLink(data.image)}
                    style={{ height: 72, width: 72 }}
                  />
                ) : (
                  <Identicon address={account} extraLarge />
                )}
                <div className="ml-4">
                  <p
                    className="text-xl font-semibold  leading-tight"
                    title={account}
                  >
                    {truncateAddress(account, 6)}
                  </p>
                  <button
                    className="text-sm font-medium underline focus:outline-none"
                    onClick={handleCopy}
                    type="button"
                  >
                    {isCopied ? "Copied" : "Copy Address"}
                  </button>
                </div>
              </div>
            </div>

            <Input
              label="Your name"
              readOnly
              value={data?.name ?? ENSName}
              tip={
                has3BoxName ? (
                  <span>
                    Looks like you're using 3box! Update your public profile{" "}
                    <a
                      className="underline"
                      href={`https://3box.io/${account}/edit`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      on 3Box
                    </a>
                  </span>
                ) : (
                  <span>
                    Setup your public profile{" "}
                    <a
                      className="underline"
                      href={`https://3box.io/${account}/edit`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      on 3Box
                    </a>
                  </span>
                )
              }
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
