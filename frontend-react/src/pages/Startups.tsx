import { useState } from "react";
import { Filters } from "../types/startup";
import Pagination from "../components/ui/Pagination";
import StartupsTable from "../components/Startups/StartupsTable";
import "../styles/startups.css"
import StartupsHeader from "../components/Startups/StartupsHeader";

const DEFAULT: Filters = { q: "", page: 1, per: 30 }

export default function StartList() {
  const [filters, setFilters] = useState(DEFAULT)
  const [open, setOpen] = useState(false);

  return(
    <section className="page">
      <StartupsHeader filters={filters} setFilters={setFilters} open={open} setOpen={setOpen} />
      <StartupsTable setFilters={setFilters} filters={filters} />
      <Pagination filters={filters} setFilters={setFilters} />
    </section>
  )
}
