import { useState } from "react";
import { City, Region, Country, AppState, Category, ContactState, EmailStatus, Filters } from "../types/startup";
import { useStartups } from "../hooks/useStartups"
import "../styles/startups.css"
import { formatValues } from "../utils/formatters";

const DEFAULT: Filters = { q: "", page: 1, per: 30 }

const CITIES: City[] =
  [ "no_city_set", "london", "new_york", 'liverpool',
  "tel_aviv", "genova", "birmingham", "amsterdam", "dublin" ]

const REGIONS: Region[] =
  ["no_country", "northern_europe", "western_europe", "southern_europe",
  "southern_asia", "western_asia", "australia_and_new_zealand",
  "south_eastern_asia", "south_america"]

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


export default function StartList() {
  const [filters, setFilters] = useState(DEFAULT)
  const { meta, startups, loading, error } = useStartups(filters);


  return(
    <section className="page">
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr className="thead-top">
              <th>Name</th>
              <th>City</th>
              <th>Region</th>
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
                onKeyDown={(e) => { if (e.key === "Enter") setFilters({...filters, q: e.currentTarget.value}) }}
                onChange={(e) => setFilters({...filters, q: e.target.value})}
              /></th>
              <th><select className="select" value={filters.city ?? ""} onChange={e => setFilters({...filters, city: (e.target.value || "") as City || ''}) }>
                <option value="">City</option>
                {CITIES.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.region ?? ""} onChange={e => setFilters({...filters, region: (e.target.value || "") as Region || ''}) }>
                <option value="">Region</option>
                {REGIONS.map((r) => <option key={r} value={r}>{formatValues(r)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.country ?? ""} onChange={e => setFilters({...filters, country: (e.target.value || "") as Country || ''}) }>
                <option value="">Country</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.app_state ?? ""} onChange={e => setFilters({...filters, app_state: (e.target.value || "") as AppState || ''}) }>
                <option value="">Application State</option>
                {APP_STATES.map((s) => <option key={s} value={s}>{formatValues(s)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.app_category ?? ""} onChange={e => setFilters({...filters, app_category: (e.target.value || "") as Category || ''}) }>
                <option value="">Application Category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.contact_state ?? ""} onChange={e => setFilters({...filters, contact_state: (e.target.value || "") as ContactState || ''}) }>
                <option value="">Contact State</option>
                {CONTACT_STATES.map((s) => <option key={s} value={s}>{formatValues(s)}</option>)}
                </select>
              </th>
              <th><select className="select" value={filters.email_status ?? ""} onChange={e => setFilters({...filters, email_status: (e.target.value || "") as EmailStatus || ''}) }>
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
                <td>{formatValues(startup.location?.city ?? "no_city_set")}</td>
                <td>{formatValues(startup.location?.region ?? "no_country")}</td>
                <td>{formatValues(startup.location?.country ?? "no_country")}</td>
                <td>{formatValues(startup.application?.state ?? "not_suitable")}</td>
                <td>{formatValues(startup.application?.category ?? "no_category")}</td>
                <td>{formatValues(startup.contact?.state ?? "not_contacted")}</td>
                <td>{formatValues(startup.contact?.email_status ?? "delivered")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="pagination">
        <button disabled={(filters.page ?? 1) <= 1} onClick={() => setFilters(prev => ({...prev, page: (prev.page ?? 1) - 1}))}>
          ← Prev
        </button>
        <span>Page {meta.page} / {meta.total_pages}</span>
        <button disabled={meta.page >= meta.total_pages} onClick={() => setFilters(prev => ({...prev, page: (prev.page ?? 1) + 1}))}>
          Next →
        </button>
      </nav>
    </section>
  )
}
