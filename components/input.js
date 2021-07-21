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
      setMaxLabel = "Max:",
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
      "text-sm text-error-pure bg-error-pure bg-opacity-10 py-2 px-4 -mx-4 -mb-4 mt-2 error-triangle",
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
                  {`${setMaxLabel} ${setMaxValue}`}
                </button>
              )}
            </div>
          )}

          <div className="flex">
            <input
              autoComplete={autoComplete}
              className="focus:outline-none text-lg leading-snug w-full text-overflow-clip"
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

          <div
            className={errorClassNames}
            title={error?.message}
            id={`${id}Error`}
          >
            <div className="leading-tight crop-tight">{error?.message}</div>
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

export const Textarea = forwardRef(
  ({ id, tip, label, className, error, ...props }, ref) => {
    const wrapperClassNames = classNames(
      "p-4 w-full rounded border bg-white focus-within:shadow-input transition duration-150",
      error && "border-error-dark"
    );

    const errorClassNames = classNames(
      "text-sm text-error-pure bg-error-pure bg-opacity-10 py-2 px-4 -mx-4 -mb-4 mt-2 error-triangle",
      error ? "block" : "hidden"
    );

    return (
      <div className={className}>
        <div className={wrapperClassNames}>
          {label && (
            <div className="flex items-center justify-between mb-2 text-type-light text-sm leading-none">
              {label && (
                <label className="block" htmlFor={id}>
                  {label}
                </label>
              )}
            </div>
          )}

          <div className="flex">
            <textarea
              className="focus:outline-none text-lg leading-snug w-full text-overflow-clip"
              style={{ minHeight: 200 }}
              id={id}
              name={id}
              ref={ref}
              aria-describedby={`${id}Error`}
              aria-invalid={error ? "true" : "false"}
              {...props}
            />
          </div>

          <div
            className={errorClassNames}
            title={error?.message}
            id={`${id}Error`}
          >
            <div className="leading-tight crop-tight">{error?.message}</div>
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

export const Select = forwardRef(
  (
    {
      id,
      tip,
      label,
      className,
      placeholder = "Choose...",
      options = [],
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
      "text-sm text-error-pure bg-error-pure bg-opacity-10 py-2 px-4 -mx-4 -mb-4 mt-2 error-triangle",
      error ? "block" : "hidden"
    );

    return (
      <div className={className}>
        <div className={wrapperClassNames}>
          {label && (
            <div className="flex items-center justify-between mb-2 text-type-light text-sm leading-none">
              {label && (
                <label className="block" htmlFor={id}>
                  {label}
                </label>
              )}
            </div>
          )}

          <div className="flex">
            <select
              className="focus:outline-none text-lg leading-snug w-full text-overflow-clip"
              id={id}
              name={id}
              ref={ref}
              aria-describedby={`${id}Error`}
              aria-invalid={error ? "true" : "false"}
              {...props}
            >
              <option value="">{placeholder}</option>
              {options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div
            className={errorClassNames}
            title={error?.message}
            id={`${id}Error`}
          >
            <div className="leading-tight crop-tight">{error?.message}</div>
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
