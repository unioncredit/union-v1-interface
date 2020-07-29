import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Button from "./button";
import Logo from "./logo";
import WalletModal from "./WalletModal";
import {
  useToggleCreateModal,
  useToggleSignInModal,
} from "./WalletModal/state";
import Web3Status from "./web3Connection";

const GetInvitedModal = dynamic(() => import("./GetInvitedModal"));

const LearnMoreModal = dynamic(() => import("./LearnMoreModal"));

const ApplicationModal = dynamic(() => import("./ApplicationModal"));

const SuccessModal = dynamic(() => import("./SuccessModal"));

const NavigationLink = ({ href, children, ...rest }) => {
  const { pathname } = useRouter();

  const isActive = pathname === href ? true : false;

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
  <li className="py-4 md:w-1/4 h-20 flex items-center justify-start">
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>
  </li>
);

const Navigation = () => {
  const { pathname } = useRouter();

  const { account, library } = useWeb3React();

  const isHomepage = pathname === "/" ? true : false;

  const toggleSignInModal = useToggleSignInModal();
  const toggleCreateModal = useToggleCreateModal();

  return (
    <nav className="border-b bg-white">
      <div className="w-full mx-auto px-4 max-w-screen-xl-gutter">
        {/* Desktop */}
        <ul className="flex items-center justify-between">
          <LogoLink />

          {!!(account && library) ? (
            <Fragment>
              <li className="py-4 h-20 hidden md:flex flex-1 justify-center">
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
                </ul>
              </li>

              <li className="flex md:w-1/4 justify-end py-4">
                <Web3Status />
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
          <ul className="flex md:hidden justify-between sm:justify-evenly items-center pt-4 pb-6">
            <li>
              <NavigationLink href="/stake">Stake</NavigationLink>
            </li>
            <li>
              <NavigationLink href="/borrow">Borrow</NavigationLink>
            </li>
            <li>
              <NavigationLink href="/vouch">Vouch</NavigationLink>
            </li>
          </ul>
        )}
      </div>

      <WalletModal />
      <GetInvitedModal />
      <LearnMoreModal />
      <SuccessModal />

      {!!(account && library) && <ApplicationModal />}
    </nav>
  );
};

export default Navigation;
