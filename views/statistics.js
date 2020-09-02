import { Fragment } from "react";

export default function StatsView() {
  return (
    <Fragment>
      <section>
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl">Union Stats</h1>
          </div>

          <ul className="flex space-x-3">
            <li>
              <a
                className="inline-block rounded py-2 px-4 font-medium bg-black-pure hover:bg-black-dark duration-150 transition-colors text-white"
                href="#"
              >
                Global Lending
              </a>
            </li>
            <li>
              <a
                className="inline-block rounded py-2 px-4 font-medium hover:bg-black-pure hover:bg-opacity-10 duration-150 transition-colors text-type-base "
                href="#"
              >
                Asset Management
              </a>
            </li>
            <li>
              <a
                className="inline-block rounded py-2 px-4 font-medium hover:bg-black-pure hover:bg-opacity-10 duration-150 transition-colors text-type-base "
                href="#"
              >
                UNION Token
              </a>
            </li>
            <li>
              <a
                className="inline-block rounded py-2 px-4 font-medium hover:bg-black-pure hover:bg-opacity-10 duration-150 transition-colors text-type-base "
                href="#"
              >
                Current Parameters
              </a>
            </li>
          </ul>
        </div>
      </section>
    </Fragment>
  );
}
