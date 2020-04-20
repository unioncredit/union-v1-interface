export default function Error({ statusCode }) {
  return (
    <div className="container">
      <div className="text-center py-32">
        <h1>Something went wrong</h1>
        <p className="text-lg mt-4">
          An unexpected error occurred.{" "}
          <a className="underline" href="mailto:support@union.finance">
            Contact Support
          </a>
          .
        </p>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};
