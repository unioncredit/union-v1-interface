import Link from "next/link";
import Button from "./button";
import Logo from "./logo";

const LogoLink = () => (
  <li className="py-4 md:w-1/4 h-20 flex items-center justify-start">
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>
  </li>
);

const Navigation = () => {
  return (
    <nav className="border-b bg-white">
      <div className="w-full mx-auto px-4 max-w-screen-xl-gutter">
        <ul className="flex items-center justify-between">
          <LogoLink />

          <li className="ml-auto">
            <Button href="/waitlist" secondary>
              Get started
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
