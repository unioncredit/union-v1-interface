import Link from "next/link";
import Logo from "./logo";
import Web3Status from "./web3status";

const Navigation = () => {
  return (
    <nav>
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

      <style jsx>{`
        nav {
          border-bottom: 1px solid;
        }

        a {
          font-weight: bold;
          text-decoration: none;
        }

        ul {
          margin: 0;
          padding-left: 0;
          list-style: none;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
