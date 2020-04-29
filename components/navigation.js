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
    "p-2 md:p-3 leading-none md:mx-4 text-lg font-semibold",
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
    <nav className="border-b bg-white">
      <div className="w-full mx-auto px-4 max-w-screen-xl-gutter">
        <ul className="flex items-center justify-between">
          <li className="py-4 md:w-1/4 h-20 flex items-center justify-start">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </li>

          {!isHomepage && (
            <ul className="hidden md:flex flex-1 justify-center items-center py-4 h-20">
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

          <ul className="flex md:w-1/4 justify-end py-4">
            <a href="https://app.asana.com/0/1156322622401809/1173317538038115" className="btn btn-secondary px-10">
              Apply
            </a>

            {/* <Web3Status /> */}
          </ul>
        </ul>

        {!isHomepage && (
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

      <EmailModal />
      <WalletModal />
      <GetInvitedModal />
      <LearnMoreModal />
    </nav>
  );
};

export default Navigation;
