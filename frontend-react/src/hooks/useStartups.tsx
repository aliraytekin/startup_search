import { useState, useEffect, useCallback } from "react";
import { fetchStartups } from "../api/startups";
import { Filters, PageMeta, Startup } from "../types/startup";

export function useStartups(filters: Filters = {}) {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [meta, setMeta] = useState<PageMeta>({ page: filters.page || 1, per: filters.per || 30, total: 0, total_pages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const loadStartups = useCallback(async (signal?: AbortSignal ) => {
    try {
      setError(null);
      setLoading(true);
      const { data, meta } = await fetchStartups(filters, signal);
      setStartups(data ?? []); setMeta(meta);
    } catch (err: unknown) {
      if ((err as any)?.name !== "AbortError") {
        setError(err instanceof Error ? err.message : "Failed to fetch startups");
      }
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const controller = new AbortController();
    loadStartups(controller.signal);
    return () => controller.abort();
  }, [loadStartups]);

  return { meta, startups, loading, error, reload: loadStartups };
}
