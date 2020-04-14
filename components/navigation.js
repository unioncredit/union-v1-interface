import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import EmailModal from "./emailModal";
import GetInvitedModal from "./getInvitedModal";
import LearnMoreModal from "./learnMoreModal";
import Logo from "./logo";
import WalletModal from "./walletModal";
import Web3Status from "./web3Connection";

const NavigationLink = ({ href, children, ...rest }) => {
  const { pathname } = useRouter();

  const isActive = pathname === href ? true : false;

  const cachedClassNames = classNames(
    "p-3 leading-none mx-4 text-lg font-semibold",
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

const Navigation = () => {
  const { pathname } = useRouter();

  const isHomepage = pathname === "/" ? true : false;

  return (
    <nav className="border-b mb-10">
      <div className="w-full mx-auto px-4 max-w-screen-xl-gutter">
        <ul className="flex items-center">
          <li className="py-4 flex-1 h-20 flex items-center justify-start">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </li>

          {!isHomepage && (
            <ul className="flex flex-1 justify-center items-center py-4 h-20">
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

          <ul className="flex flex-1 justify-end py-4">
            <Web3Status />
          </ul>
        </ul>
      </div>

      <EmailModal />
      <WalletModal />
      <GetInvitedModal />
      <LearnMoreModal />
    </nav>
  );
};

export default Navigation;
