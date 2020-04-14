import { forwardRef } from "react";
import DAI from "../svgs/DAI";

const Input = forwardRef(
  (
    {
      autoComplete = "off",
      chip,
      className,
      id,
      label,
      tip,
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <div className={className}>
        <div className="p-4 w-full rounded border bg-white focus-within:input transition-shadow transition-colors duration-150">
          {label && (
            <label className="block leading-none mb-2 text-sm" htmlFor={id}>
              {label}
            </label>
          )}

          <div className="flex">
            <input
              autoComplete={autoComplete}
              className="focus:outline-none text-lg leading-snug flex-1 text-overflow-clip"
              id={id}
              name={id}
              ref={ref}
              type={type}
              {...props}
              {...(tip && { "aria-describedby": `${id}InputTip` })}
            />

            {chip && (
              <div className="flex items-center select-none ml-2">
                <DAI />
                <span className="font-semibold ml-2 leading-3">DAI</span>
              </div>
            )}
          </div>
        </div>

        {tip && (
          <span
            className="block text-xs leading-tight mt-2"
            id={`${id}InputTip`}
          >
            <span role="img" aria-label="Information">
              ℹ️
            </span>{" "}
            {tip}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
