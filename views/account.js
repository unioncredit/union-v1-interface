import { useWeb3React } from "@web3-react/core";
import Identicon from "components/identicon";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import useCopy from "hooks/useCopy";
import useENSName from "hooks/useENSName";
import { Fragment } from "react";
import getIPFSAssetLink from "util/getIPFSAssetLink";
import truncateAddress from "util/truncateAddress";

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
          <div className="bg-white border rounded px-4 py-8 sm:px-6 sm:py-10">
            <div className="flex justify-center">
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
            </div>

            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                {data?.name ?? ENSName ?? truncateAddress(account, 6)}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="focus:outline-none leading-none font-medium text-type-light"
                title={account}
              >
                {isCopied ? "Copied!" : ENSName ?? truncateAddress(account, 6)}
              </button>
            </div>

            {has3BoxName ? (
              <p className="mt-8 text-center">
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
            ) : (
              <p className="mt-8 text-center">
                Setup your public profile{" "}
                <a
                  className="underline"
                  href={`https://3box.io/${account}/edit`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  on 3Box
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
