import { useEffect, useRef } from "react";
import logoUrl from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import "../../styles/Drawer.css"

interface Props {
  open: boolean;
  onClose: () => void;
}

const NAV = [
  { link: "dashboard", label: "Dashboard", icon: "🏠" },
  { link: "map", label: "Map", icon: "🗺️" },
  { link: "startups",  label: "Startups",  icon: "🚀" }
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
            <NavLink key={item.link} to={item.link}
              className={({isActive}) =>
                `nav-btn ${ isActive ? "is-active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
