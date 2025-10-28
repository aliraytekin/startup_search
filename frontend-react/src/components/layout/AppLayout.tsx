import React, { useState } from "react";
import Drawer from "../ui/Drawer";
import "../../styles/appLayout.css"

export default function AppLayout({ children }: { children: React.ReactNode}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="app">
      <div>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
      <div className="app-icon">
        <button
          className="icon-btn"
          aria-label="Open menu"
          onClick={() => setOpen(c => !c)}
        >
          ☰
        </button>
      </div>
      <div className="app-content">
        {children}
      </div>
    </div>
  )
}
