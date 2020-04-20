import Link from "next/link";
import GitHub from "svgs/GitHub";
import Twitter from "svgs/Twitter";

const FOOTER_LINKS = [
  {
    href: "",
    label: "White paper",
  },
  {
    href: "",
    label: "Documentation",
  },
  {
    href: "",
    label: "Terms of Service",
  },
  {
    href: "",
    label: "Blog",
  },
  {
    href: "",
    label: "Forum",
  },
  {
    href: "",
    label: "FAQ",
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border-pure py-6">
      <div className="container">
        <div className="flex">
          <div className="w-3/4">
            <ul className="flex flex-col sm:flex-row sm:flex-wrap text-type-lightest text-sm -mr-4 -mb-2">
              <li className="pb-2 pr-4">
                <Link href="/faucet">
                  <a className="hover:underline">Faucet</a>
                </Link>
              </li>
              {FOOTER_LINKS.map(({ href, label }, i) => (
                <li key={i} className="pb-2 pr-4">
                  <a className="hover:underline" href={href}>
                    {label}
                  </a>
                </li>
              ))}
              <li className="pb-2 pr-4">© 2020 Union.Finance</li>
            </ul>
          </div>
          <ul className="flex w-1/4 justify-end text-type-lightest">
            <li className="ml-4">
              <a href="https://github.com/unioncredit">
                <div className="p-2px">
                  <GitHub size={20} />
                </div>
              </a>
            </li>
            <li className="ml-4">
              <a href="https://twitter.com/unionprotocol">
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
