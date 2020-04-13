export default function Error({ statusCode }) {
  return (
    <div className="container">
      <div className="text-center pt-32">
        <h1>Error</h1>
        <p className="text-lg mt-4">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};
