import { useMemo, useState } from "react";
import { Filters } from "../types/startup";
import Pagination from "../components/ui/Pagination";
import StartupsTable from "../components/Startups/StartupsTable";
import "../styles/Startups.css"
import StartupsHeader from "../components/Startups/StartupsHeader";
import CreateStartupsModal from "../components/Startups/CreateStartupsModal";
import { useStartups } from "../hooks/useStartups";


export default function Startups() {
  const DEFAULT = useMemo<Filters>(() => ({ q: "", page: 1, per: 30 }), []);
  const [filters, setFilters] = useState(DEFAULT)
  const [open, setOpen] = useState(false);

  const { startups, meta, loading, error, reload } = useStartups(filters);

  return(
    <section>
      <StartupsHeader filters={filters} setFilters={setFilters} setOpen={setOpen} />
      <StartupsTable startups={startups} loading={loading} error={error} setFilters={setFilters} filters={filters} />
      <Pagination meta={meta} filters={filters} setFilters={setFilters} />

      <CreateStartupsModal open={open} onClose={() => setOpen(false)} reload={reload} />
    </section>
  )
}
