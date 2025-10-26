import { useState, useEffect } from "react";
import { fetchStartups } from "../api/startups";
import { Filters, PageMeta, Startup } from "../types/startup";

export function useStartups(filters: Filters = {}) {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [meta, setMeta] = useState<PageMeta>({ page: filters.page || 1, per: filters.per || 25, total: 0, total_pages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController();

    async function loadStartups() {
      try {
        setError(null);
        setLoading(true);
        const { data, meta } = await fetchStartups(filters, controller.signal);
        setStartups(data ?? []); setMeta(meta);
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

  return { meta, startups, loading, error };
}
