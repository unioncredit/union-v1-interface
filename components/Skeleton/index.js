const Skeleton = ({
  duration = 1.2,
  width = null,
  height = null,
  circle = false,
  style: customStyle,
}) => (
  <span>
    <span
      className="styled-jsx-skeleton"
      style={{
        width,
        height,
        ...customStyle,
      }}
    >
      &zwnj;
    </span>
    <style jsx>{`
      .styled-jsx-skeleton {
        border-radius: ${circle ? "99999px" : "var(--radius)"};
        animation-duration: ${duration}s;
      }
    `}</style>
    <style jsx>{`
      .styled-jsx-skeleton {
        background-color: var(--skeleton-base-color);
        background-image: linear-gradient(
          90deg,
          var(--skeleton-base-color),
          var(--skeleton-highlight-color),
          var(--skeleton-base-color)
        );
        background-size: 200px 100%;
        background-repeat: no-repeat;
        display: inline-block;
        line-height: 1;
        width: 100%;
        animation-name: loading;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }

      @keyframes loading {
        0% {
          background-position: -200px 0;
        }
        100% {
          background-position: calc(200px + 100%) 0;
        }
      }
    `}</style>
  </span>
);

export default Skeleton;
