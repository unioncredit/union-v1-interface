import Link from "next/link";
import Container from "./container";
import Logo from "./logo";
import Web3Status from "./web3Connection";

const Navigation = () => {
  return (
    <nav className="border-b">
      <Container wide>
        <ul>
          <li>
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/vouch">
              <a className="text-lg font-semibold">Vouch</a>
            </Link>
          </li>
          <li>
            <Link href="/borrow">
              <a className="text-lg font-semibold">Borrow</a>
            </Link>
          </li>
          <li>
            <Link href="/stake">
              <a className="text-lg font-semibold">Stake</a>
            </Link>
          </li>
          <li>
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
      </Container>
    </nav>
  );
};

export default Navigation;
