const Snippet = () => (
  <div className="relative flex justify-center lg:justify-start pt-8 md:pt-0">
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
            <span className="pl-c1">CToken</span>{" "}
            <span className="pl-k">is</span> IERC20 {"{"}
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;
            <span className="pl-k">function</span>{" "}
            <span className="pl-en">supplyRatePerBlock</span>
            ()
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="pl-k">external view returns</span> (
            <span className="pl-c1">uint256</span>);
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">&nbsp;</span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;
            <span className="pl-k">function</span>{" "}
            <span className="pl-en">mint</span>(
            <span className="pl-c1">uint256</span> <span>mintAmount</span>)
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="pl-k">external returns</span> (
            <span className="pl-c1">uint256</span>);
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">&nbsp;</span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;
            <span className="pl-k">function</span>{" "}
            <span className="pl-en">redeemUnderlying</span>(
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="pl-c1">uint256</span> <span>redeemAmount</span>
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;) <span className="pl-k">external returns</span> (
            <span className="pl-c1">uint256</span>);
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
