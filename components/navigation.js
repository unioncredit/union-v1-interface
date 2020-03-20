import Link from "next/link";
import Container from "./container";
import Logo from "./logo";
import Web3Status from "./web3Connection";

const Navigation = () => {
  return (
    <nav className="border-b mb-10 py-4">
      <Container wide>
        <ul className="flex items-center justify-between">
          <li>
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </li>

          <ul className="flex items-center">
            <li>
              <Link href="/vouch">
                <a className="p-3 leading-none mx-4 text-lg font-semibold">
                  Vouch
                </a>
              </Link>
            </li>
            <li>
              <Link href="/borrow">
                <a className="p-3 leading-none mx-4 text-lg font-semibold">
                  Borrow
                </a>
              </Link>
            </li>
            <li>
              <Link href="/stake">
                <a className="p-3 leading-none mx-4 text-lg font-semibold">
                  Stake
                </a>
              </Link>
            </li>
          </ul>

          <ul className="flex items-center">
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
      </Container>
    </nav>
  );
};

export default Navigation;
