import Pagination from "../components/ui/Pagination";
import StartupsTable from "../components/Startups/StartupsTable";
import "../styles/Startups.css"
import StartupsHeader from "../components/Startups/StartupsHeader";
import CreateStartupsModal from "../components/Startups/CreateStartupsModal";

export default function Startups() {
  return(
    <section>
      <StartupsHeader />
      <StartupsTable />
      <Pagination />

      <CreateStartupsModal />
    </section>
  )
}
