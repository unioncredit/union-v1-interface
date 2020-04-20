const Snippet = () => (
  <div className="relative select-none flex justify-center lg:justify-start pt-8 md:pt-0">
    <img
      className="w-16 lg:w-32 absolute -mt-8 lg:-ml-20 lg:-mt-12"
      src="/images/snippet.svg"
      alt=""
    />
    <div className="flex-1 rounded-lg bg-black-dark px-6 pt-10 pb-6 lg:px-12 text-white leading-tight overflow-hidden text-sm sm:text-base">
      <div role="presentation">
        <pre role="presentation">
          <span role="presentation">
            <span className="pl-k">contract</span>{" "}
            <span className="pl-c1">LendingMarket</span>{" "}
            <span className="text-type-light">...</span> {"{"}
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;
            <span className="pl-k">function</span>{" "}
            <span className="pl-en">borrow</span>(
            <span className="pl-c1">uint256</span> <span>amount</span>)
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="pl-k">external</span>
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="pl-k">onlyMember</span>(
            <span className="pl-k">msg</span>.
            <span className="pl-k">sender</span>
            <span>)</span>
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="pl-k">whenNotPaused</span>(
            <span className="pl-k">address</span>(
            <span className="pl-k">poolToken</span>
            ))
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">&nbsp;</span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;
            <span className="pl-k">function</span>{" "}
            <span className="pl-en">repay</span>(
            <span className="pl-c1">uint256</span> <span>amount</span>)
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="pl-k">external</span>
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="pl-k">onlyMember</span>(
            <span className="pl-k">msg</span>.
            <span className="pl-k">sender</span>
            <span>)</span>
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="pl-k">whenNotPaused</span>(
            <span className="pl-k">address</span>(
            <span className="pl-k">poolToken</span>
            ))
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">{"}"}</span>
        </pre>
      </div>
    </div>
  </div>
);

export default Snippet;
