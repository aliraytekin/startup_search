import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";
import { PageMeta, Startup } from "../types/startup";
import { Filters } from "../types/startup";
import { useStartups } from "../hooks/useStartups";

interface StartupsContextInterface {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  startups: Startup[];
  meta: PageMeta;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => (void);
}

const StartupsContext = createContext<StartupsContextInterface | undefined>(undefined)

export function StartupsProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>({ q: "", page: 1, per: 30 })
  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  }

  const { startups, meta, loading, error, reload } = useStartups(filters);

  const value = {
    filters,
    setFilters,
    startups,
    meta,
    loading,
    error,
    reload,
    open,
    setOpen,
    onClose
  }

  return (
    <StartupsContext.Provider value={value}>
      {children}
    </StartupsContext.Provider>
  )
}

export function useStartupsContext() {
  const context = useContext(StartupsContext);

  if (!context) {
    throw new Error('useStartupsContext muse be used within StartupsProvider')
  }
  return context;
}
