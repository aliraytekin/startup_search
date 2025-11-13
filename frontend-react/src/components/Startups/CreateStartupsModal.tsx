import { useState } from "react";
import { CITIES, REGIONS, COUNTRIES, APP_STATES, CATEGORIES, CONTACT_STATES, EMAIL_STATUSES,
  City, Region, Country, AppState, Category, ContactState, EmailStatus
} from "../../types/startup";
import { createStartups } from "../../api/startups";
import { StartupCreateInput } from "../../types/startup";
import { formatValues } from "../../utils/formatters";
import "../../styles/CreateStartupsModal.css"
import { useStartupsContext } from "../../contexts/StartupsContext";

export default function CreateStartupsModal() {
  const { open, onClose, reload } =  useStartupsContext();

  const [form, setForm] = useState<StartupCreateInput>({
    name: "",
    location_attributes: {
      city: "no_city_set",
      region: "no_region_set",
      country: "no_country_set"
    },
    application_attributes: {
      state: "added_to_programme",
      category: "no_category"
    },
    contact_attributes: {
      state: "not_contacted",
      email_status: "delivered"
    },
    review_attributes: { rating: 1 }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createStartups(form);
    await reload();
    onClose();
  }

  return (
    <div className={`modal-backdrop ${open ? "is-open" : ""}`} onClick={onClose}>
      <div className={`modal-content ${open ? "is-open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-header">Create a Startup</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <label className="modal-label">
            Name:
          </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm(prev => ({...prev, name: e.target.value}))
              }
              className="modal-input"
            />
          <label className="modal-label">
            City:
          </label>
          <select value={form.location_attributes.city}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                location_attributes: {
                  ...prev.location_attributes,
                  city: e.target.value as City
                }
              }))}
            className="modal-select">
          {CITIES.map((c) => (
            <option key={c} value={c}>{formatValues(c)}</option>
          ))}
          </select>

          <label className="modal-label">
            Region:
          </label>
          <select value={form.location_attributes.region}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                location_attributes: {
                  ...prev.location_attributes,
                  region: e.target.value as Region
                }
              }))}
            className="modal-select">
          {REGIONS.map((r) => (
            <option key={r} value={r}>{formatValues(r)}</option>
          ))}
          </select>

            <label className="modal-label">
            Country:
          </label>
          <select
            value={form.location_attributes.country}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                location_attributes: {
                  ...prev.location_attributes,
                  country: e.target.value as Country
                }
              }))}
            className="modal-select">
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{formatValues(c)}</option>
          ))}
          </select>

          <label className="modal-label">
            Application State:
          </label>
          <select value={form.application_attributes.state}
            onChange={(e) =>
              setForm(prev => ({...prev, application_attributes: {
                ...prev.application_attributes, state: e.target.value as AppState
              }}))
            }
          className="modal-select">
          {APP_STATES.map((s) => (
            <option key={s} value={s}>{formatValues(s)}</option>
          ))}
          </select>

          <label className="modal-label">
            Application Category
          </label>
          <select value={form.application_attributes.category}
            onChange={(e) =>
              setForm(prev => ({...prev, application_attributes: {
                ...prev.application_attributes, category: e.target.value as Category
              }}))
            }
          className="modal-select">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{formatValues(c)}</option>
          ))}
          </select>

          <label className="modal-label">
            Contact State
          </label>
          <select value={form.contact_attributes.state}
            onChange={(e) =>
              setForm(prev => ({...prev, contact_attributes: {
                ...prev.contact_attributes, state: e.target.value as ContactState
              }}))
            }
            className="modal-select">
          {CONTACT_STATES.map((s) => (
            <option key={s} value={s}>{formatValues(s)}</option>
          ))}
          </select>

          <label className="modal-label">
            Email Status
          </label>
          <select value={form.contact_attributes.email_status}
            onChange={(e) =>
              setForm(prev => ({...prev, contact_attributes: {
                ...prev.contact_attributes, email_status: e.target.value as EmailStatus
              }}))
            }
            className="modal-select"
          >
          {EMAIL_STATUSES.map((c) => (
            <option key={c} value={c}>{formatValues(c)}</option>
          ))}
          </select>

          <label className="modal-label">
            Startup rating
          </label>
          <input
            type="number"
            value={form.review_attributes.rating}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                review_attributes: {
                  ...prev.review_attributes,
                  rating: Number(e.target.value)
                }
              }))
            }
            className="modal-input"
          />

          <div className="modal-actions">
            <button type="submit" className="modal-button button-primary">Create Startup</button>
            <button type="button" className="modal-button button-error" onClick={onClose}>Cancel</button>
          </div>

        </form>
      </div>
    </div>);
  }
