import { forwardRef } from "react";

const Input = forwardRef(
  ({ className, id, label, type = "text", chip, tip, ...props }, ref) => {
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
              autoComplete="off"
              className="focus:outline-none text-lg leading-snug flex-1"
              id={id}
              name={id}
              ref={ref}
              type={type}
              {...props}
              {...(tip && { "aria-describedby": `${id}InputTip` })}
            />

            {chip && (
              <span className="font-semibold ml-4 select-none">DAI</span>
            )}
          </div>
        </div>

        {tip && (
          <span
            className="block text-xs leading-tight mt-2"
            id={`${id}InputTip`}
          >
            {tip}{" "}
            <span role="img" aria-label="Information">
              ℹ️
            </span>
          </span>
        )}
      </div>
    );
  }
);

export default Input;
