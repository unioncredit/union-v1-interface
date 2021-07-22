import Discord from "svgs/Discord";
import GitHub from "svgs/GitHub";
import Twitter from "svgs/Twitter";

const FOOTER_LINKS = [
  // {
  //   href: "",
  //   label: "White paper",
  // },
  {
    href: "https://beta.union.finance/stats",
    label: "Stats",
  },
  {
    href: "https://unionfinance.gitbook.io/docs/",
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
    <footer className="border-t text-type-footer border-border-pure py-6">
      <div className="container">
        <div className="flex">
          <div className="w-3/4">
            <ul className="flex flex-col sm:flex-row sm:flex-wrap  text-sm -mr-4 -mb-2">
              {FOOTER_LINKS.map(({ href, label }, i) => (
                <li key={i} className="mb-2 sm:mb-0">
                  <a
                    className="inline-block pb-2 pr-4 hover:underline"
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="sm:mb-0">© 2020 Union.Finance</li>
            </ul>
          </div>
          <ul className="flex w-1/4 justify-end space-x-4">
            <li>
              <a href="https://github.com/unioncredit" aria-label="Github">
                <div className="p-2px">
                  <GitHub size={20} />
                </div>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/unionprotocol" aria-label="Twitter">
                <div className="p-2px">
                  <Twitter size={20} color="currentColor" />
                </div>
              </a>
            </li>
            <li>
              <a href="https://discord.gg/cZagzJ3p8G" aria-label="Discord">
                <div className="p-2px">
                  <Discord size={20} color="currentColor" />
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
