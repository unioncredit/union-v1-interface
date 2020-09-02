import Link from "next/link";
import GitHub from "svgs/GitHub";
import Twitter from "svgs/Twitter";

const FOOTER_LINKS = [
  // {
  //   href: "",
  //   label: "White paper",
  // },
  {
    href: "https://unionfinance.gitbook.io/union-docs/",
    label: "Documentation",
  },
  // {
  //   href: "",
  //   label: "Terms of Service",
  // },
  {
    href: "https://medium.com/union-finance",
    label: "Blog",
  },
  // {
  //   href: "",
  //   label: "Forum",
  // },
  // {
  //   href: "",
  //   label: "FAQ",
  // },
];

const Footer = () => {
  return (
    <footer className="border-t border-border-pure text-type-footer text-sm py-6">
      <div className="container">
        <div className="flex">
          <div className="w-3/4">
            <ul className="flex flex-col sm:flex-row sm:flex-wrap space-y-2 sm:space-y-0 sm:space-x-4">
              <li>
                <Link href="/faucet">
                  <a className="block hover:underline">Faucet</a>
                </Link>
              </li>
              <li>
                <Link href="/governance">
                  <a className="block hover:underline">Governance</a>
                </Link>
              </li>
              <li>
                <Link href="/stats">
                  <a className="block hover:underline">Stats</a>
                </Link>
              </li>
              {FOOTER_LINKS.map(({ href, label }, i) => (
                <li key={i}>
                  <a
                    className="block hover:underline"
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>© 2020 Union.Finance</li>
            </ul>
          </div>
          <ul className="w-1/4 flex justify-end space-x-4">
            <li>
              <a
                className="block hover:opacity-75 duration-150 transition-opacity"
                href="https://github.com/unioncredit"
                aria-label="Github"
              >
                <div className="p-2px">
                  <GitHub size={20} />
                </div>
              </a>
            </li>
            <li>
              <a
                className="block hover:opacity-75 duration-150 transition-opacity"
                href="https://twitter.com/unionprotocol"
                aria-label="Twitter"
              >
                <div className="p-2px">
                  <Twitter size={20} color="currentColor" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
