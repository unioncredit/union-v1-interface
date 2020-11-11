import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { useChainIdUpdater } from "hooks/useChainId";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Button from "../button";
import Logo from "./logo";
import WalletModal from "../modals/WalletModal";
import {
  useToggleCreateModal,
  useToggleSignInModal,
} from "../modals/WalletModal/state";
import Web3Connection from "../web3Connection";
import Activity from "../Activity";

const GetInvitedModal = dynamic(() => import("../modals/GetInvitedModal"));

const LearnMoreModal = dynamic(() => import("../modals/LearnMoreModal"));

const ApplicationModal = dynamic(() => import("../modals/ApplicationModal"));

const NavigationLink = ({ href, children, ...rest }) => {
  const { pathname } = useRouter();

  const isActive = pathname.includes(href) ? true : false;

  const cachedClassNames = classNames(
    "p-2 md:p-3 leading-none md:mx-4 text-lg font-semibold transition-colors duration-150",
    {
      "active-nav-tab": isActive,
      "text-type-lightest": !isActive,
    }
  );

  return (
    <Link href={href} {...rest}>
      <a className={cachedClassNames}>{children}</a>
    </Link>
  );
};

const LogoLink = () => (
  <li className="py-4 lg:w-1/4 h-20 flex items-center justify-start">
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>
  </li>
);

const Navigation = () => {
  const { account, library } = useWeb3React();

  const toggleSignInModal = useToggleSignInModal();
  const toggleCreateModal = useToggleCreateModal();

  useChainIdUpdater();

  return (
    <nav className="border-b bg-white">
      <div className="w-full mx-auto px-4 max-w-screen-xl-gutter">
        {/* Desktop */}
        <ul className="flex items-center md:justify-between">
          <LogoLink />

          {account && library ? (
            <Fragment>
              <li className="py-4 h-20 hidden md:flex flex-1 lg:justify-center">
                <ul className="flex justify-center items-center">
                  <li>
                    <NavigationLink href="/stake">Stake</NavigationLink>
                  </li>
                  <li>
                    <NavigationLink href="/borrow">Borrow</NavigationLink>
                  </li>
                  <li>
                    <NavigationLink href="/vouch">Vouch</NavigationLink>
                  </li>
                  <li>
                    <NavigationLink href="/governance">Vote</NavigationLink>
                  </li>
                </ul>
              </li>

              <li className="flex ml-auto lg:w-1/4 justify-end py-4">
                <ul className="flex items-center">
                  <li>
                    <Activity />
                  </li>
                  <li className="ml-4 sm:ml-6 md:ml-8">
                    <Web3Connection />
                  </li>
                </ul>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="ml-auto mr-4">
                <button
                  className="btn border-transparent font-medium px-4"
                  onClick={toggleSignInModal}
                >
                  Sign in
                </button>
              </li>
              <li>
                <Button secondary onClick={toggleCreateModal}>
                  Start now
                </Button>
              </li>
            </Fragment>
          )}
        </ul>

        {/* Mobile */}
        {!!(account && library) && (
          <ul className="flex md:hidden justify-between sm:justify-evenly whitespace-no-wrap overflow-x-scroll items-center pt-4 pb-6">
            <li>
              <NavigationLink href="/stake">Stake</NavigationLink>
            </li>
            <li>
              <NavigationLink href="/borrow">Borrow</NavigationLink>
            </li>
            <li>
              <NavigationLink href="/vouch">Vouch</NavigationLink>
            </li>
            <li>
              <NavigationLink href="/governance">Vote</NavigationLink>
            </li>
          </ul>
        )}
      </div>

      <WalletModal />
      <GetInvitedModal />
      <LearnMoreModal />

      {!!(account && library) && <ApplicationModal />}
    </nav>
  );
};

export default Navigation;
