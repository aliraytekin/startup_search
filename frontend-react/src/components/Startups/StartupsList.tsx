import { useState } from "react";
import StartupsCard from "./StartupsCard"
import { Filters } from "../../types/startup";
import { useStartups } from "../../hooks/useStartups"
import SearchBar from "../UI/SearchBar";
import "../../styles/startups.css"

const DEFAULT: Filters = { q: "" }

export default function StartList() {
  const [filters, setFilters] = useState(DEFAULT)
  const { startups, loading, error } = useStartups(filters);


  return(
    <div className="startups-container">
      <div className="startups-header">
        <h2>Startups:</h2>
      </div>

      <SearchBar value={filters} onChange={setFilters}></SearchBar>

      {error && <p>{error}</p>}
      {loading &&   <p>Loading startups...</p>}
      {startups.length === 0 && <p>No startups found</p> }

      <div className="startups-grid">
        {startups.map(startup => (
          <StartupsCard key={startup.id} startup={startup} />
        ))}
      </div>
    </div>
  )
}
