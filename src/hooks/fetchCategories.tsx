import { useEffect, useState } from "react";
import { Category } from "../types/categories";

function FetchCategories(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          setError(true);
          throw Error('something wet wrong');
        }
        const result: Category[] = await response.json();
        setData(result);
      } catch (error) {
        if (error) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default FetchCategories;
