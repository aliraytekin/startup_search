import { useState } from "react";
import { Filters } from "../types/startup";
import Pagination from "../components/ui/Pagination";
import StartupsTable from "../components/Startups/StartupsTable";
import "../styles/startups.css"

const DEFAULT: Filters = { q: "", page: 1, per: 30 }

export default function StartList() {
  const [filters, setFilters] = useState(DEFAULT)

  return(
    <section className="page">
      <StartupsTable setFilters={setFilters} filters={filters} />
      <Pagination filters={filters} setFilters={setFilters} />
    </section>
  )
}
