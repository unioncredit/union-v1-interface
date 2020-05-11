import classNames from "classnames";
import { forwardRef } from "react";
import Info from "svgs/Info";
import DAI from "../svgs/DAI";

const Input = forwardRef(
  (
    {
      id,
      tip,
      chip,
      type = "text",
      label,
      setMax,
      className,
      setMaxValue,
      autoComplete = "off",
      error,
      ...props
    },
    ref
  ) => {
    const wrapperClassNames = classNames(
      "p-4 w-full rounded border bg-white focus-within:shadow-input transition duration-150",
      error && "border-error-dark"
    );

    const errorClassNames = classNames(
      "text-sm whitespace-nowrap text-error-pure bg-error-pure bg-opacity-10 py-2 px-4 -mx-4 -mb-4 mt-2 leading-none",
      error ? "block" : "hidden"
    );

    return (
      <div className={className}>
        <div className={wrapperClassNames}>
          {(label || setMax) && (
            <div className="flex items-center justify-between mb-2 text-type-light text-sm leading-none">
              {label && (
                <label className="block" htmlFor={id}>
                  {label}
                </label>
              )}
              {setMax && (
                <button
                  type="button"
                  onClick={setMax}
                  className="underline focus:outline-none font-medium"
                >
                  Max: {setMaxValue}
                </button>
              )}
            </div>
          )}

          <div className="flex">
            <input
              autoComplete={autoComplete}
              className="focus:outline-none text-lg leading-snug flex-1 text-overflow-clip"
              id={id}
              name={id}
              ref={ref}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              type={type}
              aria-describedby={`${id}Error`}
              aria-invalid={error ? "true" : "false"}
              {...props}
            />

            {chip && (
              <div className="flex items-center select-none ml-2">
                <DAI />
                <span className="font-semibold ml-2 leading-3">DAI</span>
              </div>
            )}
          </div>

          <div className={errorClassNames} id={`${id}Error`}>
            {error?.message}
          </div>
        </div>

        {tip && (
          <span className="inline-flex items-start text-xs leading-tight mt-2">
            <div className="mr-2">
              <Info />
            </div>
            {tip}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
