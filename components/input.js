import { forwardRef } from "react";
import DAI from "../svgs/DAI";
import Info from "svgs/Info";

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
      ...props
    },
    ref
  ) => {
    return (
      <div className={className}>
        <div className="p-4 w-full rounded border bg-white focus-within:input transition-shadow transition-colors duration-150">
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
            className="inline-flex items-start text-xs leading-tight mt-2"
            id={`${id}InputTip`}
          >
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
