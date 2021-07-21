import classNames from "classnames";

const Bell = ({ size = 24, pending = false }) => {
  const cachedClassNames = classNames("relative", {
    "text-type-base": pending,
  });

  const pingClassNames = classNames(
    "absolute transition-opacity duration-150",
    {
      "opacity-0": !pending,
    }
  );

  return (
    <div className={cachedClassNames}>
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path
          className="transition-colors duration-150"
          d="M12 2a1.5 1.5 0 00-1.5 1.5v.695A5.997 5.997 0 006 10v6l-1.535 1.156h-.002A1 1 0 005 19h14a1 1 0 00.537-1.844L18 16v-6a5.997 5.997 0 00-4.5-5.805V3.5A1.5 1.5 0 0012 2zm-2 18c0 1.1.9 2 2 2s2-.9 2-2h-4z"
          fill="currentColor"
        />
      </svg>
      <div className={pingClassNames} style={{ top: 3, right: 2 }}>
        <span className="flex h-2 w-2">
          <span
            className="absolute inline-flex rounded-full h-2 w-2 bg-alert-loading"
            style={{ boxShadow: "0 0 0 2px white" }}
          />
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert-loading" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-alert-loading" />
        </span>
      </div>
    </div>
  );
};

export default Bell;
