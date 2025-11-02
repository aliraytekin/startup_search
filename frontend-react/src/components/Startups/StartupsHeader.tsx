import React from "react";
import { Filters } from "../../types/startup";
import "../../styles/StartupsHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setOpen: (open: boolean) => void;
}

export default function StartupsHeader({ filters, setFilters, setOpen }: Props ) {
  return (
    <div className="toolbar-container">
      <h2 className="toolbar-header">Search and Filter Startups</h2>

      <div className="toolbar-actions">
        <div className="search-wrapper">
          <input
            type="text"
            value={filters.q ?? ''}
            placeholder="Search Startups"
            onChange={(e) => setFilters(prev => ({...prev, q: e.target.value, page: 1 }))}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </div>

        <button onClick={() => setOpen(true)}>Create Startups</button>
      </div>
    </div>
  )
}
