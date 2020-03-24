import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./logo";
import Web3Status from "./web3Connection";

const Navigation = () => {
  const { pathname } = useRouter();

  const isHomepage = pathname === "/" ? true : false;

  return (
    <nav className="border-b mb-10">
      <div className="w-full mx-auto max-w-screen-xl">
        <ul className="flex items-center">
          <li className="py-4 flex-1 flex items-center justify-start">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </li>

          {!isHomepage && (
            <ul className="flex flex-1 justify-center items-center py-4 h-20">
              <li>
                <Link href="/stake">
                  <a className="p-3 leading-none mx-4 text-lg font-semibold active-nav-tab">
                    Stake
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/borrow">
                  <a className="p-3 leading-none mx-4 text-lg font-semibold text-grey-pure">
                    Borrow
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/vouch">
                  <a className="p-3 leading-none mx-4 text-lg font-semibold text-grey-pure">
                    Vouch
                  </a>
                </Link>
              </li>
            </ul>
          )}

          <ul className="flex flex-1 items-center justify-end py-4">
            {!isHomepage && (
              <li>
                <span
                  className="leading-none text-2xl"
                  role="img"
                  aria-label="Notification Bell"
                >
                  🔔
                </span>
              </li>
            )}
            <li className="ml-8">
              <Web3Status />
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
