import React from "react";
import {useStartups} from "../../hooks/useStartups"
import "../../styles/Startups.css"
import { Filters, PageMeta } from "../../types/startup"

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  meta: PageMeta;
}

export default function Pagination({ filters, setFilters, meta }: Props) {
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
