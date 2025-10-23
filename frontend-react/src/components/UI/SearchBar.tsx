import React, { useState, useEffect } from "react";
import { Filters, City, Region, Country, AppState, Category, ContactState, EmailStatus } from "../../types/startup"
import { useDebounced } from "../../hooks/useDebounced";
import { formatValues } from "../../utils/formatters";

type Props = {
  value: Filters;
  onChange: (next: Filters) => void;
}

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

export default function SearchBar({ value, onChange }: Props) {
  const [q, setQ] = useState(value.q ?? '');
  const debouncedQ = useDebounced(q, 350);

  useEffect(() => {
    if (debouncedQ === value.q) return;
    onChange({ ...value, q: debouncedQ })
  }, [debouncedQ])

  return(
    <div className="filters">
      <div className="filters-row">
        <div className="search-bar">
          <input
            aria-label="Search startups"
            className="searchbar-input"
            type="text"
            placeholder="Search startups"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onChange({...value, q}) }}
          />
          {q && (
            <button className="searchbar-clear" type="button" onClick={() => { setQ("") }} aria-label="Clear search">
              ×
            </button>
          )}
        </div>

        <div className="filters-controls">
          <select
            className="select"
            value={value.city ?? ""}
            onChange={(e) => { onChange({...value, city: (e.target.value || '') as City || ''}) } }
          >
            <option value="">City</option>
            {CITIES.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
          </select>

          <select
            className="select"
            value={value.region ?? ""}
            onChange={(e) => { onChange({...value, region: (e.target.value || '') as Region || ''})}}
          >
            <option value="">Region</option>
            {REGIONS.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
          </select>

          <select
            className="select"
            value={value.country ?? ""}
            onChange={(e) => { onChange({...value, country: (e.target.value || '') as Country || ''})}}
          >

            <option value="">Country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
          </select>


          <select
            className="select"
            value={value.app_state ?? ""}
            onChange={(e) => { onChange({...value, app_state: (e.target.value || '') as AppState || ''}) }}
          >
            <option value="">Application Status</option>
            {APP_STATES.map((s) => <option key={s} value={s}>{formatValues(s)}</option>)}
          </select>

          <select
            className="select"
            value={value.app_category ?? ""}
            onChange={(e) => onChange({...value, app_category: (e.target.value || '') as Category || ''})}
          >
            <option value="">Category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{formatValues(c)}</option>)}
          </select>


          <select
            className="select"
            value={value.contact_state ?? ""}
            onChange={(e) => onChange({...value, contact_state: (e.target.value || '') as ContactState || ''})}
          >
            <option value="">Contact</option>
            {CONTACT_STATES.map((s) => <option key={s} value={s}>{formatValues(s)}</option>)}
          </select>

          <select
            className="select"
            value={value.email_status ?? ""}
            onChange={(e) => onChange({...value, email_status: (e.target.value || '') as EmailStatus || ''})}
          >
            <option value="">Email</option>
            {EMAIL_STATUSES.map((s) => <option key={s} value={s}>{formatValues(s)}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}
