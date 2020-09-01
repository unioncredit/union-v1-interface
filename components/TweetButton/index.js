import Twitter from "svgs/Twitter";

const TweetButton = ({ href, children, ...rest }) => (
  <a href={href} rel="noopener noreferrer" target="_blank" {...rest}>
    <div className="inline-flex space-x-3">
      <Twitter />
      <span className="text-twitter font-semibold">{children}</span>
    </div>
  </a>
);

export default TweetButton;
