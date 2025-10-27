import { useEffect, useRef } from "react";
import "../../styles/drawer.css"

interface Props {
  open: boolean;
  onClose: () => void;
  onToggleOpen?: () => void;
}

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "map", label: "Map", icon: "🗺️" },
  { key: "startups",  label: "Startups",  icon: "🚀", active: true }, // example active
];

export default function Drawer({ open, onClose, onToggleOpen }: Props) {
  const panelref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !panelref.current) return;
    panelref.current?.querySelector<HTMLElement>('button,a,[tabindex]:not([tabindex="-1"])')?.focus();
  }, [open]);

  return (
    <>
      <div
        className={`drawer-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        ref={panelref}
        className={`drawer ${open ? "drawer-open" : ""}`}
        aria-label="Main navigation">


        <nav className="drawer-nav">
            {NAV.map((item) => (
              <button
                key={item.key}
                className={`nav-btn ${item.active ? "is-active" : ""}`}
                // navigation when pages created, onClick={() => ... navigate ...}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
    </>
  )
}
