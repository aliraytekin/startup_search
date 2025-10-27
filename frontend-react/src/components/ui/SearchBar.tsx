import { useState, useEffect } from "react";
import { Filters } from "../../types/startup"
import { useDebounced } from "../../hooks/useDebounced";

type Props = {
  value: Filters;
  onChange: (next: Filters) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const [q, setQ] = useState(value.q ?? '');
  const debouncedQ = useDebounced(q, 350);

  useEffect(() => {
    if (debouncedQ === value.q) return;
    onChange({ ...value, q: debouncedQ })
  }, [debouncedQ])

  return(
    <div className="searchbar">
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
  )
}
