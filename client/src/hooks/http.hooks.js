import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const clearError = useCallback(()=> setError(false), []);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        let response = await fetch(url, {
          method,
          body,
          headers,
        });
        response = await response.json();
        setLoading(false);
        return response;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw new Error(e.message);
      }
    },
    []
  );

  return { loading, request, error, clearError };
};
