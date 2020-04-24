/**
 *
 * @example const BrokenComponent = () => {
 *  const [data, setData] = React.useState(null);
  const throwError = useAsyncError();
  
  React.useEffect(() => {
    fetch("http://some-site.wtf/rest")
      .then(res => res.json())
      .then(setData)
      .catch(e => {
        throwError(new Error("Asynchronous error"));
      });
  }, []);
  
  return data;
};
 */
export default function useAsyncError() {
  const [_, setError] = React.useState();

  return React.useCallback(
    (e) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
}
