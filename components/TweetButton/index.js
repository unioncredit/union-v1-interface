const { default: Twitter } = require("svgs/Twitter");

const TweetButton = ({ href, children, ...rest }) => (
  <a
    className="flex text-twitter font-semibold space-x-3"
    href={href}
    rel="noopener"
    target="_blank"
    {...rest}
  >
    <Twitter />
    <span>{children}</span>
  </a>
);

export default TweetButton;
