import { Startup } from "../../types/startup";
import "../../styles/startups.css"
import { formatValues } from "../../utils/formatters";

interface Props {
  startup: Startup;
}

export default function StartupsCard({ startup }: Props) {
  const city = startup.location?.city ?? "-";
  const region = startup.location?.region ?? "-";
  const country = startup.location?.country ?? "-";
  const appState = startup.application?.state ?? "-";
  const appCategory = startup.application?.category ?? "-";
  const contactState = startup.contact?.state ?? "-";
  const emailStatus = startup.contact.email_status ?? "-";

  return(
    <div className="startup-card">
      <h2 className="startup-card-header">{startup.name}</h2>

      <div className="startup-card-row">
        <span className="chip chip-info">{formatValues(city)}</span>
        <span className="chip chip-info">{formatValues(region)}</span>
        <span className="chip chip-info">{formatValues(country)}</span>
      </div>

      <div className="startup-card-row">
        <span className="chip chip-info">Application: {formatValues(appState)}</span>
        <span className="chip chip-muted">{formatValues(appCategory)}</span>
      </div>

      <div className="startup-card-row">
        <span className="chip chip-info">Contact: {formatValues(contactState)}</span>
        <span className="chip chip-muted">{formatValues(emailStatus)}</span>
      </div>
    </div>
  )
}
