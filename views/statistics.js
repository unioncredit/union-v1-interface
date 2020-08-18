import { Fragment } from "react";

export default function StatsView() {
  return (
    <Fragment>
      <section>
        <div className="container">
          <h1>Union Stats</h1>
        </div>
      </section>

      <section className="pt-12 sm:pt-24">
        <div className="container mb-8">
          <h2>Global Lending</h2>
        </div>

        <div className="container">
          <div className="flex divide-x">
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label 2</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label 3</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label 4</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label 5</div>
          </div>
        </div>
      </section>

      <section className="pt-12 sm:pt-24">
        <div className="container mb-8">
          <h2>Asset Management</h2>
        </div>

        <div className="container">
          <div className="flex divide-x">
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label 2</div>
          </div>
        </div>
      </section>

      <section className="pt-12 sm:pt-24">
        <div className="container mb-8">
          <h2>UNION Token</h2>
        </div>

        <div className="container">
          <div className="flex divide-x">
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label 2</div>
          </div>
        </div>
      </section>

      <section className="pt-12 sm:pt-24">
        <div className="container mb-8">
          <h2>Current Parameter Values</h2>
        </div>

        <div className="container">
          <div className="flex divide-x">
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
            <div className="flex-1 flex justify-center p-4 sm:p-6">Label</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
