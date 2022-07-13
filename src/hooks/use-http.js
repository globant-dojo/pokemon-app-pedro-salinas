import { useCallback, useState } from "react";

export const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : { "Content-Type": "application/json" },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Solicitud fallida!");
      }

      const data = await response.json();
      applyData(data);
    } catch (e) {
      setError(e.message || "Algo ha salido mal!");
    }
    setLoading(false);
  }, []);
  return {
    loading,
    error,
    sendRequest,
  };
};
