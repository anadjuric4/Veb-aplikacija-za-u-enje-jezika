import { useState, useEffect } from "react";

/**
 * Custom hook za fetch podataka sa API-ja
 * Koristi useState i useEffect
 * 
 * @param {string} url - URL za fetch
 * @param {object} options - Opcije za fetch (method, headers, body...)
 * @param {array} dependencies - Zavisnosti za ponovni fetch
 * @returns {object} - { data, loading, error, refetch }
 */
export function useFetch(url, options = {}, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        
        const headers = {
          "Content-Type": "application/json",
          ...options.headers,
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          ...options,
          headers,
          signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(err.message);
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup funkcija - otkazuje fetch ako se komponenta unmount-uje
    return () => {
      controller.abort();
    };
  }, [url, refetchIndex, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  // Funkcija za manuelni refetch
  const refetch = () => {
    setRefetchIndex((prev) => prev + 1);
  };

  return { data, loading, error, refetch };
}
