import Link from "next/link";
import Logo from "./logo";
import Web3Status from "./web3Connection";

const Navigation = () => {
  return (
    <nav className="border-b mb-10">
      <div className="w-full mx-auto max-w-screen-xl">
        <ul className="flex items-center justify-between">
          <li className="py-4">
            <Link href="/">
              <a className="inline-flex items-center h-12">
                <Logo />
              </a>
            </Link>
          </li>

          <ul className="flex items-center py-4 h-20">
            <li>
              <Link href="/stake">
                <a className="p-3 leading-none mx-4 text-lg font-semibold active-nav-tab">
                  Stake
                </a>
              </Link>
            </li>
            <li>
              <Link href="/borrow">
                <a className="p-3 leading-none mx-4 text-lg font-semibold active-nav-tab">
                  Borrow
                </a>
              </Link>
            </li>
            <li>
              <Link href="/vouch">
                <a className="p-3 leading-none mx-4 text-lg font-semibold active-nav-tab">
                  Vouch
                </a>
              </Link>
            </li>
          </ul>

          <ul className="flex items-center py-4">
            <li className="mr-8">
              <span
                className="leading-none text-2xl"
                role="img"
                aria-label="Notification Bell"
              >
                🔔
              </span>
            </li>
            <li>
              <Web3Status />
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
