import { forwardRef } from "react";

const Input = forwardRef(
  ({ className, id, label, chip, tip, ...props }, ref) => {
    return (
      <div className={className}>
        <div className="p-4 w-full rounded border bg-white">
          {label && (
            <label className="block leading-none mb-2 text-sm" htmlFor={id}>
              {label}
            </label>
          )}

          <div className="flex">
            <input
              id={id}
              name={id}
              ref={ref}
              type="text"
              className="focus:outline-none focus:shadow-outline text-lg leading-snug flex-1"
              autoComplete="off"
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
            {tip}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
