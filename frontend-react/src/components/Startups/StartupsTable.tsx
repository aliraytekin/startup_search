import { City, Country, AppState, Category, ContactState, EmailStatus, Filters } from "../../types/startup";
import { APP_STATE_VARIANT, CONTACT_STATE_VARIANT, EMAIL_STATUS_VARIANT } from "../../types/variants";
import Chip from "../ui/Chip";
import { useStartups } from "../../hooks/useStartups";
import { formatValues } from "../../utils/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faFlag } from "@fortawesome/free-solid-svg-icons";
import "../../styles/startups.css"

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const CITIES: City[] =
  [ "no_city_set", "london", "new_york", 'liverpool',
  "tel_aviv", "genova", "birmingham", "amsterdam", "dublin" ]

const COUNTRIES: Country[] =
  ["no_country", "united_kingdom", "united_states", "india",
    "netherlands", "france", "canada", "israel", "italy", "germany"]

const APP_STATES: AppState[] = [
  'added_to_programme','not_suitable','invited_to_apply','applying',
  'application_finalised','shortlisted','not_shortlisted',
  'invited_to_pitch_day','not_invited_to_pitch_day','successful',
  'not_successful','not_interested','interested','referred'
];
const CATEGORIES: Category[] = [
  'optimisation','providing_an_experience',
  'attention_on_the_consumer','ui_ux','no_category'
];
const CONTACT_STATES: ContactState[] = [
  'not_contacted','contacted','call_scheduled','responded','follow_up'
];
const EMAIL_STATUSES: EmailStatus[] = ['delivered','bounced','opened','clicked'];

export default function StartupsTable({ filters, setFilters }: Props) {
  const { startups, loading, error } = useStartups(filters);

  return(
    <div className="table-wrap">
        <table className="table">
          <thead>
            <tr className="thead-top">
              <th>Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Application State</th>
              <th>Application Category</th>
              <th>Contact State</th>
              <th>Email</th>
            </tr>
            <tr className="thead-filters">
              <th><input
                aria-label="Search startups"
                className="searchbar-input"
                type="text"
                placeholder="Search startups"
                value={filters.q ?? ''}
                onKeyDown={(e) => { if (e.key === "Enter") setFilters(prev => ({...prev, q: e.currentTarget.value})) }}
                onChange={(e) => setFilters(prev => ({...prev, q: e.target.value}))}
              /></th>
              <th><select className="select" value={filters.city ?? ""} onChange={e => setFilters(prev => ({...prev, city: (e.target.value || "") as City || ''})) }>
                <option value="">City</option>
                {CITIES.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.country ?? ""} onChange={e => setFilters(prev => ({...prev, country: (e.target.value || "") as Country || ''})) }>
                <option value="">Country</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.app_state ?? ""} onChange={e => setFilters(prev => ({...prev, app_state: (e.target.value || "") as AppState || ''})) }>
                <option value="">Application State</option>
                {APP_STATES.map((s) => <option key={s} value={s}>{formatValues(s)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.app_category ?? ""} onChange={e => setFilters(prev => ({...prev, app_category: (e.target.value || "") as Category || ''})) }>
                <option value="">Application Category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.contact_state ?? ""} onChange={e => setFilters(prev => ({...prev, contact_state: (e.target.value || "") as ContactState || ''})) }>
                <option value="">Contact State</option>
                {CONTACT_STATES.map((s) => <option key={s} value={s}>{formatValues(s)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.email_status ?? ""} onChange={e => setFilters(prev => ({...prev, email_status: (e.target.value || "") as EmailStatus || ''})) }>
                <option value="">Email Status</option>
                {EMAIL_STATUSES.map((s) => <option key={s} value={s}>{formatValues(s)}</option>)}
                </select>
              </th>
            </tr>
          </thead>

          <tbody>
            {error && <tr><td colSpan={8} className="td-center">Error loading startups</td></tr>}
            {loading && <tr><td colSpan={8} className="td-center">Loading...</td></tr>}
            {!loading && startups.length === 0 && <tr><td colSpan={8} className="td-center">No startups found</td></tr>}
            {startups.map((startup) => (
              <tr key={startup.id}>
                <td className="cell-strong">{startup.name}</td>
                <td>
                  <div className="chip-container">
                    <div className="chip chip-city">
                      <p><FontAwesomeIcon icon={faCity} /> {formatValues(startup.location?.city ?? "no_city_set")}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="chip-container">
                    <div className="chip chip-country">
                      <p><FontAwesomeIcon icon={faFlag} /> {formatValues(startup.location?.country ?? "no_country")}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="chip-container">
                    <Chip variant={APP_STATE_VARIANT[startup.application?.state ?? "not_suitable"]}>
                      {formatValues(startup.application?.state ?? "not_suitable")}
                    </Chip>
                  </div>
                </td>
                <td className="cell-strong">
                      {formatValues(startup.application?.category ?? "no_category")}
                </td>
                <td>
                  <div className="chip-container">
                    <Chip variant={CONTACT_STATE_VARIANT[startup.contact?.state ?? "not_contacted"]}>
                      {formatValues(startup.contact?.state ?? "not_contacted")}
                    </Chip>
                  </div>
                </td>
                <td>
                  <div className="chip-container">
                    <Chip variant={EMAIL_STATUS_VARIANT[startup.contact?.email_status ?? "delivered"]}>
                      {formatValues(startup.contact?.email_status ?? "delivered")}
                    </Chip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}
