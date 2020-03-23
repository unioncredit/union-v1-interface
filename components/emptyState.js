import Link from "next/link";

const EmptyState = ({
  text = "Borrow without collateral and earn higher interest on your deposits if you are a member.",
  link = "/vouch",
  linkText = "Become a member"
}) => (
  <div className="flex items-center flex-col h-full">
    <div className="mt-8 h-40 bg-primary-500 w-24" />
    <p className="text-xl text-center my-6 max-w-md">{text}</p>
    <Link href={link}>
      <a className="btn btn-primary">{linkText}</a>
    </Link>
  </div>
);

export default EmptyState;
