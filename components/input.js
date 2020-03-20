import { forwardRef } from "react";

const Input = forwardRef(({ label, tip, ...props }, ref) => {
  return (
    <div>
      <input
        ref={ref}
        type="text"
        {...[...props, tip && { "aria-describedby": `inputTip` }]}
      />

      {tip && (
        <div>
          <span id={`inputTip`}>{tip}</span>
        </div>
      )}
    </div>
  );
});

export default Input;
