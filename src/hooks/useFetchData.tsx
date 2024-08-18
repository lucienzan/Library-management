import { useEffect, useState } from "react";
import { Resources } from "../types/resources";
interface FetchOptions {
  signal: AbortSignal;
  method: string;
  headers?: { [key: string]: string };
}

function FetchData(url:string, method:string = 'GET') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Resources | null>(null);
  const [postData, setPostData] = useState<Resources | null>(null);

  useEffect(() => {
    const abortController: AbortController = new AbortController();
    const signal = abortController.signal;
    const headers = {};
    let options: FetchOptions & { body?: string } = {
      signal,
      method,
      headers
    };
    const fetchData = () => {
      fetch(url, options).then(res => {
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
    }

    if (method === "POST" && postData) {
      options = {
        ...options,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      }
      fetchData();
    }

    if (method === "GET") {
      fetchData();
    }

    return () => {
      abortController.abort();
    }
  }, [url, postData, method]);
return {setPostData, data, loading, error}
}

export default FetchData;