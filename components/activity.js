import { Menu, MenuButton, MenuList } from "@reach/menu-button";
import { useWeb3React } from "@web3-react/core";
import useActivity from "hooks/useActivity";
import { Pending } from "svgs/Alerts";
import Bell from "svgs/Bell";
import BellCircle from "svgs/BellCircle";
import Spinner from "svgs/Spinner";
import getEtherscanLink from "util/getEtherscanLink";
import truncateAddress from "util/truncateAddress";
import Identicon from "./identicon";

const Activity = () => {
  const { chainId } = useWeb3React();
  const { data } = useActivity();

  return (
    <Menu>
      <MenuButton className="h-8 w-8 bg-white hover:bg-border-light transition-colors duration-150 items-center justify-center flex rounded focus:outline-none focus:shadow-outline">
        <Bell pending={data && data.length > 0} />
      </MenuButton>

      <MenuList className="mt-4 w-80">
        <div className="p-4 border-b">
          <p className="text-lg font-semibold leading-none">Activity</p>
        </div>
        <div className="p-4">
          {data ? (
            data.length > 0 ? (
              <ul className="divide-y space-y-4 -mt-4">
                {data.map((log, i) => {
                  if (log.type === "UpdateTrust")
                    return (
                      <li key={i} className="text-sm pt-4">
                        <div className="flex space-x-4">
                          <div>
                            <Identicon address={log.borrower} large />
                          </div>
                          <div>
                            <p className="whitespace-normal leading-snug crop-snug mb-2">
                              <strong>{truncateAddress(log.borrower)}</strong>{" "}
                              now trusts you with{" "}
                              <strong>{log.trustAmount} DAI</strong>
                            </p>
                            <div className="flex justify-between leading-none text-type-light space-x-2">
                              <p>
                                <a
                                  className="underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={getEtherscanLink(
                                    chainId,
                                    log.hash,
                                    "TRANSACTION"
                                  )}
                                >
                                  See details
                                </a>
                              </p>
                              <p className="text-right">{log.date}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );

                  if (log.type === "ApplyMember")
                    return (
                      <li key={i} className="text-sm pt-4">
                        <div className="flex space-x-4">
                          <div>
                            <Pending size={32} />
                          </div>
                          <div>
                            <p className="whitespace-normal leading-snug crop-snug mb-2">
                              <strong>Congratulations</strong> you are now a
                              member of Union.
                            </p>
                            <div className="flex justify-between leading-none text-type-light space-x-2">
                              <span />
                              <p className="text-right">{log.date}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );

                  return (
                    <li key={i}>
                      {/* <pre>
                        <code>{JSON.stringify(log, null, 2)}</code>
                      </pre> */}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="pt-6 pb-4  flex flex-col items-center">
                <BellCircle />
                <p className="mt-4 text-center">
                  You don't have
                  <br />
                  any notifications yet
                </p>
              </div>
            )
          ) : (
            <div className="flex p-4  items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </MenuList>
    </Menu>
  );
};

export default Activity;
