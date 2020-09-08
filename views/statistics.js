import { Fragment } from "react";

export default function StatsView() {
  return (
    <Fragment>
      <section className="mb-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl">Union Stats</h1>
          </div>

          <ul className="flex flex-wrap -mb-2">
            <li className="pr-2 pb-2">
              <a
                className="inline-block rounded py-2 px-4 font-medium bg-black-pure hover:bg-black-dark duration-150 transition-colors text-white"
                href="#"
              >
                Global Lending
              </a>
            </li>
            <li className="pr-2 pb-2">
              <a
                className="inline-block rounded py-2 px-4 font-medium hover:bg-black-pure hover:bg-opacity-10 duration-150 transition-colors text-type-base "
                href="#"
              >
                Asset Management
              </a>
            </li>
            <li className="pr-2 pb-2">
              <a
                className="inline-block rounded py-2 px-4 font-medium hover:bg-black-pure hover:bg-opacity-10 duration-150 transition-colors text-type-base "
                href="#"
              >
                UNION Token
              </a>
            </li>
            <li className="pr-2 pb-2">
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

      <section className="mb-8">
        <div className="container">
          <div className="divider" />
        </div>
      </section>

      <section className="mb-8">
        <div className="container">
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <li className="border rounded p-4 sm:p-6">
              <p className="crop-snug leading-snug mb-4">Label</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold crop-snug leading-snug">
                  Value
                </p>
                <p className="text-sm leading-none">+100%</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </Fragment>
  );
}
