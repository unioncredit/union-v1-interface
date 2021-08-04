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

import { Nav, NavItem } from "union-ui";

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
    <>
      <Nav>
        <NavItem
          label="Get Started"
          icon="credit"
          active
          description="Get vouched for to become a member and stake your DAI to collect UNION "
        />
        <NavItem label="Credit" icon="credit" />
        <NavItem label="Contacts" icon="contacts" />
        <NavItem label="Vote" icon="vote" />
      </Nav>
      <WalletModal />
      <GetInvitedModal />
      <LearnMoreModal />

      {!!(account && library) && <ApplicationModal />}
    </>
  );
};

export default Navigation;
