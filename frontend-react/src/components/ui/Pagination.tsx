import React from "react";
import {useStartups} from "../../hooks/useStartups"
import "../../styles/startups.css"
import { Filters } from "../../types/startup"

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function Pagination({ filters, setFilters }: Props) {
  const { meta } = useStartups(filters)

  return(
    <nav className="pagination">
      <button disabled={(filters.page ?? 1) <= 1} onClick={() => setFilters(prev => ({...prev, page: (prev.page ?? 1) - 1}))}>
        ← Prev
      </button>
      <span>Page {meta.page} / {meta.total_pages}</span>
      <button disabled={meta.page >= meta.total_pages} onClick={() => setFilters(prev => ({...prev, page: (prev.page ?? 1) + 1}))}>
        Next →
      </button>
    </nav>
  )
}
