import React from "react";

export function useAPIQuery<P>(f: () => Promise<P>) {
  const [hooks, setHooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [payload, setPayload] = React.useState<P | null>(null);

  function reset() {
    setLoading(false);
    setPayload(null);
    setError(null);
  }

  async function makeRequest() {
    reset();
    setLoading(true);
    try {
      setPayload(await f());
    } catch (e) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    // Make request asynchronously
    makeRequest();

    // Cleanup function
    return () => {
      setLoading(false);
    };
  }, []);

  return { reset, makeRequest, payload, loading, error };
}

export default useAPIQuery;
