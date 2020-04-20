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
            <span className="text-type-light">// Get max credit limit</span>
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            <span className="pl-k">function</span>{" "}
            <span className="pl-en">getCreditLimit</span>(<span>account</span>)
            {" {"}
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;
            <span className="pl-k">return</span>{" "}
            <span className="pl-c1">creditLimit</span>
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">{"}"}</span>
        </pre>
        <pre role="presentation">
          <span role="presentation">&nbsp;</span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            <span className="text-type-light">
              // Borrow up to max credit limit
            </span>
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            <span className="pl-k">function</span>{" "}
            <span className="pl-en">borrowMax</span>() {"{"}
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;
            <span className="pl-k">const</span>{" "}
            <span className="pl-c1">max</span> ={" "}
            <span className="pl-en">
              getCreditLimit(<span className="pl-c1">account</span>)
            </span>
          </span>
        </pre>
        <pre role="presentation">
          <span role="presentation">
            &nbsp;&nbsp;
            <span className="pl-en">borrow</span>
            <span>
              (<span className="pl-c1">max</span>)
            </span>
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
