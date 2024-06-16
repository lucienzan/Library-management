import { useEffect, useState } from "react";
import { Resources } from "../types/resources";

function FetchData(url:string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Resources | null>(null);

  useEffect(() => {
    const abortController: AbortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    fetch(url, {
      signal
    }).then(res => {
      if (!res.ok) {
        setError(true);
        throw Error('something wet wrong');
      }
      return res.json();
    }).then(data => {
      setData(data);
      setError(false);
      setLoading(false);
    }).catch(e => {
      setError(true);
    });

    return () => {
      abortController.abort();
    }
  }, [url]);
return {data, loading, error}
}

export default FetchData;