import React from "react";
import { Filters } from "../../types/startup";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function StartupsHeader({ filters, setFilters }: Props ) {
  <div className="toolbar-container">
    <h2 className="toolbar-header">Search and Filter Startups</h2>

    <div className="toolbar-actions">
      <input
        type="text"
        value={filters.q ?? ''}
        placeholder="Search Startups"
        onKeyDown={(e) => { if (e.key === "Enter") setFilters(prev => ({...prev, q: e.currentTarget.value })) }}
        onChange={(e) => setFilters(prev => ({...prev, q: e.target.value}))}
      />
    </div>
  </div>
}
