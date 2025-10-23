import { useState, useEffect } from "react";
import { fetchStartups } from "../api/startups";
import { Filters, Startup } from "../types/startup";

export function useStartups(filters: Filters = {}) {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController();

    async function loadStartups() {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchStartups(filters, controller.signal);
        setStartups(data ?? []);
      } catch (err: unknown) {
        if ((err as any)?.name !== "AbortError") {
          setError(err instanceof Error ? err.message : "Failed to fetch startups");
        }
      } finally {
        setLoading(false);
      }
    }

    loadStartups();

    return () => controller.abort();
  }, [filters]);

  return { startups, loading, error };
}
