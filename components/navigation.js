import Link from "next/link";
import Container from "./container";
import Logo from "./logo";
import Web3Status from "./web3Connection";

const Navigation = () => {
  return (
    <nav>
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
              <a>Vouch</a>
            </Link>
          </li>
          <li>
            <Link href="/borrow">
              <a>Borrow</a>
            </Link>
          </li>
          <li>
            <Link href="/stake">
              <a>Stake</a>
            </Link>
          </li>
          <li>ACTIVITY</li>
          <li>
            <Web3Status />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navigation;
