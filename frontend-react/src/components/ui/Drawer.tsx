import { useEffect, useRef } from "react";
import logoUrl from "../../assets/logo.png";
import "../../styles/drawer.css"

interface Props {
  open: boolean;
  onClose: () => void;
}

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "map", label: "Map", icon: "🗺️" },
  { key: "startups",  label: "Startups",  icon: "🚀", active: true }, // example active
];

export default function Drawer({ open, onClose }: Props) {
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

        <div className="logo-container">
          <img
            src={logoUrl}
            alt="Company Logo"
            className="logo" />
        </div>


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
