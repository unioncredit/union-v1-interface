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
          <ul className="flex w-3/4 flex-wrap text-grey-pure text-sm -mr-4 -mb-2">
            {FOOTER_LINKS.map(({ href, label }, i) => (
              <li key={i} className="pb-2 pr-4">
                <a className="hover:underline" href={href}>
                  {label}
                </a>
              </li>
            ))}
            <li className="pb-2 pr-4">© 2020 Union.Finance</li>
          </ul>
          <ul className="flex w-1/4 justify-end">
            <li className="ml-4">
              <div className="h-6 w-6 rounded-full bg-grey-light"></div>
            </li>
            <li className="ml-4">
              <div className="h-6 w-6 rounded-full bg-grey-light"></div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
